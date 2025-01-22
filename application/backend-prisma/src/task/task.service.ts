import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { }
    async getTasks() {
        return this.prisma.taskItem.findMany({
            include: {
                user: true,
            },
        });
    }

}
