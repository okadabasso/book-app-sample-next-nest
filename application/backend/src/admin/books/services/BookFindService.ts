import { Author } from '@/entities/Author';
import { Book } from '@/entities/Book';
import { BookAuthor } from '@/entities/BookAuthor';
import { BookGenre } from '@/entities/BookGenre';
import { Genre } from '@/entities/Genre';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';

interface BookFindOption{
    limit?: number;
    offset?: number;
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
            order: { id: 'ASC' },
        };
    
        if(option){
            Object.assign(options, {
                take: option.limit || undefined,
                skip: option.offset || undefined,
                order: option.order || undefined,
            });
        }
    
        const { bookRepository } = this.getRepositories();
        const books = bookRepository.find(options);
        return books;
    }

}