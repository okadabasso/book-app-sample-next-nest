import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { LoggingService } from '@/logging/logging.service';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly logger: LoggingService
    ) { }

    @Get()
    async getTasks() {
        this.logger.debug('Debug Message');
        this.logger.log('Info Message');
        this.logger.warn('Warn Message');
        this.logger.error('Error Message', 'error in AppService');
        
        return this.taskService.getTasks();
    }

}
