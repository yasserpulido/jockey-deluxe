import TrackPage from "./track-page";
import { CommonProvider } from "../../providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrackProvider } from "./providers";

const Track = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TrackProvider.Provider>
        <CommonProvider.Provider>
          <TrackPage />
        </CommonProvider.Provider>
      </TrackProvider.Provider>
    </QueryClientProvider>
  );
};

export default Track;
