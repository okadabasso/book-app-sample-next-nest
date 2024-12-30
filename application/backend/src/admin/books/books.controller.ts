import { AppDataSource } from '@/data-source';
import { Book } from '@/entities/Book';
import { Controller, Get } from '@nestjs/common';
import { generate } from 'rxjs';

@Controller('admin/books')
export class BooksController {
    @Get("find-all")
    async findAll(): Promise<Book[]> {
        const repos = AppDataSource.getRepository(Book);
        return await repos.find({});
        // const books = [
        //     {
        //         id: 1,
        //         title: "Book 1",
        //         author: "Author 1",
        //         publishedYear: 2021,
        //         description: "Description 1",
        //         genre: "Genre 1"
        //     }
        // ];
        // return books;
    }
}
