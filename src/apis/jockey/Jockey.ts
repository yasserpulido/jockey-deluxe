export const getJockeys = async () => {
  try {
    const response = await fetch("/mocks/jockeys.json");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { jockeys } = await response.json();
    return jockeys;
  } catch (error) {
    console.log(error);
  }
};
