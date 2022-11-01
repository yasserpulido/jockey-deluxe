import React from "react";
import { store, StoreType } from "../models";

export const StudContext = React.createContext<StoreType | null>(null);

type Props = {
  children: import("react").ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  return <StudContext.Provider value={store}>{children}</StudContext.Provider>;
};
