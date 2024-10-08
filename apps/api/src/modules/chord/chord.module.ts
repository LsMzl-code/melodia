import { Module } from '@nestjs/common';
import { ChordService } from './chord.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChordController } from './chord.controller';

@Module({
  controllers: [ChordController],
  providers: [ChordService, PrismaService],

})
export class ChordModule {}
