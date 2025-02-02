import { LoggingService } from '@/logging/logging.service';
import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './services/BookService';
import { BookDto, EditBookDto } from './dto/BookDto';
import { plainToInstance } from 'class-transformer';
import { Book } from '@prisma/client';

@Controller('admin/books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService,
        private readonly logger: LoggingService
    ) {}

    @Get()
    async getBooks(): Promise<BookDto[]> {
        this.logger.log('Getting all books');
        const books = await this.booksService.getBooks();

        // Prisma のデータを DTO に変換
        const bookDtos = books.map(book => plainToInstance(BookDto, book, { excludeExtraneousValues: true }));
        return bookDtos;
        
    }
    @Get("find")
    async findBook(@Query('id') id: string): Promise<BookDto> {
        const book = await this.booksService.getBookById(parseInt(id));
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        const dto = plainToInstance(BookDto, book, { excludeExtraneousValues: true });
        return dto;

    }
    @Post()
    async create(@Body() bookDto: EditBookDto): Promise<Book> {

        const result = await this.booksService.createBook(bookDto);
        return result;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() bookDto: EditBookDto): Promise<Book> {
        const bookId = parseInt(id);
        const result = await this.booksService.updateBook(bookId, bookDto);
        return result;

    }

}
