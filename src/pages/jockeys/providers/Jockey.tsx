import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jockey as jockeyApi } from "../../../apis";
import { JockeyType } from "../types";

const jockeyDefaultValues: JockeyType = {
  id: "",
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  nationality: "",
};

export type JockeyContextType = {
  isLoading: boolean;
  jockey?: JockeyType;
  jockeys?: Array<JockeyType>;
  save: (jockey: JockeyType) => void;
  remove: (id: string) => void;
  jockeySelected: (jockey: JockeyType) => void;
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
  const [jockey, setJockey] = useState<JockeyType>();
  const [jockeys, setJockeys] = useState<Array<JockeyType>>([]);
  const { data, status, isLoading } = useQuery(
    ["jockeys"],
    jockeyApi.getJockeys
  );

  useEffect(() => {
    if (status === "success") {
      setJockeys(data);
    }
  }, [status, data]);

  const saveHandler = (jockey: JockeyType) => {
    if (!jockey.id) {
      setJockeys((prevState) => {
        return [
          ...prevState,
          (jockey = {
            ...jockey,
            id: Math.floor(Math.random() * 100).toString(),
          }),
        ];
      });
    } else {
      const updatedJockeys = jockeys.map((b: JockeyType) => {
        if (b.id === jockey.id) {
          return { ...jockey };
        }
        return b;
      });
      setJockeys(updatedJockeys);
      setJockey(jockeyDefaultValues);
    }
  };

  const removeHandler = (id: string) => {
    setJockeys(jockeys.filter((b: JockeyType) => b.id !== id));
  };

  const jockeyHandler = (jockey: JockeyType) => {
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
