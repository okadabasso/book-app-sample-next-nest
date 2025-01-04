import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BookGenre } from '@/entities/BookGenre';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => BookGenre, bookGenre => bookGenre.genre)
    bookGenres: BookGenre[];
}