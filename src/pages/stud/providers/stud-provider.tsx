import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stud } from "../../../types";
import { Stud as api } from "../../../apis";

const studDefaultValues = {
  id: "",
  name: "",
};

export type ContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  stud: Stud;
  studs: Array<Stud>;
  save: (stud: Stud) => void;
  delete: (id: string) => void;
  studSelected: (stud: Stud) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const Context = React.createContext<ContextType>({
  status: "idle",
  isLoading: false,
  stud: studDefaultValues,
  studs: [],
  save: () => {},
  delete: () => {},
  studSelected: () => {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [stud, setBreed] = useState<Stud>(studDefaultValues);
  const [studs, setBreeds] = useState<Array<Stud>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Stud"],
    queryFn: api.getStuds,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createStud,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Stud"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editStud,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Stud"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteStud,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Stud"]);
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

  const saveHandler = (stud: Stud) => {
    if (!stud.id) {
      createMutation.mutate(stud);
    } else {
      editMutation.mutate(stud);
    }
    setBreed(studDefaultValues);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
    setBreed(studDefaultValues);
  };

  const studHandler = (stud: Stud) => {
    setBreed(stud);
  };

  const resetHandler = () => {
    setBreed(studDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <Context.Provider
      value={{
        status: queryStatus,
        isLoading,
        stud,
        studs,
        save: saveHandler,
        delete: deleteHandler,
        studSelected: studHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};
