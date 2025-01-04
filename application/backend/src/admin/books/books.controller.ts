import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '@/entities/Book';

@Controller('admin/books')
export class BooksController {
    constructor(
        @InjectRepository(Book)
        private readonly repos: Repository<Book>,

    ) {}
    @Get()
    async findAll(): Promise<Book[]> {
        return await this.repos.find({
            relations: ['bookAuthors', 'bookAuthors.author', 'bookGenres', 'bookGenres.genre'],
        });
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
    @Post()
    async create(@Body() bookData: Partial<Book>): Promise<Book> {
        const book = this.repos.create(bookData);
        return await this.repos.save(book);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() bookData: Partial<Book>): Promise<Book> {
        await this.repos.update(id, bookData);
        const updatedBook = await this.repos.findOneBy({ id });
        if (!updatedBook) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return updatedBook;
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const result = await this.repos.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
    }
}
