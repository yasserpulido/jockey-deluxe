import HumanPage from "./human-page";
import { CommonProvider } from "../../providers";
import { Provider as JockeyProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Human = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JockeyProvider>
        <CommonProvider.Provider>
          <HumanPage />
        </CommonProvider.Provider>
      </JockeyProvider>
    </QueryClientProvider>
  );
};

export default Human;
