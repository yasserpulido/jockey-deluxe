import EntryPage from "./entry-page";
import { CommonProvider } from "../../providers";
import { EntryProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Entry = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EntryProvider.Provider>
        <CommonProvider.Provider>
          <EntryPage />
        </CommonProvider.Provider>
      </EntryProvider.Provider>
    </QueryClientProvider>
  );
};

export default Entry;
