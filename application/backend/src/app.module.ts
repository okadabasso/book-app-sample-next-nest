import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { BooksModule} from './admin/books/books.module';
import { GenresModule } from './admin/genres/genres.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    BooksModule,
    GenresModule
  ],
})
export class AppModule {}
