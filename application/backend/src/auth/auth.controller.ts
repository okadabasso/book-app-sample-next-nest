import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/SignInDto';
import { UserDto } from './dto/UserDto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthUser } from '@/entities/AuthUser';
import { compare } from 'bcryptjs';
const users = [
    { id: "administrator@example.com", name: "administrator", email: "administrator@example.com", role: "administrator", password: "P@ssw0rd" },
    { id: "user001@example.com", name: "user001", email: "user001@example.com", role: "user", password: "password1" },
    { id: "user002@example.com", name: "user002", email: "user002@example.com", role: "user", password: "password2" },
]
@Controller('auth')
export class AuthController {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }


    @Post("signin")
    async singIn(@Body() dto: Partial<SignInDto>): Promise<UserDto> {
        const repository = this.dataSource.getRepository(AuthUser);
        const user = await repository.findOne({ 
            where: { 
                userName: dto.username,
                isActive: true 
            } });
        
        
        if (user && await compare(dto.password, user.passwordHash)) {
            const userDto = new UserDto();
            userDto.id = user.userId.toString();
            userDto.email = user.email;
            userDto.name = user.userName;
            userDto.roles = [user.role];

            return userDto;
        }
        console.log("not found", dto)
        throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }


}
