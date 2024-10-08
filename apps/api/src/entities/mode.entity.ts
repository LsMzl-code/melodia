import { Chord } from "./chord.entity";
import { Scale } from "./scale.entity";


export class Mode {
  id: number;
  name: string;
  scales: Scale[];
  chords: Chord[];
}