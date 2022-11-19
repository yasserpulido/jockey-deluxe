import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { JockeysPage } from "./pages/jockeys";
import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <JockeysPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
