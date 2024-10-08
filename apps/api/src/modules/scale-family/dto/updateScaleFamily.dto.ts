import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateScaleFamilyDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}