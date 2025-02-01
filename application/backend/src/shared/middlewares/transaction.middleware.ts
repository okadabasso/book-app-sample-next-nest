import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
    constructor(
        private readonly dataSource: DataSource,
        private readonly transactionManagerProvider: TransactionManagerProvider,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            this.transactionManagerProvider.manager = queryRunner.manager;

            res.on('finish', async () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    await queryRunner.commitTransaction();
                } else {
                    await queryRunner.rollbackTransaction();
                }
                await queryRunner.release();
            });

            next();
        } else {
            next();
        }
    }
}