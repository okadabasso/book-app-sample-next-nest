import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '@/shared/logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const handlerName = context.getHandler().name;

    this.logger.log(`Entering ${handlerName}`);

    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Exiting ${handlerName} after ${Date.now() - now}ms`)),
      );
  }
}