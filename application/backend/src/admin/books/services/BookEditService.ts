import { DataSource, EntityManager, Repository } from 'typeorm';
import { Book } from '@/entities/Book';
import { BookGenre } from '@/entities/BookGenre';
import { BookAuthor } from '@/entities/BookAuthor';
import { Genre } from '@/entities/Genre';
import { Author } from '@/entities/Author';
import { BookDto } from '../dto/BookDto';

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
    async create(bookData: Partial<Book>): Promise<Book> {
        const book = this.bookRepository.create(bookData);
        await this.bookRepository.save(book);
        console.log("book data", bookData);
        await this.createBookGenres(book, bookData.bookGenres);
        return book;
    }


    async updateBook(id: number, updateData: Partial<Book>): Promise<Book> {

            const originalBook = await this.bookRepository.findOne({
                where: {id},
                relations: ['bookAuthors', 'bookAuthors.author', 'bookGenres', 'bookGenres.genre'],
            });
            this.updateBookEntity(originalBook, updateData);
            await this.bookRepository.save(originalBook);

            await this.updateBookGenres(originalBook, updateData.bookGenres);

            return originalBook;
    }

    async deleteBook(id: number): Promise<void> {
        const book = await this.manager.findOne(Book, { where: { id } });
        if (!book) {
            throw new Error('Book not found');
        }

        await this.manager.remove(book);
    }
    updateBookEntity(book: Book, updateData: Partial<Book>): Book {
        book.title = updateData.title;
        book.author = updateData.author;
        book.publishedYear = updateData.publishedYear;
        book.description = updateData.description;
        return book;
    }
    async createBookGenres(book: Book, bookGenres: BookGenre[]): Promise<void> {
        for(let i = 0; i < bookGenres.length; i++) {
            const bookGenre = bookGenres[i];
            if (bookGenre.genre.id === 0) {
                this.genreRepository.create(bookGenre.genre);
                await this.genreRepository.save(bookGenre.genre);
            }
            
            bookGenre.book = book;
            this.bookGenreRepository.create(bookGenre);
            await this.bookGenreRepository.save(bookGenre);
        }
    }
    async updateBookGenres(book: Book, bookGenres: BookGenre[]): Promise<void> {
        for( let i = 0; i < book.bookGenres.length; i++) {
            const originalBookGenre = book.bookGenres[i];
            if(bookGenres.findIndex((bookGenre) => bookGenre.genre.id === originalBookGenre.genre.id) === -1) {
                await this.bookGenreRepository.remove(originalBookGenre);
                continue;
            }
            this.bookGenreRepository.save(originalBookGenre);
        }
        for(let i = 0; i < bookGenres.length; i++) {
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