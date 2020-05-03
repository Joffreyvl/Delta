import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(new ValidationPipe());

  addSwagggerDocumentation(app);

  await app.listen(3000);
}

bootstrap();

async function addSwagggerDocumentation(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Search entities')
    .setVersion('1.0')
    .addTag('search-entities')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
}
