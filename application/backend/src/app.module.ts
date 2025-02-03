import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '@/data-source';
import { BooksModule} from '@/admin/books/books.module';
import { AuthModule } from '@/auth/auth.module';
import { TransactionManagerProvider } from '@/shared/providers/transaction-manager.provider';
import { TransactionMiddleware } from '@/shared/middlewares/transaction.middleware';
import { LoggingMiddleware } from '@/shared/middlewares/logging.middleware';
import { LoggingModule } from '@/shared/logging/logging.module';
import { ProfileModule } from '@/user/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    BooksModule,
    AuthModule,
    LoggingModule,
    ProfileModule
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TransactionManagerProvider,
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