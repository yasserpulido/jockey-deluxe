import { useEffect, useState } from "react";
import { GenderType } from "../types";

const useGender = () => {
  const [data, setData] = useState<Array<GenderType>>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/mocks/genders.json");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { genders } = await response.json();
      setData(genders);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading };
};

export default useGender;
