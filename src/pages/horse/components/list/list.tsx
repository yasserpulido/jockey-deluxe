import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../design-system";
import { ColumnProp } from "../../../../design-system/table/table";
import { Horse } from "../../../../types";
import { HorseProvider } from "../../providers";

const List = () => {
  const { t } = useTranslation("horse");
  const context = useContext<HorseProvider.ContextType>(HorseProvider.Context);

  const columns: ColumnProp<Horse>[] = [
    { heading: t("labels.name"), value: "name" },
    { heading: t("labels.birth_date"), value: "birth" },
  ];

  return (
    <Table
      columns={columns}
      data={context.horses}
      onSelect={context.horseSelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
