import { Jockey } from "../../types";
import { transform } from "../../utils";

export const getJockeys = async () => {
  try {
    const response = await fetch("http://localhost:3000/jockeys");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    
    return transform(data);
  } catch (error) {
    console.log(error);
  }
};

export const createJockey = async (jockey: Jockey) => {
  try {
    const response = await fetch("http://localhost:3000/jockey/create", {
      method: "POST",
      body: JSON.stringify(jockey),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};
