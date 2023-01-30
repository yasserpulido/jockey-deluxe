import { useContext } from "react";
import { ColumnProp, Table } from "../../../../design-system/table/table";
import { Track } from "../../../../types";
import { TrackProvider } from "../../providers";

const List = () => {
  const context = useContext<TrackProvider.TrackContextType>(
    TrackProvider.Context
  );

  const columns: Array<ColumnProp<Track>> = [
    { heading: "Name", value: "name" },
    { heading: "Country", value: "country" },
  ];

  return (
    <Table
      columns={columns}
      data={context.tracks}
      onSelect={context.trackSelected}
      isLoading={context.isLoading}
    />
  );
};

export default List;
