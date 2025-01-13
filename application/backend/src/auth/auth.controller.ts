import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/SignInDto';
import { UserDto } from './dto/UserDto';

const users = [
    { id:"administrator@example.com", name: "administrator", email: "administrator@example.com", role: "administrator", password: "P@ssw0rd"},
    { id:"user001@example.com", name: "user001", email: "user001@example.com", role: "user", password: "password1"},
    { id:"user002@example.com", name: "user002", email: "user002@example.com", role: "user", password: "password2"},
]
@Controller('auth')
export class AuthController {
    @Post("signin")
    async singIn(@Body() dto: Partial<SignInDto>): Promise<UserDto> {
        const user = users.find(user => user.id === dto.username) || null;     
        if(user && user.password  === dto.password){
            return user;
        }   
        console.log("not found", dto)
        throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);    
    }
    
    
}
