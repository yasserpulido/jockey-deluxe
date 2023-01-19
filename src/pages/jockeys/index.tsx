import { default as Page } from "./jockeys";
import { Provider as JockeyProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Common as CommonProvider } from "../../providers";

const Jockeys = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JockeyProvider>
        <CommonProvider>
          <Page />
        </CommonProvider>
      </JockeyProvider>
    </QueryClientProvider>
  );
};

export default Jockeys;
