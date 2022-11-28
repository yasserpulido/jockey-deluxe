import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Jockey } from "../../types";
import { colors } from "../theme/colors";

export type ColumnProp<T> = {
  heading: string;
  value: keyof T;
};

type TableProps<T extends Jockey> = {
  caption?: string;
  columns: Array<ColumnProp<T>>;
  data: Array<T> | undefined;
};

const Table = <T extends Jockey>({ caption, columns, data }: TableProps<T>) => {
  return (
    <Container>
      <TableContainer>
        <Caption>{caption}</Caption>
        <Thead>
          <tr>
            {columns.map((c) => (
              <Th key={c.heading.toLocaleLowerCase()}>{c.heading}</Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {data?.map((d) => (
            <tr key={`tr-${d.id}`}>
              {columns.map((c) => (
                <Td key={`td-${d.id}-${c.heading}`}>
                  {d[c.value] as ReactNode}
                </Td>
              ))}
            </tr>
          ))}
        </Tbody>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div({
  margin: "1rem",
});

const TableContainer = styled.table({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
  width: "100%",
});

const Caption = styled.caption({
  marginBottom: "1rem",
});

const Thead = styled.thead({
  "& th": {
    fontWeight: "bold",
    verticalAlign: "top",
    padding: "5px",
  },
});

const Tbody = styled.thead({
  "& th": {
    verticalAlign: "top",
    padding: "5px",
  },
});

const Th = styled.th({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
});

const Td = styled.td({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
  textAlign: "center",
  padding: "5px",
});

export default Table;
