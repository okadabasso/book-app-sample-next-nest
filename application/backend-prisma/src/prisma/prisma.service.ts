import { LoggingService } from '@/logging/logging.service';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'info'| 'warn' | 'query' | 'error'> implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly logger: LoggingService,
  ) {
    
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
    this.$on("query", (e: Prisma.QueryEvent) => {
      this.logger.log(`Query: ${e.query} ${e.params}`);
    });

    this.$on('info', (e: Prisma.LogEvent) => {
      this.logger.log(e.message);
    });

    this.$on('warn', (e: Prisma.LogEvent) => {
      this.logger.warn(e.message);
    });

    this.$on('error', (e: Prisma.LogEvent) => {
      this.logger.error(e.message, e.target);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
