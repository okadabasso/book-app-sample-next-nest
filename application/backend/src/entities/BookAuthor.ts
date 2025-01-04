import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '@/entities/Book';
import { Author } from '@/entities/Author';

@Entity()
export class BookAuthor {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.bookAuthors)
    book: Book;

    @ManyToOne(() => Author, author => author.bookAuthors)
    author: Author;
}