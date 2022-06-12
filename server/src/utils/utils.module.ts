import { Module } from '@nestjs/common';
import { FileUtils } from './file.util';

@Module({
  providers: [FileUtils],
  exports: [FileUtils],
})
export class UtilsModule {}
