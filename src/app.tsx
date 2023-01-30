import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageSwitcher } from "./i18n";
import { Track } from "./pages";
// import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Track />,
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
