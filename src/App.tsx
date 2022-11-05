import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Horses from "./pages/horses";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Horses />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
