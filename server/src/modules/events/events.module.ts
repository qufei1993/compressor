import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [EventsGateway],
})
export class EventsModule {}
