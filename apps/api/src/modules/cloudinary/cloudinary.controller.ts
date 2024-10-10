import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('avatars')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService
  ) { }

  //*** AJOUT D'UNE IMAGE ***//
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('imgUrl')) // => Nom du champ dans le formulaire
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    try {
      // Upload de l'image sur cloudinary
      const result = await this.cloudinaryService.uploadImage(file);
      if (!result) throw new Error("Erreur lors de l'upload de l'image")

      // Récupération de l'url, publicId et id de l'utilisateur connecté
      const secureUrl = result.secure_url;
      const publicId = result.public_id;
      const userId = request.user['userId']

      // Ajout de l'image à la table avatar avec userservice
      await this.userService.createAvatar(secureUrl, publicId, userId);

      return { message: "Image uploadée avec succès" };
    } catch (error) {
      console.log("Erreur lors de l'upload de l'image", error);
    }
  }

  //*** RECUPERATION D'UNE IMAGE ***//
  // @Get('/:publicId')
  // async getImage(@Param('publicId') publicId: string) {
  //   return await this.cloudinaryService.getImage(publicId);
  // }
}
