import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "../../design-system";
import { Theme } from "../../providers";
import { ColumnProp } from "../../design-system/table/table";
import { Jockey } from "../../types";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

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
    firstname: "Yasser",
    lastname: "Pulido",
    birth: "30-04-1991",
    gender: "2",
    nationality: "10",
  },
];

Default.args = {
  caption: "Most Ranked Jockeys on Hipodromo de Palermo, 2022",
  columns,
  data,
};
