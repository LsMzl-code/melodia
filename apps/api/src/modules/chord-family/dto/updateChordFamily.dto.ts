import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateChordFamilyDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}