import { Jockey } from "../../types";

export const getJockeys = async () => {
  try {
    const response = await fetch("http://localhost:3001/jockeys");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
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
    const response = await fetch(
      `http://localhost:3000/jockey/${jockey.id}/edit`,
      {
        method: "POST",
        body: JSON.stringify(jockey),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteJockey = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/jockey/${id}/delete`, {
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
