import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateModeDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}