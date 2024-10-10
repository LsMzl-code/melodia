import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  readonly currentAvatar: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly imgUrl: string;

  @IsOptional()
  @IsString()
  readonly instrument: string;
}
