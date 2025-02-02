import { SignInDto } from './dto/SignInDto';
import { UserDto } from './dto/UserDto';
import { PrismaService } from '@/prisma/prisma.service';
export declare class AuthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    singIn(dto: Partial<SignInDto>): Promise<UserDto>;
}
