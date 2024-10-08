import { Module } from '@nestjs/common';
import { ModeController } from './mode.controller';
import { ModeService } from './mode.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ModeController],
  providers: [ModeService, PrismaService]
})
export class ModeModule {}
