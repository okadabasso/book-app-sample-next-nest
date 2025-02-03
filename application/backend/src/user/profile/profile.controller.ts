import { UserDto } from '@/auth/dto/UserDto';
import { LoggingService } from '@/shared/logging/logging.service';
import { Controller, Get, NotFoundException, Query, Req } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProfileDto } from './dto/ProfileDto';
import { AuthUser } from '@/entities/AuthUser';
import { plainToInstance } from 'class-transformer';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly dataSource: DataSource,
        private readonly logger:LoggingService
    ) {}

    @Get()
    async getProfile(@Query('username') userName: string): Promise<ProfileDto> {
        this.logger.log(`Get profile for user ${userName}`);
        const user = await this.dataSource.getRepository(AuthUser).findOne({ where: { userName: userName } });

        if (!user) {
            throw new NotFoundException(`profile with username ${userName} not found`);
        }
        const profile = plainToInstance(ProfileDto, user,{ excludeExtraneousValues: true });
        profile.originalUserName = user.userName;
        
        return profile;
    }
}
