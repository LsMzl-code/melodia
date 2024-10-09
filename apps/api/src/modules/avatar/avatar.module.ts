import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService, PrismaService]
})
export class AvatarModule {}
