import styled from "@emotion/styled";
import React, { ReactNode, useEffect, useState } from "react";
import { Jockey } from "../../types";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { Input } from "../input";
import { colors } from "../theme/colors";

export type ColumnProp<T> = {
  heading: string;
  value: keyof T;
};

type TableProps<T extends Jockey> = {
  columns: Array<ColumnProp<T>>;
  // data: Array<T> | undefined;
  data: any | undefined;
  context: any;
};

const Table = <T extends Jockey>({ columns, data, context }: TableProps<T>) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [content, setContent] = useState(data);
  const prevPage = () => setPage((prevState) => prevState - 1);
  const nextPage = () => setPage((prevState) => prevState + 1);

  useEffect(() => {
    setContent({
      page: page,
      perPage: perPage,
      total: data.length,
      totalPage: Math.ceil(data.length / perPage),
      data,
    });
  }, [data, perPage, page]);

  const ENTRIES = [
    {
      id: "1",
      name: "5",
    },
    {
      id: "2",
      name: "10",
    },
    {
      id: "3",
      name: "15",
    },
    {
      id: "4",
      name: "20",
    },
  ];

  return (
    <React.Fragment>
      <Header>
        <Dropdown label="Entries" options={ENTRIES} onChange={() => {}} />
        <Input label="Search" name="search" />
      </Header>
      <TableContainer>
        <Thead>
          <tr>
            {columns.map((c) => (
              <Th key={c.heading.toLocaleLowerCase()}>{c.heading}</Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {data?.data?.map((d: any) => (
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
      <Pagination>
        <Show>
          <span>Showing 1 to 25 of 57 entries</span>
        </Show>
        <Navigation>
          <Button
            text="Previous"
            variant="Primary"
            onClick={prevPage}
            disabled={page === 1}
          />
          <Button text="Next" variant="Primary" onClick={nextPage} />
        </Navigation>
      </Pagination>
    </React.Fragment>
  );
};

const Header = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});

const TableContainer = styled.table({
  border: `1px solid ${colors.Black}`,
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "1rem",
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
  padding: "0.2rem",
});

const Pagination = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  borderLeft: `1px solid ${colors.Black}`,
  borderBottom: `1px solid ${colors.Black}`,
  borderRight: `1px solid ${colors.Black}`,
  padding: "0.2rem",
});

const Show = styled.div({
  display: "flex",
  alignItems: "center",
});

const Navigation = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",

  "& button:first-of-type": {
    marginRight: "0.2rem",
  },
});

export default Table;
