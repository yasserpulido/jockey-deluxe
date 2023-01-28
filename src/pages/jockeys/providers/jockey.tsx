import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jockey as api } from "../../../apis";
import { Jockey } from "../../../types";

const jockeyDefaultValues: Jockey = {
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

export type JockeyContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  jockey: Jockey | undefined;
  jockeys: Array<Jockey>;
  save: (jockey: Jockey) => void;
  delete: (id: string) => void;
  jockeySelected: (jockey: Jockey) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const JockeyContext = React.createContext<JockeyContextType>({
  status: "idle",
  isLoading: false,
  jockey: undefined,
  jockeys: [],
  save: () => {},
  delete: () => {},
  jockeySelected: () => {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [jockey, setJockey] = useState<Jockey | undefined>(undefined);
  const [jockeys, setJockeys] = useState<Array<Jockey>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Jockey"],
    queryFn: api.getJockeys,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createJockey,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editJockey,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Jockey"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteJockey,
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
      setJockeys(data);
    }
  }, [status, data]);

  const saveHandler = (jockey: Jockey) => {
    if (!jockey.id) {
      createMutation.mutate(jockey);
    } else {
      editMutation.mutate(jockey);
    }
    setJockey(jockeyDefaultValues);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
    setJockey(jockeyDefaultValues);
  };

  const jockeyHandler = (jockey: Jockey) => {
    setJockey(jockey);
  };

  const resetHandler = () => {
    setJockey(jockeyDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <JockeyContext.Provider
      value={{
        status: queryStatus,
        isLoading,
        jockey,
        jockeys,
        save: saveHandler,
        delete: deleteHandler,
        jockeySelected: jockeyHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </JockeyContext.Provider>
  );
};
