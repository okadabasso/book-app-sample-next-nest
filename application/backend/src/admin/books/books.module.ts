import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { Book } from '@/entities/Book';
import { Genre } from '@/entities/Genre';
import { BookGenre } from '@/entities/BookGenre';
import { BookEditService } from './services/BookEditService';
import { BookFindService } from './services/BookFindService';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { TransactionMiddleware } from '@/shared/middlewares/transaction.middleware';
import { LoggingService } from '@/shared/services/logging.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, BookGenre])],
  controllers: [BooksController],
  providers: [
    BookEditService,
    BookFindService,
    TransactionManagerProvider,
    LoggingService
  ],
})
export class BooksModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TransactionMiddleware).forRoutes('*');
    }
  
}