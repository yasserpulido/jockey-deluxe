import { Breed } from "../../types";

export const getBreeds = async () => {
  const response = await fetch("http://localhost:3001/api/breed");
  return response.json();
};

export const createBreed = async (breed: Breed) => {
  await fetch("http://localhost:3001/api/breed", {
    method: "POST",
    body: JSON.stringify(breed),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editBreed = async (breed: Breed) => {
  await fetch(`http://localhost:3001/api/breed/${breed.id}`, {
    method: "PUT",
    body: JSON.stringify(breed),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteBreed = async (id: string) => {
  await fetch(`http://localhost:3001/api/breed/${id}`, {
    method: "DELETE",
  });
};
