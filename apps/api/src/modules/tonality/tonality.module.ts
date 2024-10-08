import { Module } from '@nestjs/common';
import { TonalityService } from './tonality.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TonalityController } from './tonality.controller';

@Module({
  controllers: [TonalityController],
  providers: [TonalityService, PrismaService]
})
export class TonalityModule {}
