import { PrismaService } from "@/prisma/prisma.service";
import { Book, BookGenre, Genre } from "@prisma/client";
import { BookDto, CreateBookDto, UpdateBookDto } from "../dto/BookDto";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }
    async getBooks(): Promise<Book[]> {
        const books = await this.prisma.book.findMany({
            include: { bookGenres: { include: { genre: true } } },
            orderBy: { id: 'asc' }
        });
        return books;

    }
    async getBookById(id: number): Promise<Book> {
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
    async createBook(data: CreateBookDto): Promise<Book> {
        // 新規のジャンルを先に登録
        const newGenres = await Promise.all(data.genres.map(async (genre) => {
            if (genre.isNew) {
                const newGenre = await this.prisma.genre.create({
                    data: { name: genre.name }
                });
                return newGenre;
            }
            return genre;
        }));
        return this.prisma.book.create({
            data: {
                title: data.title,
                author: data.author,
                publishedYear: data.publishedYear,
                description: data.description,
                bookGenres: {
                    create: newGenres.map(genre => ({
                        genreId: genre.id,
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

            // 現在のジャンルを取得
            const currentBook = await prisma.book.findUnique({
                where: { id },
                include: {
                    bookGenres: {
                        include: {
                            genre: true
                        }
                    }
                }
            });

            if (!currentBook) {
                throw new Error(`Book with id ${id} not found`);
            }

            const currentGenres = currentBook.bookGenres.map(bg => bg.genre);

            // 削除するジャンル
            const genresToDelete = currentGenres.filter(currentGenre => 
                !newGenres.some(newGenre => newGenre.id === currentGenre.id)
            );

            // 追加するジャンル
            const genresToAdd = newGenres.filter(newGenre => 
                !currentGenres.some(currentGenre => currentGenre.id === newGenre.id)
            );

            // 本のジャンルを更新
            const updatedBook = await prisma.book.update({
                where: { id },
                data: {
                    title: data.title,
                    bookGenres: {
                        deleteMany: {
                            genreId: { in: genresToDelete.map(genre => genre.id) }
                        },
                        create: genresToAdd.map(genre => ({
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