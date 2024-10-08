import { IsNotEmpty, IsOptional } from "class-validator";
export class UpdateChordDto {
  @IsNotEmpty()
  @IsOptional()
  readonly nameChord: string;

  @IsNotEmpty()
  @IsOptional()
  readonly tonalityId: number;
  
  @IsNotEmpty()
  @IsOptional()
  readonly modeId: number;
}