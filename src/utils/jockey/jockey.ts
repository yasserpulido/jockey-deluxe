import { format } from "date-fns";
import { Jockey } from "../../types";

export const transform = (data: Array<Jockey>) => {
  return data.map((jockey) => {
    return {
      ...jockey,
      birth: format(new Date(jockey.birth), "dd/MM/yyyy"),
    };
  });
};
