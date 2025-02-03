import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from '@/entities/AuthUser';
import { LoggingModule } from '@/shared/logging/logging.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser]), LoggingModule],
  
  controllers: [ProfileController],
  providers: [
    
  ],
})
export class ProfileModule {}
