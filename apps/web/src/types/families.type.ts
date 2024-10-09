import { Chord } from "./chords.type";
import { Scale } from "./scales.type";

export type ChordFamily = {
  id: number;
  name: string;
  chords: Chord[] | null;
}

export type ScaleFamily = {
  id: number;
  name: string;
  scales: Scale[] | null;
}