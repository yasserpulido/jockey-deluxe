import React from "react";
import { observer } from "mobx-react-lite";
import { Detail } from "./components/detail";

const Horses = () => {
  return (
    <React.Fragment>
      <Detail />
    </React.Fragment>
  );
};

export default observer(Horses);
