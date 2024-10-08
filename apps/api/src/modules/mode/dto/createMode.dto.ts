import { IsNotEmpty } from "class-validator";

export class CreateModeDto {
  @IsNotEmpty()
  readonly name: string;
}