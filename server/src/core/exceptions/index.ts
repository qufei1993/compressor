import { HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ErrorType } from '../../enums';

export class FileExistsException extends HttpException {
  constructor(filename: string) {
    super(
      {
        code: ErrorType.FileExists,
        message: `There's a file with filename '${filename}'`,
      },
      200,
    );
  }
}

export class IncompleteFileChunkException extends WsException {
  constructor() {
    super(
      'The number of chunks is inconsistent with the number of request chunks',
    );
  }
}
