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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@/shared/logging/logging.interceptor';
import { LoggingModule } from '@/shared/logging/logging.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, BookGenre]), LoggingModule],
  controllers: [BooksController],
  providers: [
    BookEditService,
    BookFindService,
    TransactionManagerProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

  ],
})
export class BooksModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TransactionMiddleware).forRoutes('*');
    }
  
}