import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jockey as jockeyApi } from "../../../apis";
import { transform } from "../../../utils";
import { Jockey } from "../../../types";

// const jockeyDefaultValues: Jockey = {
//   id: "",
//   firstname: "",
//   lastname: "",
//   birth: "",
//   gender: "",
//   nationality: "",
// };

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

export const Provider: React.FC<Props> = ({ children }) => {
  const [jockey, setJockey] = useState<Jockey>();
  const [jockeys, setJockeys] = useState<Array<Jockey>>([]);
  const { data, status, isLoading } = useQuery(
    ["jockeys"],
    jockeyApi.getJockeys
  );

  useEffect(() => {
    if (status === "success") {
      setJockeys(data as Array<Jockey>);
    }
  }, [status, data]);

  const saveHandler = (jockey: Jockey) => {
    jockeyApi.createJockey(jockey);
  };

  const removeHandler = (id: string) => {
    setJockeys(jockeys.filter((b: Jockey) => b.id !== id));
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
