import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Races } from "./pages/races";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Races />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
