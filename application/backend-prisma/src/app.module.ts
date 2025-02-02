import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { LoggingService } from './logging/logging.service';
import { LoggingModule } from './logging/logging.module';
import { BooksModule } from './admin/books/books.module';
import { GenresModule } from './admin/genres/genres.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, TaskModule, LoggingModule, BooksModule, GenresModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, LoggingService],
})
export class AppModule {}
