import React from "react";
import { store, StoreType } from "../models";

export const Context = React.createContext<StoreType | null>(null);

type Props = {
  children: import("react").ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
