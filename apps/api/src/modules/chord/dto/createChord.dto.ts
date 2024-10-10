import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChordDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly mode: string;

  @IsNotEmpty()
  @IsString()
  readonly tonality: string;

  @IsNotEmpty()
  @IsString()
  readonly interval: string;

  @IsNotEmpty()
  @IsString()
  readonly family: string;

  @IsNotEmpty()
  @IsString()
  readonly notes: string;

  @IsOptional()
  @IsString()
  readonly diagram: string;

}