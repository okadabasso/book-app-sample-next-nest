import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { ServicesModule } from './services/services.module';
import { LoggingModule } from '@/logging/logging.module';

@Module({
  controllers: [BooksController],
  providers: [
  ],
  imports: [
    ServicesModule,
    LoggingModule
  ],
})
export class BooksModule {}
