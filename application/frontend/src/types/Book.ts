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
    publishedDate: string;

    @Expose()
    publisher?: string;

    @Expose()
    isbn?: string;

    @Expose()
    thumbnail?: string;

    @Expose()
    @Type(() => Genre)
    genres: Genre[];
    @Expose()
    @Type(() => Author)
    authors: Author[];

    constructor(id: number, title: string, author: string, description: string, publishedDate: string, publisher: string, isbn: string, thumbnail: string, genre: string, genres: Genre[], authors: Author[]) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.publishedDate = publishedDate;
        this.publisher = publisher;
        this.isbn = isbn;
        this.thumbnail = thumbnail;
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