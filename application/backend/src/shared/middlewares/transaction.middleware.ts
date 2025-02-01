import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { LoggingService } from '@/shared/services/logging.service';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
    constructor(
        private readonly dataSource: DataSource,
        private readonly transactionManagerProvider: TransactionManagerProvider,
        private readonly logger: LoggingService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            this.logger.log('start transaction');
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            this.transactionManagerProvider.manager = queryRunner.manager;

            res.on('finish', async () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    await queryRunner.commitTransaction();
                    this.logger.log('commit transaction');
                } else {
                    await queryRunner.rollbackTransaction();
                    this.logger.log('rollback transaction');
                }
                await queryRunner.release();
            });

            next();
        } else {
            next();
        }
    }
}