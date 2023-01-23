import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../design-system";
import { ColumnProp } from "../../../../design-system/table/table";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers";

const List = () => {
  const { t } = useTranslation("jockey");
  const context = useContext(JockeyContext);

  const columns: ColumnProp<Jockey>[] = [
    { heading: t("labels.first_name"), value: "firstname" },
    { heading: t("labels.last_name"), value: "lastname" },
    { heading: t("labels.birth_date"), value: "birth" },
    { heading: t("labels.gender"), value: "gender" },
    { heading: t("labels.nationality"), value: "nationality" },
  ];

  return (
    <Table
      columns={columns}
      data={context.jockeys}
      onSelect={context.jockeySelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
