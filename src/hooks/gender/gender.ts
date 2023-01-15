import { useCallback, useEffect, useState } from "react";
import { getGenders } from "../../apis/gender";
import { Gender } from "../../types";

const useGender = () => {
  const [data, setData] = useState<Array<Gender>>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const genders = await getGenders();
      setData(genders);
      console.log(genders);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

export default useGender;
