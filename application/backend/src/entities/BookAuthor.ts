import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from './/Book';
import { Author } from './Author';

@Entity()
export class BookAuthor {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.bookAuthors)
    book: Book;

    @ManyToOne(() => Author, author => author.bookAuthors)
    author: Author;
}