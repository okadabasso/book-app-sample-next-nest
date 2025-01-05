import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/entities/Book';
import { Genre } from '@/entities/Genre';
import { BookGenre } from '@/entities/BookGenre';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, BookGenre])],
  controllers: [BooksController]
})
export class BooksModule {}
