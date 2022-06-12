import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FilesModule } from './modules/files/files.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilesModule,
    EventsModule,
  ],
  providers: [EventsModule],
})
export class AppModule {
  static port: number;
  static apiPrefix: string;
  static apiDocTitle: string;
  static apiDocVersion: string;
  static apiDocDescription: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('PORT');
    AppModule.apiPrefix = this.configService.get('API_PREFIX');

    AppModule.apiDocTitle = this.configService.get('API_DOC_TITLE');
    AppModule.apiDocVersion = this.configService.get('APP_DOC_VERSION');
    AppModule.apiDocDescription = this.configService.get('API_DOC_DESCRIPTION');
  }
}
