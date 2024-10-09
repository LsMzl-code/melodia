import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** CREATE AVATAR ***//
  async createAvatar(createAvatarDto: CreateAvatarDto, userId: string) {
    const { imgUrl } = createAvatarDto;

    //TODO: retrouver l'utilisateur ajoutant l'image
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      include: {
        avatar: {
          select: {
            id: true
          }
        }
      }
    })

    // Ajout de l'avatar en base de données
    await this.prismaService.avatar.create({
      data: {
        imgUrl,
        name: `${currentUser.username}-avatar-${currentUser.avatar.length + 1}`,
        userId: currentUser.id
      },
    });

    // Définission de l'image en avatar par défaut de l'utilisateur
    await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: {
        currentAvatar: imgUrl
      }
    })

    return { message: 'Image ajoutée avec succès' }
  }
}
