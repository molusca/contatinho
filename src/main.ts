import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ModelNotFoundExceptionFilter } from './shared/filters/model-not-found.exception-filter';
import { DataTransformInterceptor } from './shared/interceptors/data-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new DataTransformInterceptor());

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new ModelNotFoundExceptionFilter(),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
