import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'ws';

import { CompressMsgDto } from './dto';
import { FilesService } from '../files/files.service';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private filesService: FilesService) {}

  @SubscribeMessage('compress')
  async handleCompress(@MessageBody() message: CompressMsgDto): Promise<void> {
    try {
      const data = await this.filesService.mergeAndCompress(message);
      this.server.emit('compress_success', {
        uid: message.uid,
        compressFileExtraType: message.compressFileExtraType,
        ...data,
      });
    } catch (error) {
      this.logger.error(`file compress failed with error`, error);
      console.error(error);

      this.server.emit('compress_error', error, {
        uid: message.uid,
        compressFileExtraType: message.compressFileExtraType,
      });
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`);
  }
}
