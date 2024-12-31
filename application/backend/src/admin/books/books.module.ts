import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController]
})
export class BooksModule {}
