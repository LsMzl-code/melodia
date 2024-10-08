import { IsNotEmpty, IsOptional } from "class-validator";


export class UpdateChordNameDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}