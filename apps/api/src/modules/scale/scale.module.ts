import { Module } from '@nestjs/common';
import { ScaleController } from './scale.controller';
import { ScaleService } from './scale.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScaleController],
  providers: [ScaleService, PrismaService]
})
export class ScaleModule {}
