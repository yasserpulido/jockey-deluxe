import { Competitor } from "./competitor";

export type Race = {
  id: string;
  name: string;
  time: string;
  distance: number;
  surface: string;
  condition: string;
  competitors: Array<Competitor>;
};
