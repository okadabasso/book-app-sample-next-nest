import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { Author } from "./Author";
import { Genre } from "./Genre";


export class Book {
    @Expose()
    id: number;
    @Expose()
    title: string;
    @Expose()
    author: string;
    @Expose()
    description: string;
    @Expose()
    publishedYear: number;
    @Expose()
    genre: string;

    @Expose()
    @Type(() => Genre)
    genres: Genre[];
    @Expose()
    @Type(() => Author)
    authors: Author[];

    constructor(id: number, title: string, author: string, description: string, publishedYear: number, genre: string, genres: Genre[], authors: Author[]) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.publishedYear = publishedYear;
        this.genre = genre;
        this.genres = genres;
        this.authors = authors;
    }
}

export class BookFind{
    @Expose()
    books: Book[];
    @Expose()
    error: string;
    @Expose()
    limit: number;
    @Expose()
    offset: number;
    @Expose()
    total: number;

    constructor(books: Book[], error: string, limit: number, offset: number, total: number){
        this.books = books;
        this.error = error;
        this.limit = limit;
        this.offset = offset;
        this.total = total;
    }
}