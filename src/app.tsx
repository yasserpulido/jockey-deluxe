import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageSwitcher } from "./i18n";
import { Breed, Horse, Human, Stud, Track } from "./pages";
// import { routes } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Track/>,
  },
]);

const App = () => {
  return (
    <React.Fragment>
      <LanguageSwitcher />
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
