import { Module } from '@nestjs/common';
import { ScaleNameController } from './scale-name.controller';
import { ScaleNameService } from './scale-name.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScaleNameController],
  providers: [ScaleNameService, PrismaService]
})
export class ScaleNameModule {}
