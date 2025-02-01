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
exports.GenreDto = exports.UpdateBookDto = exports.CreateBookDto = exports.BookDto = void 0;
const class_transformer_1 = require("class-transformer");
class BookDto {
    constructor(id, title, author, publishedYear, description, genres) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.description = description;
        this.genres = genres;
    }
}
exports.BookDto = BookDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BookDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BookDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BookDto.prototype, "author", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BookDto.prototype, "publishedYear", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BookDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => GenreDto),
    (0, class_transformer_1.Transform)(({ obj }) => obj.bookGenres
        ? obj.bookGenres.map((bookGenre) => (0, class_transformer_1.plainToInstance)(GenreDto, bookGenre.genre))
        : [], { toClassOnly: true }),
    __metadata("design:type", Array)
], BookDto.prototype, "genres", void 0);
class CreateBookDto {
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "author", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "publishedYear", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CreateBookDto.prototype, "genres", void 0);
class UpdateBookDto {
}
exports.UpdateBookDto = UpdateBookDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "author", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UpdateBookDto.prototype, "publishedYear", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UpdateBookDto.prototype, "genres", void 0);
class GenreDto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.GenreDto = GenreDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GenreDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GenreDto.prototype, "name", void 0);
//# sourceMappingURL=BookDto.js.map