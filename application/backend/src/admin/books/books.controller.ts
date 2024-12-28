import { Book } from '@/entities/Book';
import { Controller, Get } from '@nestjs/common';

@Controller('admin/books')
export class BooksController {
    @Get("find-all")
    findAll(): Book[]{
      const books = [
        {
          id: 1,
          title: 'Book 1',  
          author : 'Author 1',
          publishedDate : new Date(),
          isbn : '1234567890'

        },
        {
          id: 2,
          title: 'Book 2',  
          author : 'Author 2',
          publishedDate : new Date(),
          isbn : '1234567890'

        },
        {
          id: 3,
          title: 'Book 3',  
          author : 'Author 3',
          publishedDate : new Date(),
          isbn : '1234567890'

        },
        {
          id: 4,
          title: 'Book 4',  
          author : 'Author 4',
          publishedDate : new Date(),
          isbn : '1234567890'

        },
        {
          id: 5,
          title: 'Book 5',  
          author : 'Author 5',
          publishedDate : new Date(),
          isbn : '1234567890'

        },
      ]
      return books;
    }
}
