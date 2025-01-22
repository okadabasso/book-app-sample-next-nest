import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: new LoggingService(), // ここに追加
    }
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
