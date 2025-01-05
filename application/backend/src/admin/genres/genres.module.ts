import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '@/entities/Genre';

@Module({
  controllers: [GenresController],
  imports: [TypeOrmModule.forFeature([Genre])],
  
})
export class GenresModule {}
