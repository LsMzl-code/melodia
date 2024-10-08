import { IsNotEmpty } from "class-validator";

export class CreateChordNameDto {
  @IsNotEmpty()
  readonly name: string;
}