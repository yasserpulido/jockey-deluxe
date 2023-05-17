import { Competitor } from "./competitor";

export type Race = {
  id: string;
  name: string;
  distance: number;
  time: string;
  surface: string;
  condition: string;
  competitors: Array<Competitor>;
};
