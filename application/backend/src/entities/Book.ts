import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { BookAuthor } from '@/entities/BookAuthor';
import { BookGenre } from '@/entities/BookGenre';

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column('text')
    description: string;

    @Column()
    publishedYear: number;

    @Column()
    genre: string;

    @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.book)
    bookAuthors: BookAuthor[];

    @OneToMany(() => BookGenre     , bookGenre => bookGenre.book,  )
    bookGenres: BookGenre[];

    constructor(id:number, title: string, author: string, description: string, publishedYear: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.publishedYear = publishedYear;
        this.genre = "";

    }
}