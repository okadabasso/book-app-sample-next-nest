import { DataSource, EntityManager, Repository } from 'typeorm';
import { Book } from '@/entities/Book';
import { BookGenre } from '@/entities/BookGenre';
import { BookAuthor } from '@/entities/BookAuthor';
import { Genre } from '@/entities/Genre';
import { Author } from '@/entities/Author';
import { BookDto } from '../dto/BookDto';
import { BookFindService } from './BookFindService';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { Injectable } from '@nestjs/common';
import { LoggingService } from '@/shared/logging/logging.service';


@Injectable()
export class BookEditService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly transactionManagerProvider: TransactionManagerProvider,
        private readonly bookFindService: BookFindService,
        private readonly logger: LoggingService,
    ) {}
    private get manager(): EntityManager {
        const manager = this.transactionManagerProvider.manager;
        if (!manager) {
            throw new Error('Transaction manager is not set');
        }
        return manager;
    }
    private getRepositories(){
        return {
            bookRepository: this.manager.getRepository(Book),
            bookGenreRepository: this.manager.getRepository(BookGenre),
            bookAuthorRepository: this.manager.getRepository(BookAuthor),
            genreRepository: this.manager.getRepository(Genre),
            authorRepository: this.manager.getRepository(Author),
        };
    }
    async createBook(bookData: Partial<Book>): Promise<Book> {
        this.logger.log('createBook');
        const book = await this.createBookEntry(bookData);
        await this.updateBookGenreEntries(book, bookData.bookGenres);
        return book;
    }


    async updateBook(id: number, updateData: Partial<Book>): Promise<Book> {
        const book = await this.updateBookEntry(id, updateData);
        await this.updateBookGenreEntries(book, updateData.bookGenres);
        return book;
    }

    async deleteBook(id: number): Promise<void> {
        const book = await this.bookFindService.findBookById(id);

        if (!book) {
            throw new Error('Book not found');
        }

        await this.manager.remove(book);
    }
    private  async createBookEntry(bookData: Partial<Book>): Promise<Book> {
        const { bookRepository } = this.getRepositories();
        const book = bookRepository.create(bookData);
        book.bookGenres = [];
        book.bookAuthors = [];
        await bookRepository.save(book);

        return book;
    }
    private async updateBookEntry(id:number, updateData: Partial<Book>): Promise<Book> {
        const { bookRepository } = this.getRepositories();
        const book = await this.bookFindService.findBookById(id);

        book.title = updateData.title;
        book.author = updateData.author;
        book.isbn = updateData.isbn;
        book.publisher = updateData.publisher;
        book.thumbnail = updateData.thumbnail;
        book.publishedDate = updateData.publishedDate;
        book.description = updateData.description;

        await bookRepository.save(book);

        return book;
    }
    private async updateBookGenreEntries(book: Book, bookGenres: BookGenre[]): Promise<void> {
        const { bookGenreRepository, genreRepository } = this.getRepositories();
        // 登録済みの bookGenre が bookGenres に含まれていない場合は削除
        // 登録済みの bookGenre が bookGenres に含まれている場合はなにもしない
        // bookGenres に含まれているが登録済みでない場合は新規登録
        
        await Promise.all(
            bookGenres
                .filter((bookGenre) => !book.bookGenres.some(original => bookGenre.genre.id === original.genre.id))
                .map(async (bookGenre) => {
                    genreRepository.create(bookGenre.genre);
                    const newGenre = await genreRepository.save(bookGenre.genre);
                    bookGenreRepository.create({ book, genre: newGenre });

                    bookGenre.book = book;
                    await bookGenreRepository.save(bookGenre);
                    return newGenre;
                })
        );

        await Promise.all(
            book.bookGenres
            .filter((original) => !bookGenres.some((bookGenre) => bookGenre.genre.id === original.genre.id))
            .map(async (bookGenre) => {
                await bookGenreRepository.remove(bookGenre);
                return bookGenre;
            })
        );
    }
}