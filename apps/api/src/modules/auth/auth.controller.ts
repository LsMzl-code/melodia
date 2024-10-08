import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  //*** INSCRIPTION ***//
  @Post('inscription')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  //*** CONFIRMATION DE L'ADRESSE EMAIL ***//
  @Get('confirmation-email')
  async confirmUserEmail(@Query('token') token: string) {
    return this.authService.confirmUserEmail(token);
  }

  //*** CONNEXION ***//
  @Post('connexion')
  async login(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto);
  }

  //*** AUTHENTIFICATION ***//
  /**
   * Récupération des informations de l'utilisateur authentifié
   * -
   * @param request 
   * @returns 
   */
  @UseGuards(JwtAuthGuard) //=> Verrouillage de la route si non authentifié
  @Get()
  async getAuthenticateUser(
    @Req() request: Request
  ) {
    return await this.userService.getUser(request.user['userId'])
  }

  //*** DEMANDE DE RÉINITIALISATION DU MOT DE PASSE ***//
  @Post('mot-de-passe-oublie')
  async resetPasswordRequest(@Body('email') email: string) {
    return this.authService.resetPasswordRequest(email);
  }

  //*** VÉRIFICATION DU TOKEN DE RÉINITIALISATION DU MOT DE PASSE ***//
  @Get('verification-reset-password-token')
  async verifyResetPasswordToken(@Query('token') token: string) {
    return this.authService.verifyResetPasswordToken(token);
  }

  //*** RÉINITIALISATION DU MOT DE PASSE ***//
  @Post('nouveau-mot-de-passe')
  async resetUserPassword(@Body() resetUserPasswordDto: ResetUserPasswordDto) {
    return this.authService.resetUserPassword(resetUserPasswordDto);
  }
}
