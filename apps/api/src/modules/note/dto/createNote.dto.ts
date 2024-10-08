import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly soundUrl: string;
}