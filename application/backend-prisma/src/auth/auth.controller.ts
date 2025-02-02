import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/SignInDto';
import { UserDto } from './dto/UserDto';
import { PrismaService } from '@/prisma/prisma.service';
import { compare } from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private readonly prisma: PrismaService) {}

    @Post("signin")
    async singIn(@Body() dto: Partial<SignInDto>): Promise<UserDto> {

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
 
        
        
        if (user && await compare(dto.password, user.passwordHash)) {
            const userDto = new UserDto(user.userId, user.userName, user.email, user.userRoles.map(ur => ur.role.roleName));
            console.log("found", userDto)
            return userDto;
        }
        console.log("not found", dto)
        throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }


}
