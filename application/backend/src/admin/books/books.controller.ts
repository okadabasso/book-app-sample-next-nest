import { Controller, Get } from '@nestjs/common';
import { Book } from '@/types/Book';

@Controller('admin/books')
export class BooksController {
    @Get("findAll")
    findAll(): Book[] {
        return [
            { 
                id: 1, 
                title: 'Book One',
                publisherId: 1,
                publishedDate: new Date(),
                isbn13: '1234567890123',
                genre: 'Fiction',
                summary: 'A book about something'
            },
            { 
                id: 2, 
                title: 'Book Two',
                publisherId: 2,
                publishedDate: new Date(),
                isbn13: '1234567890123',
                genre: 'Non-Fiction',
                summary: 'A book about something else'},
        ];
    }
}
