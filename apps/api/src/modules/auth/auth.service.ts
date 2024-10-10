import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';

//*** Librairies ***//
import { createId } from '@paralleldrive/cuid2';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }


  //*** INSCRIPTION ***//
  async signup(signupDto: SignupDto) {
    const { email, password, username, avatar } = signupDto;

    // Vérification de l'unicité de l'adresse email
    const existingMail = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingMail) throw new ConflictException('Cette adresse email est déjà utilisée');

    // Vérification de l'unicité du nom d'utilisateur
    const existingUsername = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (existingUsername) throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé');

    // Hashage du mot de passe
    const hashedPassword = await this.hashPassword(password);

    // Génération d'un token de confirmation d'inscription
    const emailConfirmationToken = this.generateUniqueToken();

    // Création du nouvel utilisateur
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        username,
        currentAvatar: avatar,
        password: hashedPassword,
      },
    });

    // Ajout de l'avatar par défaut de DiceBear dans la table avatar
    await this.prismaService.avatar.create({
      data: {
        imgUrl: avatar,
        name: `${username}-avatar-1`,
        user: {
          connect: {
            id: newUser.id
          }
        }
      }
    })

    // Ajout du token de verification d'email en base de données
    await this.prismaService.emailVerificationToken.create({
      data: {
        email: newUser.email,
        token: emailConfirmationToken,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 heure
      }
    })

    // Envoi d'un email de confirmation d'inscription
    await this.mailerService.sendInscriptionConfirmationEmail(email, username, emailConfirmationToken)

    //
    if(!newUser.isEmailConfirmed) {
      return {message: "Merci de confirmer votre adresse email."}
    }

    // Création du jeton JWT et authentification de l'utilisateur
    return this.authenticateUser(newUser.id, newUser.role);
  }


  //*** CONFIRMATION DE L'ADRESSE EMAIL ***//
  /**
   * 
   * @param token 
   * @returns 
   */
  async confirmUserEmail(token: string) {
    // Vérification de l'existence du token
    const existingToken = await this.prismaService.emailVerificationToken.findUnique({
      where: { token },
    });
    if (!existingToken) throw new NotFoundException('Token non valable');


    // Vérification de l'existence de l'utilisateur
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) throw new NotFoundException('Utilisateur non trouvé');

    // Vérification que l'utilisateur n'a pas déjà confirmé son email
    if (existingUser.isEmailConfirmed) throw new ConflictException('Cette adresse email a déjà été confirmée');

    //Todo: Vérifier que le token n'a pas expiré


    // Mise à jour de la valeur de la colonne isEmailConfirmed à true
    await this.prismaService.user.update({
      where: { id: existingUser.id },
      data: {
        isEmailConfirmed: true,
      }
    })

    // Suppression du token de confirmation d'inscription
    await this.prismaService.emailVerificationToken.delete({
      where: { token, email: existingUser.email },
    });

    return { message: 'L\'adresse email a été confirmée' }
  }


  //*** CONNEXION ***//
  async login(signinDto: SigninDto) {
    const { email, password } = signinDto;

    // Vérification de l'existence de l'utilisateur
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!existingUser) throw new NotFoundException('Adresse mail ou mot de passe incorrect');

    // Vérification de la concordance des mots de passe
    const passwordMatch = await this.comparePasswords(password, existingUser.password);
    if (!passwordMatch) throw new UnauthorizedException('Adresse mail ou mot de passe incorrect')

    // Création du jeton JWT et authentification de l'utilisateur
    const token = this.authenticateUser(existingUser.id, existingUser.role)

    return token;
  }


  //*** MOT DE PASSE OUBLIE ***//
  /**
   * Demande de réinitialisation du mot de passe
   * -
   * - Vérification de l'existence de l'utilisateur par son adresse email
   * - Vérification qu'une demande de réinitialisation du mot de passe n'est pas déjà en cours
   * - Génération d'un token de réinitialisation du mot de passe
   * - Ajout du token de réinitialisation du mot de passe dans la base de données
   * - Envoi d'un email de réinitialisation du mot de passe
   * @param signinDto 
   * @returns 
   */
  async resetPasswordRequest(email: string) {

    // Vérification de l'existence de l'utilisateur
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!existingUser) throw new NotFoundException('Adresse email non reconnue');

    // Vérification qu'une demande de réinitialisation du mot de passe n'est pas déjà en cours
    if (existingUser.isResettingPassword) throw new ConflictException('Une demande de réinitialisation du mot de passe est déjà en cours');

    // Génération d'un token de réinitialisation du mot de passe
    const resetPasswordToken = this.generateUniqueToken();

    // Mise à jour de l'état de l'utilisateur
    await this.prismaService.user.update({
      where: { id: existingUser.id },
      data: {
        isResettingPassword: true,
      }
    })

    // Ajout du token de réinitialisation du mot de passe en base de données
    await this.prismaService.passwordResetToken.create({
      data: {
        email: existingUser.email,
        token: resetPasswordToken,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 heure
      }
    })

    // Envoi d'un email de réinitialisation du mot de passe
    await this.mailerService.sendResetPasswordEmail(existingUser.email, existingUser.username, resetPasswordToken)

    return { message: 'Un email de réinitialisation du mot de passe a été envoyé à votre adresse email' }
  }



  //*** VERIFICATION DU TOKEN DE RÉINITIALISATION DU MOT DE PASSE ***//
  /**
   * Vérification du token de réinitialisation du mot de passe
   * -
   * - Vérification de l'existence de l'utilisateur avec le token de réinitialisation du mot de passe
   * - Vérification qu'une demande de réinitialisation du mot de passe est en cours pour cet utilisateur
   * @param token 
   * @returns 
   */
  async verifyResetPasswordToken(token: string) {

    // Vérification de l'existence du token de réinitialisation du mot de passe
    const existingToken = await this.prismaService.passwordResetToken.findUnique({
      where: { token },
    });
    if (!existingToken) throw new NotFoundException('Token non reconnu');

    // Vérification de l'existence de l'utilisateur
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) throw new NotFoundException('Utilisateur non trouvé');

    // Vérification qu'une demande de réinitialisation du mot de passe est bien en cours pour cet utilisateur
    if (!existingUser.isResettingPassword) throw new NotFoundException('Aucune demande de réinitialisation du mot de passe n\'est en cours');

    //Todo: Vérifier que le token n'a pas expiré

    return { message: 'Le token de réinitialisation du mot de passe est valide' }
  }


  //*** RÉINITIALISATION DU MOT DE PASSE ***//
  /**
   * Vérification du token de réinitialisation du mot de passe
   * -
   * - Vérification de l'existence de l'utilisateur avec le token de réinitialisation du mot de passe
   * - Vérification qu'une demande de réinitialisation du mot de passe est en cours pour cet utilisateur
   * @param token 
   * @returns 
   */
  async resetUserPassword(resetUserPasswordDto: ResetUserPasswordDto) {

    const { token, password } = resetUserPasswordDto;

    // Vérification de l'existence de l'utilisateur
    const existingToken = await this.prismaService.passwordResetToken.findUnique({
      where: { token },
    });
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: existingToken.email },
    });
    if (!existingUser) throw new NotFoundException('Utilisateur non trouvé');

    // Vérification qu'une demande de réinitialisation du mot de passe est bien en cours pour cet utilisateur
    if (!existingUser.isResettingPassword) throw new NotFoundException('Aucune demande de réinitialisation du mot de passe n\'est en cours');

    // Vérification que le nouveau mot de passe est différent de l'ancien mot de passe
    const isPasswordsSame = await bcrypt.compare(password, existingUser.password)
    if (isPasswordsSame) throw new ConflictException('Votre nouveau mot de passe doit être différent de l\'ancien mot de passe');

    // Hashage du mot de passe
    const hashedPassword = await this.hashPassword(password);

    // Mise à jour du mot de passe de l'utilisateur
    await this.prismaService.user.update({
      where: { id: existingUser.id },
      data: {
        isResettingPassword: false,
        password: hashedPassword,
      }
    })

    // Suppression du token de réinitialisation du mot de passe
    await this.prismaService.passwordResetToken.delete({
      where: { token, email: existingUser.email },
    });

    return { message: 'Le mot de passe a bien été modifié' }
  }







  //*** UTILS ***//
  /**
     * Hashage des mots de passe avec bcrypt.
     * @param password 
     * @returns 
     */
  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)

    return hashedPassword;
  }

  /**
   * Comparaison d'un mot de passe hashé avec un mot de passe saisi.
   * @param plainPassword 
   * @param hashedPassword 
   * @returns 
   */
  private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatch;
  }

  /**
   * Création d'un jeton JWT et authentification d'un utilisateur.
   * @param userId 
   * @returns 
   */
  private authenticateUser(userId: string, role: string) {
    const payload = { userId, role };
    return {
      access_token: this.jwtService.sign(payload),
      userId,
      role

    };
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
