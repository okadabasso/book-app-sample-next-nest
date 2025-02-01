import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { LoggingService } from '@/logging/logging.service';


@Module({
  controllers: [GenresController],
  providers: [
    LoggingService,
  ],
})
export class GenresModule {}
