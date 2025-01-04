import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookAuthor } from './BookAuthor';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birthdate: Date | null;

    @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.author)
    bookAuthors: BookAuthor[];
}