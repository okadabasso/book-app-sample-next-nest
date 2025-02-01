import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { LoggingService } from '@/logging/logging.service';
import { ServicesModule } from './services/services.module';
import { BooksService } from './services/BookService';

@Module({
  controllers: [BooksController],
  providers: [
    LoggingService,
  ],
  imports: [
    ServicesModule
  ],
})
export class BooksModule {}
