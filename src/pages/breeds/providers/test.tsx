import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breed } from "../../../types";
import { breed as api } from "../../../apis";

const breedDefaultValues = {
  id: "",
  name: "",
};

export type BreedContextType = {
  isLoading: boolean;
  breed?: Breed;
  breeds?: Array<Breed>;
  save: (breed: Breed) => void;
  delete: (id: string) => void;
  breedSelected: (breed: Breed) => void;
  reset: () => void;
};

export const BreedContext = React.createContext<BreedContextType>({
  isLoading: false,
  breeds: [],
  save() {},
  delete() {},
  breedSelected() {},
  reset: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [breed, setBreed] = useState<Breed>();
  const [breeds, setBreeds] = useState<Array<Breed>>([]);
  const { data, status, isLoading } = useQuery({
    queryKey: ["Breed"],
    queryFn: api.getBreeds,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createBreed,
    onSuccess: () => {
      queryClient.invalidateQueries(["Breed"]);
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editBreed,
    onSuccess: () => {
      queryClient.invalidateQueries(["Breed"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteBreed,
    onSuccess: () => {
      queryClient.invalidateQueries(["Breed"]);
    },
  });

  useEffect(() => {
    if (status === "success" && data !== undefined) {
      setBreeds(data);
    }
  }, [status, data]);

  const saveHandler = (breed: Breed) => {
    if (!breed.id) {
      createMutation.mutate(breed);
    } else {
      editMutation.mutate(breed);
    }
    setBreed(breedDefaultValues);
  };

  const deleteHandler = (id: string) => {
    setBreeds(breeds.filter((b: Breed) => b.id !== id));
  };

  const breedHandler = (breed: Breed) => {
    setBreed(breed);
  };

  const resetHandler = () => {
    setBreed(breedDefaultValues);
  };

  return (
    <BreedContext.Provider
      value={{
        isLoading,
        breed,
        breeds,
        save: saveHandler,
        delete: deleteHandler,
        breedSelected: breedHandler,
        reset: resetHandler,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};
