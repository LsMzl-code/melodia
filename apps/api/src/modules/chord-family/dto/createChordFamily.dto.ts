import { IsNotEmpty } from "class-validator";

export class CreateChordFamilyDto {
  @IsNotEmpty()
  readonly name: string;
}