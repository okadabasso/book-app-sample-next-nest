import { GenreDto } from '../books/dto/BookDto';
import { PrismaService } from '@/prisma/prisma.service';
import { LoggingService } from '@/logging/logging.service';
export declare class GenresController {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: LoggingService);
    find(query: string): Promise<GenreDto[]>;
}
