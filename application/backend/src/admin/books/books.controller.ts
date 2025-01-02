import { AppDataSource } from '@/data-source';
import { Book } from '@/entities/Book';
import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { generate } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('admin/books')
export class BooksController {
    constructor(
        @InjectRepository(Book)
        private readonly repos: Repository<Book>,

    ) {}
    @Get()
    async findAll(): Promise<Book[]> {
        return await this.repos.find({});
    }
    @Get("find")
    async find(@Query('id') id: number): Promise<Book> {
        console.info(`GET /admin/books/find?id=${id} ` + new Date().toString());
        const book = await this.repos.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return book;
    }
}
