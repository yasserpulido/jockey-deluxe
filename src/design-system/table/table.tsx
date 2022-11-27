import styled from "@emotion/styled";
import { ReactNode } from "react";
import { colors } from "../theme/colors";

export type ColumnProp<T> = {
  heading: string;
  value: keyof T;
};

type TableProps<T> = {
  caption?: string;
  columns: Array<ColumnProp<T>>;
  data: Array<T> | undefined;
};

const Table = <T,>({ caption, columns, data }: TableProps<T>) => {
  return (
    <Container>
      <Caption>{caption}</Caption>
      <Thead>
        <tr>
          {columns.map((c) => (
            <Th>{c.heading}</Th>
          ))}
        </tr>
      </Thead>
      <Tbody>
        {data?.map((d) => (
          <tr>
            {columns.map((c) => (
              <Td>{d[c.value] as ReactNode}</Td>
            ))}
          </tr>
        ))}
      </Tbody>
    </Container>
  );
};

const Container = styled.table({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
  margin: "1rem",
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
});

export default Table;
