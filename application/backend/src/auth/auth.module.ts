import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoggingModule } from '@/shared/logging/logging.module';

@Module({
  controllers: [AuthController],
  imports: [
    LoggingModule
  ],
})
export class AuthModule {}
