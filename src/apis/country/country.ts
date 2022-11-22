export const getAll = async () => {
  try {
    const response = await fetch("/mocks/countries.json");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { countries } = await response.json();
    return countries;
  } catch (error) {
    console.log(error);
  }
};
