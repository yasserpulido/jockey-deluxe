import React from "react";
import { breeds } from "../../../mocks/breeds";
import { BreedType } from "../types/Breed";

export const BreedContext = React.createContext<Array<BreedType>>([]);

type Props = {
  children: import("react").ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <BreedContext.Provider value={breeds}>{children}</BreedContext.Provider>
  );
};

export default Provider;
