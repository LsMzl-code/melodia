import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '../mailer/mailer.service';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService
  ) { }

  //*** GET ALL USERS ***//
  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        currentAvatar: true
      }
    })

    return users;
  }

  //*** GET UNIQUE USER ***//
  async getUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        currentAvatar: true,
        instrument: true,
        role: true,
        avatar: {
          select: {
            name: true,
            imgUrl: true,
            createdAt: true
          }
        }
      }
    })

    return user;
  }

  //*** UPDATE USER ***//
  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const { instrument, email, username } = updateUserDto

    // Verification de l'existence de l'uttilisateur
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: userId }
    })
    if (!existingUser) throw new NotFoundException("Utilisateur non trouvé")

    // Si l'email est différent, envoi d'un email de confirmation
    if (email !== existingUser.email) {

      // Génération d'un token de confirmation d'inscription
      const emailConfirmationToken = this.generateUniqueToken();

      // Mise à jour de l'utilisateur
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          email,
          username,
          instrument,
          isEmailConfirmed: false
        },
      });

      // Ajout du token de verification d'email en base de données
      await this.prismaService.emailVerificationToken.create({
        data: {
          email: email,
          token: emailConfirmationToken,
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 heure
        }
      })

      // Envoi d'un email de confirmation du mail
      await this.mailerService.sendInscriptionConfirmationEmail(email, username, emailConfirmationToken)

      return { message: `Un email de confirmation a été envoyé sur ${email}` };
    }

    // Mise à jour de l'utilisateur
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        instrument,
        username
      }
    })

    return { message: "Votre profil a été mis à jour" };
  }

  //*** CREATE AVATAR ***//
  async createAvatar(secureUrl: string, publicId: string, userId: string) {
    // Récupération de l'utilisateur
    const currentUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        avatar: {
          select: {
            id: true
          }
        }
      }
    })

    if (!currentUser) throw new NotFoundException("Utilisateur non trouvé")

    // Création d'un nouvel avatar dans la table avatar
    const newAvatar = await this.prismaService.avatar.create({
      data: {
        imgUrl: secureUrl,
        publicId: publicId,
        userId: userId,
        name: `${currentUser.username}-avatar-${currentUser.avatar.length + 1}`
      }
    })

    // Mise à jour du currentAvatar de l'utilisateur
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        currentAvatar: newAvatar.imgUrl
      }
    })





  }

  //*** UPDATE AVATAR ***//
  async updateUserAvatar(updateUserDto: UpdateUserDto) {
    const { imgUrl } = updateUserDto
    // Vérification de l'existence de l'avatar
    const avatar = await this.prismaService.avatar.findUnique({
      where: {
        imgUrl: imgUrl
      },
      select: {
        userId: true,
        imgUrl: true
      }
    })
    if (!avatar) throw new NotFoundException("Avatar non trouvé")

    // Vérification de l'existence de l'utilisateur
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: avatar.userId
      }
    })
    if (!existingUser) throw new NotFoundException("Utilisateur non trouvé")

    // Mise à jour du currentAvatar de l'utilisateur
    await this.prismaService.user.update({
      where: { id: avatar.userId },
      data: {
        currentAvatar: avatar.imgUrl
      }
    })

    return { message: "Avatar mis à jour" }
  }





  /**
   * Génération d'un token unique de réinitialisation du mot de passe.
   * -
   * - Utilisation de la librairie "@paralleldrive/cuid2"
   * @returns 
   */
  private generateUniqueToken(): string {
    return createId();
  }
}
