import { AppDataSource } from '@/data-source';
import { Book } from '@/entities/Book';
import { Controller, Get, NotFoundException } from '@nestjs/common';
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
    async find(id:number): Promise<Book> {
        const book = await this.repos.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return book;
    }
}
