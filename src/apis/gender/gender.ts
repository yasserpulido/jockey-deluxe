export const getGenders = async () => {
  const response = await fetch("http://localhost:3001/genders");
  return response.json();
};