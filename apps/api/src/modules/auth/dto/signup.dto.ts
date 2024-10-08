
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Role } from "src/types/role.type";

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;

  @IsNotEmpty()
  @Length(3, 20)
  readonly username: string;

  @IsNotEmpty()
  readonly role: Role;
}