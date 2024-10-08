import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteController } from './note.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [NoteController],
  providers: [NoteService, PrismaService]
})
export class NoteModule {}
