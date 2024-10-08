import { IsNotEmpty } from "class-validator";

export class CreateScaleIntervalDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly details: string;
}