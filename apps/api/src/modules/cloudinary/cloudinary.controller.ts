import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';

@Controller('avatars')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService
  ) { }

  //*** AJOUT D'UNE IMAGE ***//
  @Post('upload')
  @UseInterceptors(FileInterceptor('imgUrl')) // => Nom du champ dans le formulaire
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      // TODO récupérer l'url de l'image et l'ajouter dans la table avatar avec userservice puis définir cette image en currentAvatar
      const secureUrl = result.secure_url;
      const url = result.url;
      
      return { result: { secureUrl: result.secure_url, url: result.url }, message: "Image uploadée avec succès" };
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
