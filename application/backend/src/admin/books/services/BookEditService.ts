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


@Injectable()
export class BookEditService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly transactionManagerProvider: TransactionManagerProvider,
        private readonly bookFindService: BookFindService,
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
        console.log(this.manager.transaction);
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
        const findService = new BookFindService(this.dataSource, this.transactionManagerProvider);
        const book = await findService.findBookById(id);

        book.title = updateData.title;
        book.author = updateData.author;
        book.publishedYear = updateData.publishedYear;
        book.description = updateData.description;

        await bookRepository.save(book);

        return book;
    }
    private async updateBookGenreEntries(book: Book, bookGenres: BookGenre[]): Promise<void> {
        const { bookGenreRepository, genreRepository } = this.getRepositories();
        // 登録済みの bookGenre が bookGenres に含まれていない場合は削除
        // 登録済みの bookGenre が bookGenres に含まれている場合は更新
        // bookGenres に含まれているが登録済みでない場合は新規登録
        for (let i = 0; i < book.bookGenres.length; i++) {
            const originalBookGenre = book.bookGenres[i];
            if (bookGenres.findIndex((bookGenre) => bookGenre.genre.id === originalBookGenre.genre.id) === -1) {
                await bookGenreRepository.remove(originalBookGenre);
                continue;
            }
            // ここで originalBookGenreの id が0なら book が新規登録のはずなので、originalBookGenre を保存できない
            if(originalBookGenre.id !== 0){
                bookGenreRepository.save(originalBookGenre);
            }
        }
        for (let i = 0; i < bookGenres.length; i++) {
            const bookGenre = bookGenres[i];
            if (bookGenre.genre.id === 0) {
                genreRepository.create(bookGenre.genre);
                await genreRepository.save(bookGenre.genre);

            }
            if (book.bookGenres.length === 0 || book.bookGenres.findIndex((originalBookGenre) => originalBookGenre.genre.id === bookGenre.genre.id) === -1) {
                bookGenre.book = book;
                bookGenreRepository.create(bookGenre);
                await bookGenreRepository.save(bookGenre);
            }
        }
    }
}