import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
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

    @OneToMany(() => BookGenre     , bookGenre => bookGenre.genre)
    bookGenres: BookGenre[];
}