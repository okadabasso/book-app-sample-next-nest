import { Book } from '@/entities/Book';
import { DataSource, EntityManager, FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';

interface BookFindOption{
    limit?: number;
    offset?: number;
    order?: FindOptionsOrder<Book>;
}
export class BookFindService {
    private manager: EntityManager;
    private bookRepository: Repository<Book>;
    private readonly bookRelations = [
        'bookAuthors',
        'bookAuthors.author',
        'bookGenres',
        'bookGenres.genre',
    ];

    constructor(dataSource: DataSource, manager?: EntityManager) {
        this.manager = manager || dataSource!.manager;

        this.bookRepository = this.manager.getRepository(Book);
    }

    async findBookById(id: number): Promise<Book | null> {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: this.bookRelations,
        });

        return book ?? null;
    }

    async findAllBooks(option?: BookFindOption): Promise<Book[]> {
        const options: FindManyOptions<Book> = {
            relations: this.bookRelations,
            order: { id: 'ASC' },
        };
    
        if(option){
            Object.assign(options, {
                take: option.limit || undefined,
                skip: option.offset || undefined,
                order: option.order || undefined,
            });
        }
    
        const books = this.bookRepository.find(options);
        return books;
    }

}