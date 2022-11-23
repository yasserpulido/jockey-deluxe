import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Jockeys from "./pages";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Jockeys />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
