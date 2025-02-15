import { Author } from '@/entities/Author';
import { Book } from '@/entities/Book';
import { BookAuthor } from '@/entities/BookAuthor';
import { BookGenre } from '@/entities/BookGenre';
import { Genre } from '@/entities/Genre';
import { LoggingService } from '@/shared/logging/logging.service';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, FindManyOptions, FindOptionsOrder, Like, Repository } from 'typeorm';

interface BookFindOption{
    limit?: number;
    offset?: number;
    title?: string;
    order?: FindOptionsOrder<Book>;
}

@Injectable()
export class BookFindService {
    private readonly bookRelations = [
        'bookAuthors',
        'bookAuthors.author',
        'bookGenres',
        'bookGenres.genre',
    ];

    constructor(
        private readonly dataSource: DataSource,
        private readonly transactionManagerProvider: TransactionManagerProvider,
        private readonly logger: LoggingService
    ) {

    }
    private get manager(): EntityManager {
        return this.transactionManagerProvider.manager || this.dataSource.manager;
    }

    private getRepositories(){
        return {
            bookRepository: this.manager.getRepository(Book),
            bookGenreRepository: this.manager.getRepository(BookGenre),
        };
    }
    
    async findBookById(id: number): Promise<Book | null> {
        const { bookRepository } = this.getRepositories();
        const book = await bookRepository.findOne({
            where: { id },
            relations: this.bookRelations,
        });

        return book ?? null;
    }

    async findAllBooks(option?: BookFindOption): Promise<Book[]> {
        const options: FindManyOptions<Book> = {
            relations: this.bookRelations,
        };
    
        if(option){
            Object.assign(options, {
                take: option.limit || process.env.DEFAULT_PAGE_SIZE,
                skip: option.offset || 0,
                order: { id: 'ASC' },
            });
        }
        if(option?.title !== ''){
            options.where = { title: Like(`%${option.title}%`) };
        }

        this.logger.log(`Finding books with options: ${JSON.stringify(options)}`);
        const { bookRepository } = this.getRepositories();
        const books = bookRepository.find(
            options);
        return books;
    }
    async totalBooks(query: string): Promise<number> {
        const { bookRepository } = this.getRepositories();
        if(query === ''){
            return await bookRepository.count();
        }
        const total = await bookRepository.count( { where: { title: Like(`%${query}%`) }});
        return total;
    }

}