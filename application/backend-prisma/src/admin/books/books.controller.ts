import { LoggingService } from '@/logging/logging.service';
import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './services/BookService';
import { BookDto, EditBookDto } from './dto/BookDto';
import { plainToInstance } from 'class-transformer';
import { Book } from '@prisma/client';
import { BookFindDto } from './dto/BookFindDto';

@Controller('admin/books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService,
        private readonly logger: LoggingService
    ) {}

    @Get()
    async getBooks(@Query('query') query: string, @Query('offset') offset: string, limit: string): Promise<BookFindDto> {
        this.logger.log('Getting all books');
        const option = {
            query:query,
            limit: limit ?  Number(limit) : 20,
            offset: offset ? Number(offset) : 0,
        }
        const books = await this.booksService.getBooks(option);

        // Prisma のデータを DTO に変換
        const bookDtos: BookDto[] = plainToInstance(BookDto, books, { excludeExtraneousValues: true });
        const count = await this.booksService.getBookCount(option);
        const bookFindDto = new BookFindDto(bookDtos, '', Number(limit), Number(offset), count );
        return bookFindDto;
        
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
