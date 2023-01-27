import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breed } from "../../../types";
import { breed as api } from "../../../apis";

const breedDefaultValues = {
  id: "",
  name: "",
};

export type BreedContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  breed?: Breed;
  breeds?: Array<Breed>;
  save: (breed: Breed) => void;
  delete: (id: string) => void;
  breedSelected: (breed: Breed) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const BreedContext = React.createContext<BreedContextType>({
  status: "idle",
  isLoading: false,
  breeds: [],
  save() {},
  delete() {},
  breedSelected() {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [breed, setBreed] = useState<Breed>();
  const [breeds, setBreeds] = useState<Array<Breed>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Breed"],
    queryFn: api.getBreeds,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createBreed,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Breed"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editBreed,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Breed"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteBreed,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Breed"]);
    },
    onError: () => {
      setQueryStatus("error");
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
    console.log(id);
    deleteMutation.mutate(id);
    setBreed(breedDefaultValues);
  };

  const breedHandler = (breed: Breed) => {
    setBreed(breed);
  };

  const resetHandler = () => {
    setBreed(breedDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <BreedContext.Provider
      value={{
        status: queryStatus,
        isLoading,
        breed,
        breeds,
        save: saveHandler,
        delete: deleteHandler,
        breedSelected: breedHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};
