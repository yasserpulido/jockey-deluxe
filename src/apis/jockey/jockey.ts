import { Jockey } from "../../types";

export const getJockeys = async () => {
  const response = await fetch("http://localhost:3001/jockeys");
  return response.json();
};

export const createJockey = async (jockey: Jockey) => {
  await fetch("http://localhost:3001/jockeys", {
    method: "POST",
    body: JSON.stringify(jockey),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editJockey = async (jockey: Jockey) => {
  await fetch(`http://localhost:3001/jockeys/${jockey.id}`, {
    method: "PUT",
    body: JSON.stringify(jockey),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteJockey = async (id: string) => {
  await fetch(`http://localhost:3001/jockeys/${id}`, {
    method: "DELETE",
  });
};
