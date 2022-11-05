import React from "react";
import { observer } from "mobx-react-lite";
import { Detail } from "./components/detail";
import { List } from "./components/list";

const Jockeys = () => {
  return (
    <React.Fragment>
      <Detail />
      <List />
    </React.Fragment>
  );
};

export default observer(Jockeys);
