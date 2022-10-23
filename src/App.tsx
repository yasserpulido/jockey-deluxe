import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Jockeys } from "./pages/jockeys";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/jockeys",
    element: <Jockeys />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
