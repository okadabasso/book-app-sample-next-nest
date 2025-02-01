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
exports.GenresController = void 0;
const common_1 = require("@nestjs/common");
const BookDto_1 = require("../books/dto/BookDto");
const class_transformer_1 = require("class-transformer");
const prisma_service_1 = require("../../prisma/prisma.service");
const logging_service_1 = require("../../logging/logging.service");
let GenresController = class GenresController {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
    async find(query) {
        if (!query) {
            const genres = await this.prisma.genre.findMany({
                orderBy: { id: 'asc' },
            });
            const dto = (0, class_transformer_1.plainToInstance)(BookDto_1.GenreDto, genres);
            return dto;
        }
        const genres = await this.prisma.genre.findMany({
            where: { name: { contains: query, mode: 'insensitive' } },
            orderBy: { id: 'asc' },
        });
        const dto = (0, class_transformer_1.plainToInstance)(BookDto_1.GenreDto, genres);
        return dto;
    }
};
exports.GenresController = GenresController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("query")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenresController.prototype, "find", null);
exports.GenresController = GenresController = __decorate([
    (0, common_1.Controller)('admin/genres'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], GenresController);
//# sourceMappingURL=genres.controller.js.map