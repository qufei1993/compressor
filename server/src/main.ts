import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './core/filter/all-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppModule.apiPrefix);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(AppModule.apiDocTitle)
    .setDescription(AppModule.apiDocDescription)
    .setVersion(AppModule.apiDocVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(AppModule.port);
}
bootstrap();
