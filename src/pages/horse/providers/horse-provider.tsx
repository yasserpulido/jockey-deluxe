import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Horse as api } from "../../../apis";
import { Horse as HorseType } from "../../../types";

export const horseDefaultValues: HorseType = {
  id: "",
  name: "",
  birth: "",
  gender: "",
  fatherId: "",
  motherId: "",
};

export type ContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  horse: HorseType | undefined;
  horses: Array<HorseType>;
  save: (horse: HorseType) => void;
  delete: (id: string) => void;
  horseSelected: (horse: HorseType) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const Context = React.createContext<ContextType>({
  status: "idle",
  isLoading: false,
  horse: undefined,
  horses: [],
  save: () => {},
  delete: () => {},
  horseSelected: () => {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [horse, setHorse] = useState<HorseType | undefined>(undefined);
  const [horses, setHorses] = useState<Array<HorseType>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Horse"],
    queryFn: api.getHorses,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createHorse,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editHorse,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteHorse,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  useEffect(() => {
    if (status === "success" && data !== undefined) {
      setHorses(data);
    }
  }, [status, data]);

  const saveHandler = (horse: HorseType) => {
    if (!horse.id) {
      createMutation.mutate(horse);
    } else {
      editMutation.mutate(horse);
    }
    setHorse(horseDefaultValues);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
    setHorse(horseDefaultValues);
  };

  const horseHandler = (horse: HorseType) => {
    setHorse(horse);
  };

  const resetHandler = () => {
    setHorse(horseDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <Context.Provider
      value={{
        status: queryStatus,
        isLoading,
        horse,
        horses,
        save: saveHandler,
        delete: deleteHandler,
        horseSelected: horseHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};
