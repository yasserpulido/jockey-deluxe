import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Country, Gender } from "../../types";
import { Country as apiCountry, Gender as apiGender } from "../../apis";

type Common<T> = {
  data: Array<T>;
  isLoading: boolean;
};

export type ContextType = {
  gender: Common<Gender>;
  country: Common<Country>;
};

export const Context = React.createContext<ContextType>({
  gender: {
    data: [],
    isLoading: false,
  },
  country: {
    data: [],
    isLoading: false,
  },
});

type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  const [genders, setGenders] = useState<Array<Gender>>([]);
  const [countries, setCountries] = useState<Array<Country>>([]);
  const {
    data: genderData,
    status: genderStatus,
    isLoading: genderIsLoading,
  } = useQuery({
    queryKey: ["Gender"],
    queryFn: apiGender.getGenders,
    retry: false,
  });
  const {
    data: countryData,
    status: countryStatus,
    isLoading: countryIsLoading,
  } = useQuery({
    queryKey: ["Country"],
    queryFn: apiCountry.getCountries,
    retry: false,
  });

  useEffect(() => {
    if (genderStatus === "success" && genderData !== null) {
      setGenders(genderData.genders);
    }
  }, [genderStatus, genderData]);

  useEffect(() => {
    if (countryStatus === "success" && countryData !== null) {
      setCountries(countryData.countries);
    }
  }, [countryStatus, countryData]);

  return (
    <Context.Provider
      value={{
        gender: {
          data: genders,
          isLoading: genderIsLoading,
        },
        country: {
          data: countries,
          isLoading: countryIsLoading,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};
