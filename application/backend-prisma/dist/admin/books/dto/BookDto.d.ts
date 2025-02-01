export declare class BookDto {
    id: number;
    title: string;
    author: string;
    publishedYear?: number;
    description: string;
    genres: GenreDto[];
    constructor(id: number, title: string, author: string, publishedYear: number, description: string, genres: GenreDto[]);
}
export declare class CreateBookDto {
    title: string;
    author: string;
    publishedYear: number;
    description: string;
    genres: GenreDto[];
}
export declare class UpdateBookDto {
    title: string;
    author: string;
    publishedYear: number;
    description: string;
    genres: GenreDto[];
}
export declare class GenreDto {
    id: number;
    name: string;
    isNew: boolean;
    constructor(id: number, name: string);
}
