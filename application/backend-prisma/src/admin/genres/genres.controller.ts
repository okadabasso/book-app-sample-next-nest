import { Controller, Get, Query } from '@nestjs/common';
import { GenreDto } from '../books/dto/BookDto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '@/prisma/prisma.service';
import { LoggingService } from '@/logging/logging.service';

@Controller('admin/genres')
export class GenresController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggingService
    ) { }
    @Get()
    async find(@Query("query") query:string): Promise<GenreDto[]> {
        if(!query){
            const genres = await this.prisma.genre.findMany({
                    orderBy: { id: 'asc' },
            });
            
            return genres ? plainToInstance(GenreDto, genres) : [];
        }
        const genres = await this.prisma.genre.findMany({
            where: { name: {contains:query, mode: 'insensitive'}},
            orderBy: { id: 'asc' },
        });

        return genres ? plainToInstance(GenreDto, genres) : [];
    }

}
