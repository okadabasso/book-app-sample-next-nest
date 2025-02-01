import { PrismaService } from "@/prisma/prisma.service";
import { Book, BookGenre, Genre } from "@prisma/client";
import { BookDto, CreateBookDto, UpdateBookDto } from "../dto/BookDto";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }
    async getBooks() : Promise<Book[]> {
        const books = await this.prisma.book.findMany({
            include: { bookGenres: { include: { genre: true } } },
            orderBy: { id: 'asc' }
        });
        return books;

    }
    async getBookById(id: number) {
        return this.prisma.book.findUnique({
            where: { id: id },
            include: {
                bookGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });
    }
    async createBook(data: CreateBookDto) {
        return this.prisma.book.create({
            data: {
                title: data.title,

                bookGenres: {
                    create: data.genres.map(genre => ({
                        genreId: genre.id,
                        bookId: 0
                    }))
                }
            },
            include: {
                bookGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });
    }
    async updateBook(id: number, data: UpdateBookDto) {
        return this.prisma.$transaction(async (prisma) => {
            // 新しいジャンルを作成
            const newGenres = await Promise.all(data.genres.map(async (genre) => {
                return prisma.genre.upsert({
                    where: { id: genre.id },
                    update: {},
                    create: { name: genre.name },
                });
            }));

            // 本のジャンルを更新
            const updatedBook = await prisma.book.update({
                where: { id: id },
                data: {
                    title: data.title,
                    bookGenres: {
                        deleteMany: {},
                        create: newGenres.map(genre => ({
                            genreId: genre.id,
                        })),
                    }
                },
                include: {
                    bookGenres: {
                        include: {
                            genre: true
                        }
                    }
                }
            });

            return updatedBook;
        });
    }
    async deleteBook(id: number) {
        return this.prisma.book.delete({
            where: { id: id },
            include: {
                bookGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });
    }
}