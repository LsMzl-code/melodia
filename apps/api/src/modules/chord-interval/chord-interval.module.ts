import { Module } from '@nestjs/common';
import { ChordIntervalService } from './chord-interval.service';
import { ChordIntervalController } from './chord-interval.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChordIntervalService, PrismaService],
  controllers: [ChordIntervalController]
})
export class ChordIntervalModule {}
