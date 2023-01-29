import React from "react";
import { Detail } from "./components/detail";
import { Provider } from "./providers";

const Horses = () => {
  return (
    <Provider>
      <Detail />
    </Provider>
  );
};

export default Horses;
