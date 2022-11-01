import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Studs } from "./pages/studs";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Studs />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
