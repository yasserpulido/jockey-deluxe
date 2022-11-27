import React from "react";
import { Table } from "../../../../design-system";
import { ColumnProp } from "../../../../design-system/table/table";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers";

const List = () => {
  const context = React.useContext(JockeyContext);

  const columns: ColumnProp<Jockey>[] = [
    { heading: "Id", value: "id" },
    { heading: "First Name", value: "firstname" },
    { heading: "Last Name", value: "lastname" },
    { heading: "Gender", value: "gender" },
    { heading: "Nationality", value: "nationality" },
  ];

  const data = [
    { rank: "1", jockey: "Peter Smith", races: "23" },
    { rank: "2", jockey: "Mary King", races: "18" },
    { rank: "3", jockey: "Jack Parra", races: "15" },
  ];

  return <Table columns={columns} data={context.jockeys} />;
};

export default List;
