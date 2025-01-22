import { PrismaService } from '@/prisma/prisma.service';
export declare class TaskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTasks(): Promise<({
        user: {
            id: number;
            email: string;
            name: string | null;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        status: string;
        userId: number | null;
        dueDate: Date | null;
        createdAt: Date;
    })[]>;
}
