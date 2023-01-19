import { useContext } from "react";
import { ColumnProp, Table } from "../../../../design-system/table/table";
import { Breed } from "../../../../types";
import { BreedContext, BreedContextType } from "../../providers";

const List = () => {
  const context = useContext<BreedContextType>(BreedContext);

  const columns: Array<ColumnProp<Breed>> = [{ heading: "Name", value: "name" }];

  return (
    <Table
      columns={columns}
      data={context.breeds}
      onSelect={context.breedSelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
