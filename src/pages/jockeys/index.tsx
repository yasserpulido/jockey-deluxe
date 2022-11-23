import { default as Page } from "./jockey";
import { Provider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Jockeys() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Page />
      </Provider>
    </QueryClientProvider>
  );
}

export default Jockeys;
