import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { default as Page } from "./track";
import { TrackProvider } from "./providers";
import { Common } from "../../providers";

const Track = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TrackProvider.Provider>
        <Common.Provider>
          <Page />
        </Common.Provider>
      </TrackProvider.Provider>
    </QueryClientProvider>
  );
};

export default Track;
