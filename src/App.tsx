import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HorsesPage } from "./pages/horses";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HorsesPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
