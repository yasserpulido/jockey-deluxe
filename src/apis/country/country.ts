export const getCountries = async () => {
  const response = await fetch("http://localhost:3001/countries");
  return response.json();
};
