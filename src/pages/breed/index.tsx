import { default as Page } from "./breed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as BreedProvider } from "./providers";

const Breed = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BreedProvider>
        <Page />
      </BreedProvider>
    </QueryClientProvider>
  );
};

export default Breed;
