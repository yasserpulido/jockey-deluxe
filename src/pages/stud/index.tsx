import StudPage from "./stud-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StudProvider } from "./providers";

const Stud = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StudProvider.Provider>
        <StudPage />
      </StudProvider.Provider>
    </QueryClientProvider>
  );
};

export default Stud;
