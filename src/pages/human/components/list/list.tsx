import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../design-system";
import { ColumnProp } from "../../../../design-system/table/table";
import { Human } from "../../../../types";
import { HumanContext } from "../../providers";

const List = () => {
  const { t } = useTranslation("human");
  const context = useContext(HumanContext);

  const columns: ColumnProp<Human>[] = [
    { heading: t("labels.first_name"), value: "firstname" },
    { heading: t("labels.last_name"), value: "lastname" },
    { heading: t("labels.birth_date"), value: "birth" },
    { heading: t("labels.gender"), value: "gender" },
    { heading: t("labels.nationality"), value: "nationality" },
  ];

  return (
    <Table
      columns={columns}
      data={context.humans}
      onSelect={context.humanSelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
