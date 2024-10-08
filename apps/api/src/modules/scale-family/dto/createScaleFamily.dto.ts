import { IsNotEmpty } from "class-validator";

export class CreateScaleFamilyDto {
  @IsNotEmpty()
  readonly name: string;
}