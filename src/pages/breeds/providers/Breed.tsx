import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BreedType } from "../types";
import { getBreeds } from "../../../apis/breed";

const breedDefaultValues = {
  id: "",
  name: "",
};

export type BreedContextType = {
  isLoading: boolean;
  breed?: BreedType;
  breeds?: Array<BreedType>;
  save: (breed: BreedType) => void;
  remove: (id: string) => void;
  breedSelected: (breed: BreedType) => void;
};

export const BreedContext = React.createContext<BreedContextType>({
  isLoading: false,
  breeds: [],
  save() {},
  remove() {},
  breedSelected() {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const [breed, setBreed] = useState<BreedType>();
  const [breeds, setBreeds] = useState<Array<BreedType>>([]);
  const { data, status, isLoading } = useQuery(["breeds"], getBreeds);

  useEffect(() => {
    if (status === "success") {
      setBreeds(data);
    }
  }, [status, data]);

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
      const updatedBreeds = breeds.map((b: BreedType) => {
        if (b.id === breed.id) {
          return { ...breed };
        }
        return b;
      });
      setBreeds(updatedBreeds);
      setBreed(breedDefaultValues);
    }
  };

  const removeHandler = (id: string) => {
    setBreeds(breeds.filter((b: BreedType) => b.id !== id));
  };

  const breedHandler = (breed: BreedType) => {
    setBreed(breed);
  };

  return (
    <BreedContext.Provider
      value={{
        isLoading,
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
