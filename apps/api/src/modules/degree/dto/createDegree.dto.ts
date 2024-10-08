import { IsNotEmpty } from "class-validator";

export class CreateDegreeDto {
  @IsNotEmpty()
  readonly content: string;
}