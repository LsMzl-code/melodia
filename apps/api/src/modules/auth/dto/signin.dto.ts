import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;
}