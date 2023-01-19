import { default as Page } from "./breeds";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as BreedProvider } from "./providers";

const Breeds = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BreedProvider>
        <Page />
      </BreedProvider>
    </QueryClientProvider>
  );
};

export default Breeds;
