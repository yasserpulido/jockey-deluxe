import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "../../providers";
import { ColumnProp, Table } from "../../design-system/table/table";
import { Jockey } from "../../types";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = () => (
  <Table columns={columns} data={data} isLoading={false} onSelect={() => {}} />
);

export const Default = Template.bind({});

Default.decorators = [
  (Story) => (
    <React.Fragment>
      <Theme />
      <Story />
    </React.Fragment>
  ),
];

const columns: Array<ColumnProp<Jockey>> = [
  { heading: "Id", value: "id" },
  { heading: "First Name", value: "firstname" },
  { heading: "Last Name", value: "lastname" },
  { heading: "Birth", value: "birth" },
  { heading: "Gender", value: "gender" },
  { heading: "Nationality", value: "nationality" },
];

const data: Array<Jockey> = [
  {
    id: "1",
    firstname: "Peter",
    lastname: "Anguila",
    birth: "24-09-2000",
    gender: "2",
    nationality: "10",
    job: {
      jockey: true,
      trainer: false,
    },
  },
  {
    id: "2",
    firstname: "Jack",
    lastname: "Parra",
    birth: "01-02-1990",
    gender: "2",
    nationality: "10",
    job: {
      jockey: true,
      trainer: false,
    },
  },
];
