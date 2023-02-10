import Page from "./horse-page";
import { CommonProvider } from "../../providers";
import { HorseProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Horse = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HorseProvider.Provider>
        <CommonProvider.Provider>
          <Page />
        </CommonProvider.Provider>
      </HorseProvider.Provider>
    </QueryClientProvider>
  );
};

export default Horse;
