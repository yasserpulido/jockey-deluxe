export const getGenders = async () => {
  const response = await fetch("http://localhost:3002/genders");
  return response.json();
};