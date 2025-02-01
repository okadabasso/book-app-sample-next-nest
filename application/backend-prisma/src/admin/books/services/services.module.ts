import { Module } from '@nestjs/common';
import { BooksService } from './BookService';

@Module({
    imports: [],
    providers: [
        BooksService
    ],
    exports: [
        BooksService
    ]
})
export class ServicesModule {}
