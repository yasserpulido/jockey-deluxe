import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageSwitcher } from "./i18n";
import { Breeds, Jockeys } from "./pages";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Jockeys />,
  },
]);

const App = () => {
  return (
    <>
      <LanguageSwitcher />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
