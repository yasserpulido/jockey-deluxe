import React from "react";
import { observer } from "mobx-react-lite";
import { Detail } from "./components/Detail";
import { List } from "./components/List";

export const Jockeys = observer(() => {
  return (
    <React.Fragment>
      <Detail />
      <List />
    </React.Fragment>
  );
});
