export const getAll = async () => {
  try {
    const response = await fetch("/mocks/genders.json");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { genders } = await response.json();
    return genders;
  } catch (error) {
    console.log(error);
  }
};
