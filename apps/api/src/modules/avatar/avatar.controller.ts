import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AvatarService } from './avatar.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Avatars')
@Controller('avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) { }


  //*** CREATE AVATAR ***//
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createNote(
    @Body() createAvatarDto: CreateAvatarDto,
    @Req() request: Request
  ) {
    return this.avatarService.createAvatar(createAvatarDto, request.user['userId']);
  }


}
