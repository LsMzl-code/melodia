import { IsNotEmpty, IsString } from "class-validator";

export class CreateAvatarDto {
  @IsNotEmpty()
  @IsString()
  readonly imgUrl: string;
}