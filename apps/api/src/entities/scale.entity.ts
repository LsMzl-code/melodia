import { Note } from "./note.entity";


export class Scale {
  id: number;
  nameScale: string;
  notes: Note[];
  intervalId: number;
  tonalityId: number;
  modeId: number;
  scaleFamilyId: number;
  degree: string;
}