"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const task_module_1 = require("./task/task.module");
const logging_service_1 = require("./logging/logging.service");
const logging_module_1 = require("./logging/logging.module");
const books_module_1 = require("./admin/books/books.module");
const genres_module_1 = require("./admin/genres/genres.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, prisma_module_1.PrismaModule, task_module_1.TaskModule, logging_module_1.LoggingModule, books_module_1.BooksModule, genres_module_1.GenresModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logging_service_1.LoggingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map