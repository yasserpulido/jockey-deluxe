import { useEffect, useState } from "react";
import { Country } from "../../types";

const useCountry = () => {
  const [data, setData] = useState<Array<Country>>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/mocks/countries.json");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { countries } = await response.json();
      setData(countries);
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

export default useCountry;
