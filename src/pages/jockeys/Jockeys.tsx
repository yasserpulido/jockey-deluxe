import React from "react";
import { observer } from "mobx-react-lite";
import { Detail } from "./components/Detail";
import { StoreType } from "./models";
import { JockeyContext } from "./providers/Jockey";

export const Jockeys = observer(() => {
  const context = React.useContext(JockeyContext) as StoreType;

  return (
    <React.Fragment>
      <Detail />
      <ul>
        {context.jockeys?.map((jockey) => (
          <li
            key={jockey.firstName}
          >{`${jockey.firstName} ${jockey.lastName}`}</li>
        ))}
      </ul>
    </React.Fragment>
  );
});
