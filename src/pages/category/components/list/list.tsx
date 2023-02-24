import { useContext } from "react";
import { ColumnProp, Table } from "../../../../design-system/table/table";
import { Category } from "../../../../types";
import { CategoryProvider } from "../../providers";

const List = () => {
  const context = useContext<CategoryProvider.ContextType>(
    CategoryProvider.Context
  );

  const columns: Array<ColumnProp<Category>> = [
    { heading: "Name", value: "name" },
  ];

  return (
    <Table
      columns={columns}
      data={context.categories}
      onSelect={context.categorySelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
