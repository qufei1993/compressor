import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter<T extends Error> implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    this.logger.error(exception.stack);

    const context = host.switchToHttp();
    const response = context.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const code =
      exception instanceof HttpException
        ? (<any>exception.getResponse()).code || 'ERROR'
        : 'ERROR';
    const getMessage = (exception: T) => {
      if (exception instanceof HttpException) {
        const exceptionRes = <{ message: string | string[] }>(
          exception.getResponse()
        );
        const exceptionResMsg = exceptionRes.message;
        return Array.isArray(exceptionResMsg)
          ? exceptionResMsg[0]
          : exceptionResMsg;
      }

      if (exception.message) {
        return exception.message;
      }

      return 'Unkown error';
    };

    response.status(status).json({
      code,
      message: getMessage(exception),
      payload: {},
    });
  }
}
