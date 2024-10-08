import { Chord } from "./chord.entity";
import { Scale } from "./scale.entity";


export class Tonality {
  id: number;
  name: string;
  scales: Scale[];
  chords: Chord[];
}