import { IsNotEmpty } from "class-validator";

export class CreateChordIntervalDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly details: string;
}