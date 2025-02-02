import { PrismaService } from "@/prisma/prisma.service";
import { Book, BookGenre, Genre, Prisma, PrismaClient } from "@prisma/client";
import { BookDto, EditBookDto } from "../dto/BookDto";
import { Injectable } from "@nestjs/common";

interface BookEditData {
    title: string;
    author: string;
    publishedYear: number;
    description: string;
};
// トランザクション中の prisma クライアント
type PrismaTransactionClient = Omit<PrismaClient<Prisma.PrismaClientOptions, never>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

@Injectable()
export class BooksService {
    private readonly bookRelations = {
        bookGenres: {
            include: {
                genre: true
            }
        }
    };

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
            include: this.bookRelations
        });
    }
    async createBook(data: EditBookDto): Promise<Book> {
        return this.prisma.$transaction(async (prisma: PrismaTransactionClient) => {
            // 新規のジャンルを先に登録
            const newGenres = await this.createNewGenres(prisma, data);
            return this.prisma.book.create({
                data: {
                    ...this.extractBookFromDto(data),
                    bookGenres: { 
                        create: newGenres.map(genre => ({ genreId: genre.id, }))
                    }
                },
                include: this.bookRelations
            });
        });
    }

    async updateBook(id: number, data: EditBookDto): Promise<Book> {
        return this.prisma.$transaction(async (prisma: PrismaTransactionClient) => {
            // 現在のジャンルを取得
            const currentBook = await prisma.book.findUnique({
                where: { id },
                include: this.bookRelations
            });
            if (!currentBook) {
                throw new Error(`Book with id ${id} not found`);
            }
            // 新しいジャンルを作成
            const newGenres = await this.createNewGenres(prisma, data);
            // 更新前後で変更されたジャンルを取得
            const { genresToDelete, genresToAdd } = this.getGenresToUpdate(currentBook, newGenres);

            // 本のジャンルを更新
            const updatedBook = await prisma.book.update({
                where: { id },
                data: {
                    ...this.extractBookFromDto(data),
                    bookGenres: {
                        deleteMany: { genreId: { in: genresToDelete.map(genre => genre.id) }},
                        create: genresToAdd.map(genre => ({genreId: genre.id,})),
                    }
                },
                include: this.bookRelations
            });

            return updatedBook;
        });
    }

    async deleteBook(id: number): Promise<Book> {
        return this.prisma.$transaction(async (prisma) => {
            const book = await prisma.book.findUnique({where: {id}});
            if(!book){
                throw new Error(`Book with id ${id} not found`);
            }
            return this.prisma.book.delete({
                where: { id: id },
                include: this.bookRelations
            });
        });
    }

    private async createNewGenres(prisma: PrismaTransactionClient,  data: EditBookDto): Promise<Genre[]> {
        return await Promise.all(data.genres.map(async (genre) => {
            if (genre.isNew) {
                const newGenre = await prisma.genre.create({
                    data: { name: genre.name }
                });
                return newGenre;
            }
            return genre;
        }));
    }
    
    private extractBookFromDto(data: EditBookDto) : BookEditData {
        return {
            title: data.title,
            author: data.author,
            publishedYear:  parseInt(data.publishedYear),
            description: data.description

        }
    }
    private getGenresToUpdate(currentBook: { bookGenres: ({ genre: { name: string; id: number; }; } & { id: number; bookId: number; genreId: number; })[]; } & { id: number; title: string; author: string | null; description: string | null; publishedYear: number | null; createdAt: Date; }, newGenres: { name: string; id: number; }[]) {
        const currentGenres = currentBook.bookGenres.map(bg => bg.genre);
        // 削除するジャンル
        const genresToDelete = currentGenres.filter(currentGenre => 
            !newGenres.some(newGenre => newGenre.id === currentGenre.id)
        );

        // 追加するジャンル
        const genresToAdd = newGenres.filter(newGenre => 
            !currentGenres.some(currentGenre => currentGenre.id === newGenre.id)
        );
        return { genresToDelete, genresToAdd };
    }

}