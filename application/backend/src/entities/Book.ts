import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { BookAuthor } from './BookAuthor';
import { BookGenre } from './BookGenre';

@Entity("book")
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    title: string;

    @Column({length: 64, nullable: false})
    author: string;

    @Column({length: 13, nullable: true})
    isbn?: string;

    @Column({length: 255, nullable: true})
    publisher?: string;

    @Column({length: 1024, nullable: true})
    thumbnail?: string;

    @Column('text')
    description: string;

    @Column({length: 16, nullable: true})
    publishedDate?: string;

    @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.book)
    bookAuthors: BookAuthor[];

    @OneToMany(() => BookGenre     , bookGenre => bookGenre.book,  )
    bookGenres: BookGenre[];

    constructor(id:number, title: string, author: string, isbn: string, publisher: string, thubmnail: string, description: string, publishedDate: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publisher = publisher;
        this.thumbnail = thubmnail;
        this.description = description;
        this.publishedDate = publishedDate;

    }
}