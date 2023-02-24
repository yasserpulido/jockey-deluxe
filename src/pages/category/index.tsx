import CategoryPage from "./category-page";
import { CategoryProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Category = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CategoryProvider.Provider>
        <CategoryPage />
      </CategoryProvider.Provider>
    </QueryClientProvider>
  );
};

export default Category;
