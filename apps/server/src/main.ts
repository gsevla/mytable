import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['/', 'docs'] });
  app.enableCors();
  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('MyTable')
    .setDescription('MyTable API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
