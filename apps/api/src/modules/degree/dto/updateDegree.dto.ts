import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateDegreeDto {
  @IsNotEmpty()
  @IsOptional()
  readonly content: string;
}