import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '@/shared/services/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    constructor(private readonly loggingService: LoggingService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - start;
            this.loggingService.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
        });

        next();
    }
}