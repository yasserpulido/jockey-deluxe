import React from "react";
import { JockeyContext } from "../../providers/jockey";

const List = () => {
  const context = React.useContext(JockeyContext);

  return (
    <ul>
      {context.jockeys?.map((jockey, index) => (
        <li key={jockey.id}>
          {`${index} ${jockey.firstname} ${jockey.lastname} ${jockey.birth} ${jockey.gender}`}{" "}
          <button type="button" onClick={() => context.jockeySelected(jockey)}>
            Edit
          </button>
          <button type="button" onClick={() => context.remove(jockey.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
