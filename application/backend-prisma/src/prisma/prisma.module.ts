import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LoggingService } from '@/logging/logging.service';
import { LoggingModule } from '@/logging/logging.module';

@Global()
@Module({
  providers: [PrismaService, LoggingService],
  exports: [PrismaService],
})
export class PrismaModule {}
