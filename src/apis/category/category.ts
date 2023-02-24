import { Category } from "../../types";

export const getCategories = async () => {
  const response = await fetch("http://localhost:3001/api/category");
  return response.json();
};

export const createCategory = async (category: Category) => {
  await fetch("http://localhost:3001/api/category", {
    method: "POST",
    body: JSON.stringify(category),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editCategory = async (category: Category) => {
  await fetch(`http://localhost:3001/api/category/${category.id}`, {
    method: "PUT",
    body: JSON.stringify(category),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteCategory = async (id: string) => {
  await fetch(`http://localhost:3001/api/category/${id}`, {
    method: "DELETE",
  });
};
