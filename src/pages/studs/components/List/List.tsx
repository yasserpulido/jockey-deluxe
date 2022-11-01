import React from "react";
import { observer } from "mobx-react-lite";
import { StoreType } from "../../models";
import { StudContext } from "../../providers";

function List() {
  const context = React.useContext(StudContext) as StoreType;

  return (
    <ul>
      {context.studs?.map((stud) => (
        <li key={stud.id}>
          {`${stud.id} ${stud.fullName}`}
          <button type="button" onClick={() => context.edit(stud)}>
            Edit
          </button>
          <button type="button" onClick={() => context.remove(stud.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default observer(List);
