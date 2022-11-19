import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BreedsPage } from "./pages/breeds";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BreedsPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
