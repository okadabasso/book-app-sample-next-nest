import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '@/entities/Book';
import { Genre } from '@/entities/Genre';

@Entity()
export class BookGenre {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.bookGenres)
    book: Book;

    @ManyToOne(() => Genre, genre => genre.bookGenres)
    genre: Genre;

    constructor (id: number, book: Book, genre: Genre) {
        this.id = id;
        this.book = book;
        this.genre = genre;
    }
}