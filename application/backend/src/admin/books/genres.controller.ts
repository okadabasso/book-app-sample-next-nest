import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { Genre } from '@/entities/Genre';
import { GenreDto } from './dto/GenreDto';


@Controller('admin/genres')
export class GenresController {
    constructor(
        @InjectRepository(Genre)
        private readonly repos: Repository<Genre>,
    ) { }

    @Get()
    async find(@Query("query") query:string): Promise<GenreDto[]> {
        if(!query){
            return plainToInstance(GenreDto, 
                await this.repos.find({
                    order: { id: 'ASC' },
                })
            );
        }
        const genres = await this.repos.find({
            where: { name: Like(`%${query}%`) },
            order: { id: 'ASC' },
        });
        const dto = plainToInstance(GenreDto, genres);
        return dto;
    }


}
