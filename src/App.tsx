import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Breeds } from "./pages/breeds";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Breeds />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
