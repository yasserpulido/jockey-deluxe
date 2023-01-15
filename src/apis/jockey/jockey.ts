import { Jockey } from "../../types";

export const getJockeys = async () => {
  const response = await fetch("http://localhost:3001/jockeys");
  return response.json();
};

export const createJockey = async (jockey: Jockey) => {
  try {
    const response = await fetch("http://localhost:3001/jockeys", {
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

export const editJockey = async (jockey: Jockey) => {
  try {
    const response = await fetch(`http://localhost:3001/jockeys/${jockey.id}`, {
      method: "PUT",
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

export const deleteJockey = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/jockeys/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};
