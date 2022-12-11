import React from "react";
import { Table } from "../../../../design-system";
import { ColumnProp } from "../../../../design-system/table/table";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers";

const List = () => {
  const context = React.useContext(JockeyContext);

  const columns: ColumnProp<Jockey>[] = [
    { heading: "First Name", value: "firstname" },
    { heading: "Last Name", value: "lastname" },
    { heading: "Birth", value: "birth" },
    { heading: "Gender", value: "gender" },
    { heading: "Nationality", value: "nationality" },
  ];

  return <Table columns={columns} data={context.jockeys} context={context} />;
};

export default List;
