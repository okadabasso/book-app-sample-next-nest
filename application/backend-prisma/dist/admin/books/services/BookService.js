"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const prisma_service_1 = require("../../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let BooksService = class BooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBooks() {
        const books = await this.prisma.book.findMany({
            include: { bookGenres: { include: { genre: true } } },
            orderBy: { id: 'asc' }
        });
        return books;
    }
    async getBookById(id) {
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
    async createBook(data) {
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
    async updateBook(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const newGenres = await Promise.all(data.genres.map(async (genre) => {
                return prisma.genre.upsert({
                    where: { id: genre.id },
                    update: {},
                    create: { name: genre.name },
                });
            }));
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
    async deleteBook(id) {
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
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=BookService.js.map