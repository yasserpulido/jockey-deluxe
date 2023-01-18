export const getCountries = async () => {
  const response = await fetch("http://localhost:3002/countries");
  return response.json();
};
