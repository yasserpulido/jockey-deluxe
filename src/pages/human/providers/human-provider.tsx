import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Human as api } from "../../../apis";
import { Human } from "../../../types";

export const humanDefaultValues: Human = {
  id: "",
  firstname: "",
  lastname: "",
  birth: "",
  gender: "",
  nationality: "",
  job: {
    jockey: false,
    trainer: false,
  },
};

export type HumanContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  human: Human | undefined;
  humans: Array<Human>;
  save: (human: Human) => void;
  delete: (id: string) => void;
  humanSelected: (human: Human) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const HumanContext = React.createContext<HumanContextType>({
  status: "idle",
  isLoading: false,
  human: undefined,
  humans: [],
  save: () => {},
  delete: () => {},
  humanSelected: () => {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [human, setHuman] = useState<Human | undefined>(undefined);
  const [humans, setHumans] = useState<Array<Human>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Human"],
    queryFn: api.getHumans,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createHuman,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editHuman,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteHuman,
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
      setHumans(data);
    }
  }, [status, data]);

  const saveHandler = (human: Human) => {
    if (!human.id) {
      createMutation.mutate(human);
    } else {
      editMutation.mutate(human);
    }
    setHuman(humanDefaultValues);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
    setHuman(humanDefaultValues);
  };

  const humanHandler = (human: Human) => {
    setHuman(human);
  };

  const resetHandler = () => {
    setHuman(humanDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <HumanContext.Provider
      value={{
        status: queryStatus,
        isLoading,
        human,
        humans,
        save: saveHandler,
        delete: deleteHandler,
        humanSelected: humanHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </HumanContext.Provider>
  );
};
