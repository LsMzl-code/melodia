import { IsNotEmpty, MinLength } from "class-validator";

export class ResetUserPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}