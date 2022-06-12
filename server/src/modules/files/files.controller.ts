import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Res,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { ChunkCheckDto, ChunkUploadDto, DeleteFilesDto } from './dto';
import { FilesService } from './files.service';
import { FileUploadStatus } from 'src/enums';
import { FileExistsException } from 'src/core/exceptions';

@ApiTags('File upload compression')
@Controller('files/')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Check file chunk upload status' })
  @Post('chunk/check')
  async checkChunk(@Body() dto: ChunkCheckDto): Promise<object> {
    if (await this.filesService.checkFileIsExists(dto.hash, dto.name)) {
      return { status: FileUploadStatus.Uploaded };
    }

    return this.filesService.checkChunk(dto);
  }

  @ApiOperation({ summary: 'upload file chunk' })
  @ApiConsumes('multipart/form-data')
  @Post('chunk/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadChunk(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() dto: ChunkUploadDto,
  ): Promise<void> {
    if (await this.filesService.checkFileIsExists(dto.hash, dto.name)) {
      throw new FileExistsException(dto.name);
    }

    return this.filesService.uploadChunk(file.buffer, dto);
  }

  @ApiOperation({ summary: 'Download file' })
  @Get('download/:fileHash')
  download(@Param('fileHash') fileId: string, @Res() response: Response) {
    this.filesService.downloadFile(fileId, response);
  }

  @ApiOperation({ summary: 'Delete files' })
  @Delete()
  deleteFiles(@Body() dto: DeleteFilesDto) {
    return this.filesService.deleteFiles(dto.filenames);
  }
}
