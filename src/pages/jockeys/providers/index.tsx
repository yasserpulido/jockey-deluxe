import React from "react";
import { Provider as JockeyProvider } from "./Jockey";

type Props = {
  children: import("react").ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  return <JockeyProvider>{children}</JockeyProvider>;
};
