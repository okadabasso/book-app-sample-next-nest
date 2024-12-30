import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}