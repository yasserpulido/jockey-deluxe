import React, { useState } from "react";
import { breeds as breedsMock } from "../../../mocks/breeds";
import { BreedType } from "../types";

export type BreedContextType = {
  breed: BreedType;
  breeds: Array<BreedType>;
  save: (breed: BreedType) => void;
  remove: (id: string) => void;
  breedSelected: (breed: BreedType) => void;
};

export const BreedContext = React.createContext<BreedContextType>({
  breed: { id: "", name: "" },
  breeds: [],
  save() {},
  remove() {},
  breedSelected() {},
});

type Props = {
  children: import("react").ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const [breed, setBreed] = useState<BreedType>({ id: "", name: "" });
  const [breeds, setBreeds] = useState(breedsMock);

  const saveHandler = (breed: BreedType) => {
    if (!breed.id) {
      setBreeds((prevState) => {
        return [
          ...prevState,
          (breed = {
            ...breed,
            id: Math.floor(Math.random() * 100).toString(),
          }),
        ];
      });
    } else {
      const updatedBreeds = breeds.map((b) => {
        if (b.id === breed.id) {
          return { ...breed };
        }
        return b;
      });
      setBreeds(updatedBreeds);
      setBreed({ id: "", name: "" });
    }
  };

  const removeHandler = (id: string) => {
    setBreeds(breeds.filter((b) => b.id !== id));
  };

  const breedHandler = (breed: BreedType) => {
    setBreed(breed);
  };

  return (
    <BreedContext.Provider
      value={{
        breed,
        breeds,
        save: saveHandler,
        remove: removeHandler,
        breedSelected: breedHandler,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};