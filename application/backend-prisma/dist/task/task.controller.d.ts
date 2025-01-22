import { TaskService } from './task.service';
import { LoggingService } from '@/logging/logging.service';
export declare class TaskController {
    private readonly taskService;
    private readonly logger;
    constructor(taskService: TaskService, logger: LoggingService);
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
