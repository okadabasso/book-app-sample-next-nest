import { DataSource } from 'typeorm';
import { Book } from './entities/Book';
import { BookAuthor } from './entities/BookAuthor';
import { Author } from './entities/Author';
import { BookGenre } from './entities/BookGenre';
import { Genre } from './entities/Genre';
import { AuthUser } from './entities/AuthUser';
import { AuthUserRole } from './entities/AuthUserRole';
import { AuthRole } from './entities/AuthRole';
export const AppDataSource = new DataSource({
    type: 'postgres', // or your preferred database type
    host: 'pg',
    port: 5432,
    username: 'testuser',
    password: 'password',
    database: 'testdb',
    synchronize: false,
    logging: true,
    logger: 'advanced-console',
    entities: [
       Book,
       BookAuthor,
       Author,
       BookGenre,
       Genre,
       AuthUser,
       AuthUserRole,
        AuthRole,
       __dirname + '/entities/*.ts',

    ], // Add your entities here
    migrations: [
        __dirname + '/data/migration/*.ts',
    ],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
