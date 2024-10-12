import { Resend } from 'resend';


export class MailerService {

  private readonly mailer: Resend;
  constructor() {
    this.mailer = new Resend(process.env.RESEND_API_KEY);
  }

  //*** EMAIL DE CONFIRMATION D'INSCRIPTION***//
  /**
   * Envoi d'un email de confirmation contenant un token lors de l'inscription d'un utilisateur
   * @param to Destinataire de l'email
  //  * @param html Contenu de l'email
   * @param username Nom de l'utilisateur
   * @param token Token de confirmation de l'email
   * @returns 
   */
  async sendInscriptionConfirmationEmail(to: string, username: string, token?: string) {
    //TODO: Créer un template d'email 
    //TODO: Mettre à jour le lien dans l'email
    const { error } = await this.mailer.emails.send({
      from: 'Mélodia <onboarding@resend.dev>',
      to: to,
      subject: 'Confirmation d\'inscription',
      html: `<h1>Bonjour ${username}, ton inscription est bien prise en compte</h1>
      <br/>
      <p>Clique <a href="${process.env.FRONTEND_URL}/auth/confirmation-email?token=${token}">ici</a> pour confirmer ton email.</p>
      `,
    });

    if (error) {
      return console.error({ error });
    }
  }


  //*** EMAIL DE RÉINITIALISATION DU MOT DE PASSE ***//
  /**
   * Envoi d'un email de réinitialisation du mot de passe
   * @param email Destinataire de l'email
   * @param username Nom de l'utilisateur
   * @param resetPasswordToken Token de réinitialisation du mot de passe
   * @returns 
   */
  async sendResetPasswordEmail(to: string, username: string, resetPasswordToken: any) {
    //TODO: Créer un template d'email 
    //TODO: Mettre à jour le lien dans l'email
    const { error } = await this.mailer.emails.send({
      from: 'Mélodia <onboarding@resend.dev>',
      to: to,
      subject: 'Réinitialisation du mot de passe',
      html: `<h1>Bonjour ${username}, </h1>
      <p>Votre demande de réinitialisation de mot de passe a bien été prise en compte.</p>
      <p>Merci de cliquer <a href="${process.env.FRONTEND_URL}/auth/nouveau-mot-de-passe?token=${resetPasswordToken}">ici</a> pour réinitialiser votre mot de passe.</p>
      `,
    });

    if (error) {
      return console.error({ error });
    }
  }

  //*** EMAIL LORS DE L'INSCRIPTION D'UN NOUVEL UTILISATEUR ***//
  /**
   * Envoi d'un email à moi lors de l'inscription d'un nouvel utilisateur.
   * -
   * @returns 
   */
  async sendNewSubscriberEmail() {
    const { error } = await this.mailer.emails.send({
      from: 'Mélodia <onboarding@resend.dev>',
      to: 'louismzl.dev@gmail.com',
      subject: 'Inscription sur Mélodia',
      html: `<h1>Nouvel inscrit,</h1>
      <p>Une personne vient de s'inscrire sur Mélodia.</p>
      `,
    });

    if (error) {
      return console.error({ error });
    }
  }
}

