import { IsArray, IsNotEmpty } from "class-validator";

export class CreateScaleDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly mode: number;

  @IsNotEmpty()
  readonly tonality: number;

  @IsNotEmpty()
  readonly interval: number;

  @IsNotEmpty()
  readonly scaleFamily: number;

  @IsNotEmpty()
  @IsArray()
  readonly notes: string[];

}