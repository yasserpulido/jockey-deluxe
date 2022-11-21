import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Detail from "./components/detail";
import List from "./components/list";
import { Provider } from "./providers";

const Jockeys = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Detail />
        <List />
      </Provider>
    </QueryClientProvider>
  );
};

export default Jockeys;
