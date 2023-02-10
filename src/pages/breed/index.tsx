import BreedPage from "./breed-page";
import { BreedProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Breed = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BreedProvider.Provider>
        <BreedPage />
      </BreedProvider.Provider>
    </QueryClientProvider>
  );
};

export default Breed;
