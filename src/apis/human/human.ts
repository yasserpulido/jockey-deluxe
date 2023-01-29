import { Human } from "../../types";

export const getHumans = async () => {
  const response = await fetch("http://localhost:3001/humans");
  return response.json();
};

export const createHuman = async (human: Human) => {
  await fetch("http://localhost:3001/humans", {
    method: "POST",
    body: JSON.stringify(human),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editHuman = async (human: Human) => {
  await fetch(`http://localhost:3001/humans/${human.id}`, {
    method: "PUT",
    body: JSON.stringify(human),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteHuman = async (id: string) => {
  await fetch(`http://localhost:3001/humans/${id}`, {
    method: "DELETE",
  });
};
