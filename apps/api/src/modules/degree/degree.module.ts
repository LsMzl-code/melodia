import { Module } from '@nestjs/common';
import { DegreeService } from './degree.service';
import { DegreeController } from './degree.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DegreeService, PrismaService],
  controllers: [DegreeController]
})
export class DegreeModule { }
