import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { default as Page } from "./stud";
import { StudProvider } from "./providers";

const Stud = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StudProvider.Provider>
        <Page />
      </StudProvider.Provider>
    </QueryClientProvider>
  );
};

export default Stud;
