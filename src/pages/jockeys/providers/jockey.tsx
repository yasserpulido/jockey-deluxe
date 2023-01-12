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
};

export type JockeyContextType = {
  isLoading: boolean;
  jockey?: Jockey;
  jockeys?: Array<Jockey>;
  save: (jockey: Jockey) => void;
  delete: (id: string) => void;
  jockeySelected: (jockey: Jockey) => void;
  reset: () => void;
};

export const JockeyContext = React.createContext<JockeyContextType>({
  isLoading: false,
  jockeys: [],
  save: () => {},
  delete: () => {},
  jockeySelected: () => {},
  reset: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [jockey, setJockey] = useState<Jockey>();
  const [jockeys, setJockeys] = useState<Array<Jockey>>([]);
  const { data, status, isLoading } = useQuery({
    queryKey: ["Jockey"],
    queryFn: api.getJockeys,
  });
  const createMutation = useMutation({
    mutationFn: api.createJockey,
    onSuccess: () => {
      queryClient.invalidateQueries(["Jockey"]);
    },
  });
  const editMutation = useMutation({
    mutationFn: api.editJockey,
    onSuccess: () => {
      queryClient.invalidateQueries(["Jockey"]);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: api.deleteJockey,
    onSuccess: () => {
      queryClient.invalidateQueries(["Jockey"]);
    },
  });

  useEffect(() => {
    if (status === "success") {
      setJockeys(data!);
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

  return (
    <JockeyContext.Provider
      value={{
        isLoading,
        jockey,
        jockeys,
        save: saveHandler,
        delete: deleteHandler,
        jockeySelected: jockeyHandler,
        reset: resetHandler,
      }}
    >
      {children}
    </JockeyContext.Provider>
  );
};
