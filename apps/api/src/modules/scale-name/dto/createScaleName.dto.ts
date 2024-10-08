import { IsNotEmpty } from "class-validator";

export class CreateScaleNameDto {
  @IsNotEmpty()
  readonly name: string;
}