import { Direction } from "./geography";

export interface Guess {
  name: string;
  distance: number;
  direction: Direction;
}
