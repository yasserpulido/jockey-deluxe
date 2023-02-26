import { Entry } from "../../types";

export const getEntries = async () => {
  const response = await fetch("http://localhost:3001/api/entry");
  return response.json();
};

export const createEntry = async (entry: Entry) => {
  const response = await fetch("http://localhost:3001/api/entry", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  const result = await response.json();
  return result;
};

export const editEntry = async (entry: Entry) => {
  await fetch(`http://localhost:3001/api/entry/${entry.id}`, {
    method: "PUT",
    body: JSON.stringify(entry),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteEntry = async (id: string) => {
  await fetch(`http://localhost:3001/api/entry/${id}`, {
    method: "DELETE",
  });
};
