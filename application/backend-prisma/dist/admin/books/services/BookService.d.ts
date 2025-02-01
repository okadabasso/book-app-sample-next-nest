import { PrismaService } from "@/prisma/prisma.service";
import { Book } from "@prisma/client";
import { CreateBookDto, UpdateBookDto } from "../dto/BookDto";
export declare class BooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBooks(): Promise<Book[]>;
    getBookById(id: number): Promise<{
        bookGenres: ({
            genre: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            bookId: number;
            genreId: number;
        })[];
    } & {
        id: number;
        title: string;
        author: string | null;
        description: string | null;
        publishedYear: number | null;
        createdAt: Date;
    }>;
    createBook(data: CreateBookDto): Promise<{
        bookGenres: ({
            genre: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            bookId: number;
            genreId: number;
        })[];
    } & {
        id: number;
        title: string;
        author: string | null;
        description: string | null;
        publishedYear: number | null;
        createdAt: Date;
    }>;
    updateBook(id: number, data: UpdateBookDto): Promise<{
        bookGenres: ({
            genre: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            bookId: number;
            genreId: number;
        })[];
    } & {
        id: number;
        title: string;
        author: string | null;
        description: string | null;
        publishedYear: number | null;
        createdAt: Date;
    }>;
    deleteBook(id: number): Promise<{
        bookGenres: ({
            genre: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            bookId: number;
            genreId: number;
        })[];
    } & {
        id: number;
        title: string;
        author: string | null;
        description: string | null;
        publishedYear: number | null;
        createdAt: Date;
    }>;
}
