import { Module } from '@nestjs/common';
import { ScaleFamilyController } from './scale-family.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScaleFamilyService } from './scale-family.service';

@Module({
  controllers: [ScaleFamilyController],
  providers: [ScaleFamilyService, PrismaService]
})
export class ScaleFamilyModule {}
