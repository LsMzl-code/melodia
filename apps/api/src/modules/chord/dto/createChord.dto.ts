import { IsArray, IsNotEmpty } from "class-validator";

export class CreateChordDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly mode: number;

  @IsNotEmpty()
  readonly tonality: number;

  @IsNotEmpty()
  readonly interval: number;

  @IsNotEmpty()
  readonly chordFamily: number;

  @IsNotEmpty()
  @IsArray()
  readonly notes: string[];

}