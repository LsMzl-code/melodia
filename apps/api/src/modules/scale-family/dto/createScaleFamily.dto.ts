import { IsNotEmpty, IsString } from "class-validator";

export class CreateScaleFamilyDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}