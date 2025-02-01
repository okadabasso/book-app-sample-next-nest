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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const logging_service_1 = require("../../logging/logging.service");
const common_1 = require("@nestjs/common");
const BookService_1 = require("./services/BookService");
const BookDto_1 = require("./dto/BookDto");
const class_transformer_1 = require("class-transformer");
let BooksController = class BooksController {
    constructor(booksService, logger) {
        this.booksService = booksService;
        this.logger = logger;
    }
    async getBooks() {
        this.logger.log('Getting all books');
        const books = await this.booksService.getBooks();
        const bookDtos = books.map(book => (0, class_transformer_1.plainToInstance)(BookDto_1.BookDto, book, { excludeExtraneousValues: true }));
        return bookDtos;
    }
    async findBook(id) {
        const book = await this.booksService.getBookById(parseInt(id));
        if (!book) {
            throw new common_1.NotFoundException(`Book with id ${id} not found`);
        }
        const dto = (0, class_transformer_1.plainToInstance)(BookDto_1.BookDto, book, { excludeExtraneousValues: true });
        return dto;
    }
    async create(bookDto) {
        const result = await this.booksService.createBook(bookDto);
        return result;
    }
    async update(id, bookDto) {
        bookDto.genres.map(item => { item.id = item.isNew ? 0 : item.id; });
        const bookId = parseInt(id);
        const result = await this.booksService.updateBook(bookId, bookDto);
        return result;
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBooks", null);
__decorate([
    (0, common_1.Get)("find"),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findBook", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookDto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, BookDto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('admin/books'),
    __metadata("design:paramtypes", [BookService_1.BooksService,
        logging_service_1.LoggingService])
], BooksController);
//# sourceMappingURL=books.controller.js.map