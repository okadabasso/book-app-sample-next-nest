import "reflect-metadata";
import { Expose, Transform, Type } from "class-transformer";
import { Author } from "./Author";
import { Genre } from "./Genre";

export interface BookData {
    id: number;
    title: string;
    author: string;
    description: string;
    publishedDate?: string;
    publisher?: string;
    isbn?: string;
    thumbnail?: string;
    genres: Genre[];
    authors?: Author[];
}

export interface BookFindResult{
    books: BookData[];
    error: string;
    limit: number;
    offset: number;
    total: number;

}