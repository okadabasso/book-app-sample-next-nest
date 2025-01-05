import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Book } from '@/entities/Book';
import { BookDto } from './dto/BookDto';
import { plainToInstance } from 'class-transformer';
import { Genre } from '@/entities/Genre';
import { GenreDto } from './dto/GenreDto';
import { BookGenre } from '@/entities/BookGenre';
@Controller('admin/books')
export class BooksController {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    @Get()
    async findAll(): Promise<BookDto[]> {
        const books = await this.dataSource.getRepository(Book).find({
            relations: ['bookAuthors', 'bookAuthors.author', 'bookGenres', 'bookGenres.genre'],
            order: { id: 'ASC' },
        });
        const dto = plainToInstance(BookDto, books);
        return dto;
    }
    @Get("find")
    async find(@Query('id') id: number): Promise<BookDto> {
        console.info(`GET /admin/books/find?id=${id} ` + new Date().toString());
        const book = await this.dataSource.getRepository(Book).findOne({
            where: { id },
            relations: ['bookAuthors', 'bookAuthors.author', 'bookGenres', 'bookGenres.genre'],
        });
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        const dto = plainToInstance(BookDto, book, {
            exposeDefaultValues: true, // デフォルト値を有効化
            enableImplicitConversion: true,
        });
        return dto;
    }
    @Post()
    async create(@Body() bookData: Partial<BookDto>): Promise<Book> {
        return this.dataSource.transaction(async (manager) => {
            console.log(bookData);
            const bookRepository = manager.getRepository(Book);
            const genreRepository = manager.getRepository(Genre);
            const bookGenreRepository = manager.getRepository(BookGenre);

            const book = bookRepository.create(bookData);
            await bookRepository.save(book);
    
            const bookGenres = await bookData.genres.forEach(async (item: GenreDto) => {
                console.log(item);
                let genre = plainToInstance(Genre, item);
                if (item.isNew) {
                    genre.id = 0;
                    genre = genreRepository.create(genre);
                    await genreRepository.save(genre);
                }
                console.log(genre);
                const bookGenre = new BookGenre(0, book, genre);
                bookGenreRepository.create(bookGenre);
                await bookGenreRepository.save(bookGenre);
             });
    
             return book;
    
        });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() bookDto: Partial<BookDto>): Promise<Book> {
        const book = new Book(
            bookDto.title,
            bookDto.author,
            bookDto.description,
            bookDto.publishedYear,
            bookDto.genre,
        );
        console.log(book);
        await this.dataSource.getRepository(Book).update(id, book);
        const updatedBook = await this.dataSource.getRepository(Book).findOneBy({ id });
        if (!updatedBook) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return updatedBook;
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const result = await this.dataSource.getRepository(Book).delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
    }
}
