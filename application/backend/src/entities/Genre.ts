import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BookGenre } from '@/entities/BookGenre';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => BookGenre, bookGenre => bookGenre.genre)
    bookGenres: BookGenre[];

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}