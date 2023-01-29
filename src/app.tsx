import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageSwitcher } from "./i18n";
import { Human } from "./pages";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Human />,
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
