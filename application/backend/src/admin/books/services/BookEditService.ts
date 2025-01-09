import { DataSource, EntityManager, Repository } from 'typeorm';
import { Book } from '@/entities/Book';
import { BookGenre } from '@/entities/BookGenre';
import { BookAuthor } from '@/entities/BookAuthor';
import { Genre } from '@/entities/Genre';
import { Author } from '@/entities/Author';
import { BookDto } from '../dto/BookDto';
import { BookFindService } from './BookFindService';

export class BookEditService {
    private dataSource: DataSource;
    private manager: EntityManager;

    private bookRepository: Repository<Book>;
    private bookGenreRepository: Repository<BookGenre>;
    private bookAuthorRepository: Repository<BookAuthor>;
    private genreRepository: Repository<Genre>;
    private authorRepository: Repository<Author>;


    constructor(dataSource: DataSource, manager?: EntityManager) {
        this.dataSource = dataSource;
        this.manager = manager || dataSource!.manager;

        this.bookRepository = this.manager.getRepository(Book);
        this.bookGenreRepository = this.manager.getRepository(BookGenre);
        this.bookAuthorRepository = this.manager.getRepository(BookAuthor);
        this.genreRepository = this.manager.getRepository(Genre);
        this.authorRepository = this.manager.getRepository(Author);
    }
    async createBook(bookData: Partial<Book>): Promise<Book> {
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
        const bookFindService = new BookFindService(this.dataSource, this.manager);
        const book = await bookFindService.findBookById(id);

        if (!book) {
            throw new Error('Book not found');
        }

        await this.manager.remove(book);
    }
    private  async createBookEntry(bookData: Partial<Book>): Promise<Book> {
        const book = this.bookRepository.create(bookData);
        await this.bookRepository.save(book);

        return book;
    }
    private async updateBookEntry(id:number, updateData: Partial<Book>): Promise<Book> {
        const bookFindService = new BookFindService(this.dataSource, this.manager);
        const book = await bookFindService.findBookById(id);

        book.title = updateData.title;
        book.author = updateData.author;
        book.publishedYear = updateData.publishedYear;
        book.description = updateData.description;

        await this.bookRepository.save(book);

        return book;
    }
    private async updateBookGenreEntries(book: Book, bookGenres: BookGenre[]): Promise<void> {
        // 登録済みの bookGenre が bookGenres に含まれていない場合は削除
        // 登録済みの bookGenre が bookGenres に含まれている場合は更新
        // bookGenres に含まれているが登録済みでない場合は新規登録
        for (let i = 0; i < book.bookGenres.length; i++) {
            const originalBookGenre = book.bookGenres[i];
            if (bookGenres.findIndex((bookGenre) => bookGenre.genre.id === originalBookGenre.genre.id) === -1) {
                await this.bookGenreRepository.remove(originalBookGenre);
                continue;
            }
            // ここで originalBookGenreの id が0なら book が新規登録のはずなので、originalBookGenre を保存できない
            if(originalBookGenre.id !== 0){
                this.bookGenreRepository.save(originalBookGenre);
            }
        }
        for (let i = 0; i < bookGenres.length; i++) {
            const bookGenre = bookGenres[i];
            if (bookGenre.genre.id === 0) {
                this.genreRepository.create(bookGenre.genre);
                await this.genreRepository.save(bookGenre.genre);

            }
            if (book.bookGenres.findIndex((originalBookGenre) => originalBookGenre.genre.id === bookGenre.genre.id) === -1) {
                bookGenre.book = book;
                this.bookGenreRepository.create(bookGenre);
                await this.bookGenreRepository.save(bookGenre);
            }
        }
    }
}