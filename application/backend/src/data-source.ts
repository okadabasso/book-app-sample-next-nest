import { DataSource } from 'typeorm';
import { join } from 'path';


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
        join(__dirname, 'entities/**/*.{ts,js}'),

    ], // Add your entities here
    migrations: [
        join(__dirname, 'data/migrations/**/*.{ts,js}'),
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
