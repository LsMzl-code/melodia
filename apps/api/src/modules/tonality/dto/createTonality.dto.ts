import { IsNotEmpty } from "class-validator";

export class CreateTonalityDto {
  @IsNotEmpty()
  readonly name: string;
}