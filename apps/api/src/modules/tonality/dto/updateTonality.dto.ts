import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateTonalityDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}