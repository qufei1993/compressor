import * as nodePath from 'path';
import * as fs from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as imagemin from 'imagemin'; // https://github.com/imagemin/imagemin/issues/380
import imageminPngquant from 'imagemin-pngquant';
import * as imageminGifsicle from 'imagemin-gifsicle';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as imageminWebp from 'imagemin-webp';

import { ChunkCheckDto, ChunkUploadDto } from './dto';
import { FileUtils } from '../../utils/file.util';
import { FileUploadStatus } from '../../enums';
import { IncompleteFileChunkException } from 'src/core/exceptions';
import { CompressMsgDto } from '../events/dto';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private uploadRootDir: string;
  private fileCompressDir: string;
  private sourceFileDir: string;
  private chunkDir: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly fileUtils: FileUtils,
  ) {
    this.uploadRootDir =
      this.configService.get('UPLOAD_ROOT_DIR') ||
      nodePath.join(__dirname, '../../../', 'c-files');
    this.fileCompressDir = nodePath.join(this.uploadRootDir, 'compress');
    this.chunkDir = nodePath.join(this.uploadRootDir, 'chunk');
    this.sourceFileDir = nodePath.join(this.uploadRootDir, 'source');
  }

  private getFilePath(hash: string, name: string): string {
    return nodePath.join(
      this.sourceFileDir,
      `${hash}.${this.fileUtils.fileExtension(name)}`,
    );
  }

  private getChunkDir(hash: string, chunkSize: number): string {
    return nodePath.join(this.chunkDir, `${hash}-${chunkSize}`, '/');
  }

  async checkFileIsExists(hash: string, name: string): Promise<boolean> {
    if (!this.uploadRootDir) {
      throw new HttpException('File root directory does not exists', 403);
    }

    const filePath = this.getFilePath(hash, name);
    if (await this.fileUtils.isExistsFile(filePath)) {
      return true;
    }

    return false;
  }

  async checkChunk(dto: ChunkCheckDto): Promise<object> {
    const chunkDir = this.getChunkDir(dto.hash, dto.chunkSize);
    const chunks = await fs.readdir(chunkDir).catch((err) => {
      if (err.code === 'ENOENT') return [];
      throw err;
    });

    return {
      status: chunks.length
        ? FileUploadStatus.PartialUploaded
        : FileUploadStatus.NotUploaded,
      partialChunkIndexs: chunks.map((chunk) => Number(chunk.split('-').pop())),
    };
  }

  async uploadChunk(buffer: Buffer, dto: ChunkUploadDto): Promise<void> {
    const { chunkSize, index, hash } = dto;

    const chunkDir = this.getChunkDir(hash, chunkSize);
    if (!(await this.fileUtils.isExistsDir(chunkDir))) {
      await fs.mkdir(chunkDir, { recursive: true });
    }

    const chunkFilename = nodePath.join(chunkDir, `${hash}-${index}`);
    await pipeline(
      this.fileUtils.bufferToStream(buffer),
      createWriteStream(chunkFilename),
    );
  }

  private async checkFileChunkCompletion(
    hash: string,
    chunkSize: number,
    chunkTotalPageSize: number,
  ): Promise<void> {
    const chunkDir = this.getChunkDir(hash, chunkSize);
    const chunks = await fs.readdir(chunkDir).catch((err) => {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    });

    if (chunkTotalPageSize !== chunks.length) {
      throw new IncompleteFileChunkException();
    }
  }

  private async compress(
    originFilepath: string,
    destinationPath: string,
    compressFileExtraType: 'jpg' | 'png' | 'gif' | 'webp',
    compressOptions:
      | {
          dithering: number;
          posterrize: number;
          quality: number[];
          speed: number;
        }
      | any,
  ) {
    switch (compressFileExtraType) {
      case 'png': {
        if (compressOptions.quality) {
          compressOptions.quality = [...compressOptions.quality].map(
            (value) => value / 100,
          );
        }

        return await imagemin([originFilepath], {
          destination: destinationPath,
          plugins: [imageminPngquant(compressOptions)],
        });
      }
      case 'jpg': {
        return await imagemin([originFilepath], {
          destination: destinationPath,
          plugins: [imageminMozjpeg(compressOptions)],
        });
      }
      case 'gif': {
        return await imagemin([originFilepath], {
          destination: destinationPath,
          plugins: [imageminGifsicle(compressOptions)],
        });
      }
      case 'webp': {
        return await imagemin([originFilepath], {
          destination: destinationPath,
          plugins: [imageminWebp(compressOptions)],
        });
      }
    }
  }

  async mergeAndCompress(dto: CompressMsgDto) {
    const {
      hash,
      name,
      chunkSize,
      chunkTotalPageSize,
      compressOptions,
      compressFileExtraType,
    } = dto;
    const filePath = this.getFilePath(hash, name);

    let compressResults = [];
    if (!(await this.checkFileIsExists(hash, name))) {
      await this.checkFileChunkCompletion(hash, chunkSize, chunkTotalPageSize);

      const chunkDir = this.getChunkDir(hash, chunkSize);

      if (!(await this.fileUtils.isExistsFile(this.sourceFileDir))) {
        await fs.mkdir(this.sourceFileDir, { recursive: true });
      }

      await this.fileUtils.streamConcurrentMerge(chunkDir, filePath, chunkSize);
      await fs.rm(chunkDir, { recursive: true });
    }

    compressResults = await this.compress(
      filePath,
      this.fileCompressDir,
      compressFileExtraType,
      compressOptions,
    );

    const destinationFilePath: string = compressResults[0].destinationPath;
    const stats = await fs.stat(destinationFilePath);
    // remove origin file
    // await fs.rm(compressResults[0].sourcePath);

    return {
      size: stats.size,
      compressFileName: destinationFilePath.replace(
        this.fileCompressDir + '/',
        '',
      ),
    };
  }

  async downloadFile(hash: string, response: Response) {
    const filePath = nodePath.join(this.fileCompressDir, hash);

    response.download(filePath, async (err) => {
      if (err) {
        this.logger.log(
          `download file ${filePath} failed with message: ${err.message}`,
        );
      }
    });
  }

  async deleteFiles(filenames: string[]) {
    await Promise.all(
      filenames.map((filename) =>
        fs.rm(nodePath.join(this.fileCompressDir, filename)),
      ),
    );
  }
}
