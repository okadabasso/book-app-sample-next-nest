import { DataSource } from 'typeorm';
import { Book } from './entities/Book';

export const AppDataSource = new DataSource({
    type: 'postgres', // or your preferred database type
    host: 'pg',
    port: 5432,
    username: 'testuser',
    password: 'password',
    database: 'testdb',
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
    entities: [
       Book
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
