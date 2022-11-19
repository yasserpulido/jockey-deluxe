export const get = async () => {
  try {
    const response = await fetch("/mocks/breeds.json");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { breeds } = await response.json();
    return breeds;
  } catch (error) {
    console.log(error);
  }
};
