import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Book } from '@/entities/Book';
import { BookDto } from './dto/BookDto';
import { Genre } from '@/entities/Genre';
import { BookGenre } from '@/entities/BookGenre';
import { BookEditService } from './services/BookEditService';
import { BookFindService } from './services/BookFindService';
import { InjectDataSource } from '@nestjs/typeorm';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { BookFindDto } from './dto/BookFindDto';

@Controller('admin/books')
export class BooksController {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly bookEditService: BookEditService,
        private readonly bookFindService: BookFindService,
        private readonly transactionManagerProvider: TransactionManagerProvider,
    ) { }

    @Get()
    async findAll(@Query('query') query: string, @Query('offset') offset: number): Promise<BookFindDto> {
        const books = await this.bookFindService.findAllBooks({ 
            query: query || '',
            limit: Number(process.env.DEFAULT_LIMIT) || 20, 
            offset });
        const count = await this.bookFindService.totalBooks(query);
        const dto = new BookFindDto(this.toBookDtoArray(books), query, 10, offset, count);
        return dto;
    }
    @Get("find")
    async find(@Query('id') id: number): Promise<BookDto> {
        const book = await this.bookFindService.findBookById(id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        const dto = this.toBookDto(book);
        return dto;
    }
    @Post()
    async create(@Body() bookDto: Partial<BookDto>): Promise<Book> {
        const bookData = this.toBookEntity(bookDto);
        const book = await this.bookEditService.createBook(bookData);
        return book;
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() bookDto: Partial<BookDto>): Promise<Book> {
        console.log("controller manager", this.transactionManagerProvider.manager);
        const bookData = this.toBookEntity(bookDto);
        const book = this.bookEditService.updateBook(id, bookData);

        return book;
 

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
                book.isbn,
                book.publisher,
                book.thumbnail,
                book.description,
                book.publishedDate,
            )
            const bookGenre = new BookGenre(0, refBook, genre);
            book.bookGenres.push(bookGenre); 
        }
        console.log("book entity", book);
        return book;
    }
}
