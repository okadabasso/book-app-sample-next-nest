import { BookDto } from "./BookDto";

export class BookFindDto{
    books: BookDto[];
    error: string;
    limit: number;
    offset: number;
    total: number;

    constructor(books: BookDto[], error: string, limit: number, offset: number, total: number){
        this.books = books;
        this.error = error;
        this.limit = limit;
        this.offset = offset;
        this.total = total;
    }
}