import { Stud } from "../../types";

export const getStuds = async () => {
  const response = await fetch("http://localhost:3001/api/stud");
  return response.json();
};

export const createStud = async (stud: Stud) => {
  await fetch("http://localhost:3001/api/stud", {
    method: "POST",
    body: JSON.stringify(stud),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editStud = async (stud: Stud) => {
  await fetch(`http://localhost:3001/api/stud/${stud.id}`, {
    method: "PUT",
    body: JSON.stringify(stud),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteStud = async (id: string) => {
  await fetch(`http://localhost:3001/api/stud/${id}`, {
    method: "DELETE",
  });
};
