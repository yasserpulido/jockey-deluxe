import { Race } from "./race";

export type Entry = {
  id: string;
  name: string;
  date: string;
  country: string;
  track: string;
  races: Array<Race>;
};
