import { LoggingService } from '@/logging/logging.service';
import { BooksService } from './services/BookService';
import { BookDto, CreateBookDto, UpdateBookDto } from './dto/BookDto';
import { Book } from '@prisma/client';
export declare class BooksController {
    private readonly booksService;
    private readonly logger;
    constructor(booksService: BooksService, logger: LoggingService);
    getBooks(): Promise<BookDto[]>;
    findBook(id: string): Promise<BookDto>;
    create(bookDto: CreateBookDto): Promise<Book>;
    update(id: string, bookDto: UpdateBookDto): Promise<Book>;
}
