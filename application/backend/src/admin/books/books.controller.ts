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
            console.log("bookData", bookData);
            const bookRepository = manager.getRepository(Book);
            const genreRepository = manager.getRepository(Genre);
            const bookGenreRepository = manager.getRepository(BookGenre);

            const book = bookRepository.create(bookData);
            await bookRepository.save(book);
    
            for(let i = 0; i < bookData.genres.length; i++) {
                const item = bookData.genres[i];
                let genre = plainToInstance(Genre, item);
                if (item.isNew) {
                    console.log("new genre");
                    genre.id = 0;
                    genre = genreRepository.create(genre);
                    await genreRepository.save(genre);
                }
                const bookGenre = { book, genre };
                bookGenreRepository.create(bookGenre);
                await bookGenreRepository.save(bookGenre);
            }
            console.log("book saved", book);
            return book;
    
        });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() bookDto: Partial<BookDto>): Promise<Book> {
        return this.dataSource.transaction(async (manager) => {
            const bookRepository = manager.getRepository(Book);
            const genreRepository = manager.getRepository(Genre);
            const bookGenreRepository = manager.getRepository(BookGenre);

            const book = await bookRepository.findOne({
                where: {id},
                relations: ['bookAuthors', 'bookAuthors.author', 'bookGenres', 'bookGenres.genre'],
            });
            book. title = bookDto.title;
            book.author = bookDto.author;
            book.publishedYear = bookDto.publishedYear;
            book.description = bookDto.description;
            await bookRepository.save(book);

            for( let i = 0; i < book.bookGenres.length; i++) {
                const bookGenre = book.bookGenres[i];
                if(bookDto.genres.findIndex((genre) => genre.id === bookGenre.genre.id) === -1) {
                    console.log("delete bookGenre", bookGenre);
                    await bookGenreRepository.remove(bookGenre);
                    continue;
                }
                console.log("update bookGenre", bookGenre);
                bookGenreRepository.save(bookGenre);
            }
            for(let i = 0; i < bookDto.genres.length; i++) {
                const item = bookDto.genres[i];
                let genre = plainToInstance(Genre, item);
                if (item.isNew) {
                    console.log("new genre");
                    genre.id = 0;
                    genre = genreRepository.create(genre);
                    await genreRepository.save(genre);

                }
                if (book.bookGenres.findIndex((bookGenre) => bookGenre.genre.id === genre.id) === -1) {
                    console.log("new bookGenre", genre);
                    const bookGenre = { book, genre };
                    bookGenreRepository.create(bookGenre);
                    await bookGenreRepository.save(bookGenre);
                }
            }
            return book;
        });


    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const result = await this.dataSource.getRepository(Book).delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
    }
}
