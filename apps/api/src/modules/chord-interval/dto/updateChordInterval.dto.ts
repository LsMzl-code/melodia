import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateChordIntervalDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  readonly details: string;
}