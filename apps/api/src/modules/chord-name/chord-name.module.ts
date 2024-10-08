import { Module } from '@nestjs/common';
import { ChordNameController } from './chord-name.controller';
import { ChordNameService } from './chord-name.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChordNameController],
  providers: [ChordNameService, PrismaService]
})
export class ChordNameModule { }
