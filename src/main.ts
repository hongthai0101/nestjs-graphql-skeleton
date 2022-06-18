import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  await app.listen(3000);
}
bootstrap();
