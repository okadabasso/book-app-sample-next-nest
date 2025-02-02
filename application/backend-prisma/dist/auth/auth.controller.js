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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const UserDto_1 = require("./dto/UserDto");
const prisma_service_1 = require("../prisma/prisma.service");
const bcryptjs_1 = require("bcryptjs");
let AuthController = class AuthController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async singIn(dto) {
        const user = await this.prisma.authUser.findFirst({
            where: { userName: dto.username },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        if (user && await (0, bcryptjs_1.compare)(dto.password, user.passwordHash)) {
            const userDto = new UserDto_1.UserDto(user.userId, user.userName, user.email, user.userRoles.map(ur => ur.role.roleName));
            console.log("found", userDto);
            return userDto;
        }
        console.log("not found", dto);
        throw new common_1.HttpException("User not found", common_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("signin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "singIn", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map