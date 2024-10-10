import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';


@Module({
  providers: [CloudinaryService, CloudinaryProvider, UserService, PrismaService, MailerService],
  exports: [CloudinaryService, CloudinaryProvider],
  controllers: [CloudinaryController]
})
export class CloudinaryModule { }
