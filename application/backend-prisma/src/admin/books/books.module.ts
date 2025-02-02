import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { LoggingService } from '@/logging/logging.service';
import { ServicesModule } from './services/services.module';
import { BooksService } from './services/BookService';
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
