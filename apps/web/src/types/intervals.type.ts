import { Chord } from "./chords.type";
import { Scale } from "./scales.type";

export type ChordInterval = {
  id: number;
  name: string;
  details: string;
  chords: Chord[];
}

export type ScaleInterval = {
  id: number;
  name: string;
  details: string;
  scales: Scale[];
}