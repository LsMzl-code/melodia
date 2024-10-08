import { IsNotEmpty, IsOptional } from "class-validator";


export class UpdateScaleNameDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}