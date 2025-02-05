import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix 설정
  app.setGlobalPrefix('api');

  // CORS 활성화
  app.enableCors();

  // Validation Pipe 설정
  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Mock API Server')
    .setDescription('Mock API 테스트 서버 문서')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
