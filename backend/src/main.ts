import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validator

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );

  // http://localhost:9000/media/cats/aaa.png
  app.useStaticAssets(path.join(__dirname, './common/uploads'), {
    prefix: '/media',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cat info')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('docs', app, document); // endpoint

  app.enableCors({
    origin: true, // 환경 변수 처리 필요
    credentials: true,
  });

  await app.listen(process.env.APP_PORT);
}
bootstrap();
