import { default as Page } from "./human";
import { Provider as JockeyProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommonProvider } from "../../providers";

const Human = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JockeyProvider>
        <CommonProvider.Provider>
          <Page />
        </CommonProvider.Provider>
      </JockeyProvider>
    </QueryClientProvider>
  );
};

export default Human;
