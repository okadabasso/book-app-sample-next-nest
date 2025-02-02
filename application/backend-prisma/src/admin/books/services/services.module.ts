import { Module } from '@nestjs/common';
import { BooksService } from './BookService';
import { LoggingModule } from '@/logging/logging.module';

@Module({
    imports: [
        LoggingModule
    ],
    providers: [
        BooksService
    ],
    exports: [
        BooksService
    ]
})
export class ServicesModule {}
