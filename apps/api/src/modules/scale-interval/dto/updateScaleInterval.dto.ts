import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateScaleIntervalDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  readonly details: string;
}