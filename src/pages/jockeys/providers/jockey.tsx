import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jockey as api } from "../../../apis";
import { Jockey } from "../../../types";

const jockeyDefaultValues: Jockey = {
  id: "",
  firstname: "",
  lastname: "",
  birth: "",
  gender: "1",
  nationality: "1",
};

export type JockeyContextType = {
  isLoading: boolean;
  jockey?: Jockey;
  jockeys?: Array<Jockey>;
  save: (jockey: Jockey) => void;
  remove: (id: string) => void;
  jockeySelected: (jockey: Jockey) => void;
};

export const JockeyContext = React.createContext<JockeyContextType>({
  isLoading: false,
  jockeys: [],
  save() {},
  remove() {},
  jockeySelected() {},
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
      console.log(data);
      setJockeys(data!);
    }
  }, [status, data]);

  const saveHandler = (jockey: Jockey) => {
    // if (!jockey.id) {
    //   createMutation.mutate(jockey);
    // } else {
    //   editMutation.mutate(jockey);
    // }
    setJockey(jockeyDefaultValues);
  };

  const removeHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const jockeyHandler = (jockey: Jockey) => {
    setJockey(jockey);
  };

  return (
    <JockeyContext.Provider
      value={{
        isLoading,
        jockey,
        jockeys,
        save: saveHandler,
        remove: removeHandler,
        jockeySelected: jockeyHandler,
      }}
    >
      {children}
    </JockeyContext.Provider>
  );
};
