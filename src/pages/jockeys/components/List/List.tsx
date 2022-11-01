import React from "react";
import { observer } from "mobx-react-lite";
import { StoreType } from "../../models";
import { JockeyContext } from "../../providers/Jockey";

export const List = observer(() => {
  const context = React.useContext(JockeyContext) as StoreType;

  return (
    <ul>
      {context.jockeys?.map((jockey) => (
        <li key={jockey.id}>
          {`${jockey.id} ${jockey.firstName} ${jockey.lastName} ${jockey.birth} ${jockey.gender}`}{" "}
          <button type="button" onClick={() => context.edit(jockey)}>
            Edit
          </button>
          <button type="button" onClick={() => context.remove(jockey.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
});
