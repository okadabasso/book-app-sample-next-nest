import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/SignInDto';
import { UserDto } from './dto/UserDto';
import { PrismaService } from '@/prisma/prisma.service';
import { compare } from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { LoggingService } from '@/logging/logging.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggingService
    ) {}

    @Post("signin")
    async singIn(@Body() dto: Partial<SignInDto>): Promise<UserDto> {

        const user = await this.prisma.authUser.findFirst({
            where: { userName: dto.username },
            include: {
                userRoles: { include: { role: true }}
            }
        });
 
        if (user && await compare(dto.password, user.passwordHash)) {
            const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });
            this.logger.log("found " + JSON.stringify(userDto));
            return userDto;
        }
        this.logger.log("not found" + JSON.stringify(dto));
        throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }


}
