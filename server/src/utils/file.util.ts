import * as path from 'path';
import * as fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUtils {
  async isExistsFile(path) {
    try {
      const res = await fs.stat(path);
      if (res.isFile()) {
        return true;
      }

      return false;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw err;
      }
    }
  }

  async isExistsDir(path) {
    try {
      const res = await fs.stat(path);
      if (res.isDirectory()) {
        return true;
      }

      return false;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw err;
      }
    }
  }

  fileExtension(filename = '', symbol = '.') {
    return filename.split(symbol).pop();
  }

  bufferToStream(binary: Buffer) {
    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      },
    });

    return readableInstanceStream;
  }

  async streamConcurrentMerge(sourceFileDirectory, targetFile, chunkSize) {
    const filenames = await fs.readdir(sourceFileDirectory);

    await Promise.all(
      filenames.map((filename) => {
        const index = Number(filename.split('-').pop());
        const start = index * chunkSize;

        return pipeline(
          createReadStream(path.join(sourceFileDirectory, filename)),
          createWriteStream(targetFile, {
            start,
          }),
        );
      }),
    );
  }
}
