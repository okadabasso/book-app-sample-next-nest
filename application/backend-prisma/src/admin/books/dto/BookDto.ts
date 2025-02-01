import { BookGenre, Genre } from "@prisma/client";
import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import e from "express";

export class BookDto {
    @Expose()
    id: number;
    @Expose()
    title: string;
    @Expose()
    author: string;
    @Expose()
    publishedYear?: number;
    @Expose()
    description: string;

    @Expose()
    @Type(() => GenreDto)
    @Transform(({ obj }) => obj.bookGenres 
        ? obj.bookGenres.map((bookGenre: BookGenre & { genre: Genre }) => plainToInstance(GenreDto, bookGenre.genre)) 
        : [], { toClassOnly: true })
    genres: GenreDto[];

    constructor(id: number, title: string, author: string, publishedYear: number, description: string, genres: GenreDto[]) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.description = description;
        this.genres = genres;
    }
}
export class CreateBookDto {
    @Expose()
    title: string;
    @Expose()
    author: string;
    @Expose()
    publishedYear: number;
    @Expose()
    description: string;
    @Expose()
    genres: GenreDto[];
}
export class UpdateBookDto {
    @Expose()
    title: string;
    @Expose()
    author: string;
    @Expose()
    publishedYear: number;
    @Expose()
    description: string;
    @Expose()
    genres: GenreDto[];
}
export class GenreDto {
    @Expose()
    id: number;
    @Expose()
    name: string;

    isNew: boolean

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
