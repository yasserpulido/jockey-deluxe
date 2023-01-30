import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Country, Gender } from "../../types";
import { country, gender } from "../../apis";

type Common<T> = {
  data: Array<T>;
  isLoading: boolean;
};

export type CommonContextType = {
  gender: Common<Gender>;
  country: Common<Country>;
};

export const Context = React.createContext<CommonContextType>({
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
  const [countries, setCountries] = useState<Array<Gender>>([]);
  const {
    data: genderData,
    status: genderStatus,
    isLoading: genderIsLoading,
  } = useQuery({
    queryKey: ["Gender"],
    queryFn: gender.getGenders,
    retry: false,
  });
  const {
    data: countryData,
    status: countryStatus,
    isLoading: countryIsLoading,
  } = useQuery({
    queryKey: ["Country"],
    queryFn: country.getCountries,
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
