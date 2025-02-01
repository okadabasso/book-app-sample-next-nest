import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { BooksModule} from './admin/books/books.module';
import { GenresModule } from './admin/genres/genres.module';
import { AuthModule } from './auth/auth.module';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { TransactionMiddleware } from '@/shared/middlewares/transaction.middleware';
import { LoggingService } from './shared/services/logging.service';
import { LoggingMiddleware } from './shared/middlewares/logging.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    BooksModule,
    GenresModule,
    AuthModule,
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TransactionManagerProvider,
    LoggingService,
  ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(TransactionMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.POST },
      );
      consumer.apply(LoggingMiddleware)
      .forRoutes("*");
      
    }
}