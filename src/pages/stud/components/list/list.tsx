import { useContext } from "react";
import { ColumnProp, Table } from "../../../../design-system/table/table";
import { Stud } from "../../../../types";
import { StudProvider } from "../../providers";

const List = () => {
  const context = useContext<StudProvider.ContextType>(StudProvider.Context);

  const columns: Array<ColumnProp<Stud>> = [{ heading: "Name", value: "name" }];

  return (
    <Table
      columns={columns}
      data={context.studs}
      onSelect={context.studSelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
