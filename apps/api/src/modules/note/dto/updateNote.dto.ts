import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateNoteDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  readonly type: string;

  @IsNotEmpty()
  @IsOptional()
  readonly soundUrl: string;
}