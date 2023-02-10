import { Horse } from "../../types";

export const getHorses = async () => {
  const response = await fetch("http://localhost:3001/horses");
  return response.json();
};

export const createHorse = async (horse: Horse) => {
  await fetch("http://localhost:3001/horses", {
    method: "POST",
    body: JSON.stringify(horse),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editHorse = async (horse: Horse) => {
  await fetch(`http://localhost:3001/horses/${horse.id}`, {
    method: "PUT",
    body: JSON.stringify(horse),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteHorse = async (id: string) => {
  await fetch(`http://localhost:3001/horses/${id}`, {
    method: "DELETE",
  });
};
