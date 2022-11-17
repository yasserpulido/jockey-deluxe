import React from "react";
import { HorseType } from "../types";

export type HorseContextType = {
  save: (horse: HorseType) => void;
};

export const HorseContext = React.createContext<any>({
  save(horse: HorseType) {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const save = (horse: HorseType) => {
    console.log(horse);
  };
  return (
    <HorseContext.Provider value={{ save }}>{children}</HorseContext.Provider>
  );
};
