import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { LoggingService } from '@/logging/logging.service';
import { LoggingModule } from '@/logging/logging.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [LoggingModule],
})
export class TaskModule {}
