import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Book } from '@/entities/Book';
import { BookDto } from './dto/BookDto';
import { Genre } from '@/entities/Genre';
import { BookGenre } from '@/entities/BookGenre';
import { BookEditService } from './services/BookEditService';
import { BookFindService } from './services/BookFindService';
@Controller('admin/books')
export class BooksController {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    @Get()
    async findAll(): Promise<BookDto[]> {
        const findService = new BookFindService(this.dataSource);
        const books = await findService.findAllBooks()
        const dto = this.toBookDtoArray(books);
        return dto;
    }
    @Get("find")
    async find(@Query('id') id: number): Promise<BookDto> {
        const findService = new BookFindService(this.dataSource);
        const book = await findService.findBookById(id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        const dto = this.toBookDto(book);
        return dto;
    }
    @Post()
    async create(@Body() bookDto: Partial<BookDto>): Promise<Book> {
        return this.dataSource.transaction(async (manager) => {
            const service = new BookEditService(this.dataSource, manager);

            const bookData = this.toBookEntity(bookDto);
            const book = await service.createBook(bookData);
            return book;
    
        });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() bookDto: Partial<BookDto>): Promise<Book> {
        return this.dataSource.transaction(async (manager) => {
            const service = new BookEditService(this.dataSource, manager);
            const bookData = this.toBookEntity(bookDto);
            const book = service.updateBook(id, bookData);

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

    private toBookDto(book: Book): BookDto {
        return plainToInstance(BookDto, book);
    }
    private toBookDtoArray(books: Book[]): BookDto[] {
        return plainToInstance(BookDto, books);
    }
    private toBookEntity(bookDto: Partial<BookDto>): Book {
        const book = plainToInstance(Book, bookDto);
        book.bookAuthors = [];
        book.bookGenres = [];
        for (let i = 0; i < bookDto.genres.length; i++) {
            const genreDto = bookDto.genres[i];
            const genre = plainToInstance(Genre, genreDto, {
                exposeDefaultValues: true,
                enableImplicitConversion: true,
            });
            if(genreDto.isNew) {
                genre.id = 0;
            }
            const refBook = new Book(
                book.id,
                book.title,
                book.author,
                book.description,
                book.publishedYear,
            )
            const bookGenre = new BookGenre(0, refBook, genre);
            book.bookGenres.push(bookGenre); 
        }
        console.log("book entity", book);
        return book;
    }
}
