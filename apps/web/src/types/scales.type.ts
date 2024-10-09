import { Note } from "./notes";

export type Scale = {
  id: number;
  nameScale: string;
  notes: Note[];
  intervalId: number;
  tonalityId: number;
  modeId: number;
  scaleFamilyId: number;
  degree: string;
}