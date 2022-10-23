import React from "react";
import { store, StoreType } from "../models";

export const JockeyContext = React.createContext<StoreType | null>(null);

type Props = {
  children: import("react").ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  return (
    <JockeyContext.Provider value={store}>{children}</JockeyContext.Provider>
  );
};
