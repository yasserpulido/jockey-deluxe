import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "../../design-system";
import { Theme } from "../../providers";

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

const columns = [
  { heading: "Rank", value: "rank" },
  { heading: "Jockey", value: "jockey" },
  { heading: "Races", value: "races" },
];

const data = [
  { rank: "1", jockey: "Yasser Barzotto", races: "23" },
  { rank: "2", jockey: "Boris Barzotto", races: "18" },
  { rank: "3", jockey: "Nabila Barzotto", races: "15" },
];

Default.args = {
  caption: "Most Ranked Jockeys on Hipodromo de Palermo, 2022",
  // columns,
  data,
};
