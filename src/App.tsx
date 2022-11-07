import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Tracks } from "./pages/track";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tracks />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
