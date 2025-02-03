import { DataSource } from 'typeorm';
import { join } from 'path';
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: 'postgres', // or your preferred database type
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
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
