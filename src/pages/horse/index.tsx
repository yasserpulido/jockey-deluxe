import Page from "./horse-page";
import { HorseProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Common } from "../../providers";

const Horse = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HorseProvider.Provider>
        <Common.Provider>
          <Page />
        </Common.Provider>
      </HorseProvider.Provider>
    </QueryClientProvider>
  );
};

export default Horse;
