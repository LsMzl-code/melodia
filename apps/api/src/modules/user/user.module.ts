import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { MailerService } from '../mailer/mailer.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, MailerService]
})
export class UserModule { }
