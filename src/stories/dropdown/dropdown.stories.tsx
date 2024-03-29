import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Dropdown } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});

const options = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
  { id: "4", name: "Option 4" },
  { id: "5", name: "Option 5" },
  { id: "6", name: "Option 6" },
  { id: "7", name: "Option 7" },
  { id: "8", name: "Option 8" },
  { id: "9", name: "Option 9" },
  { id: "10", name: "Option 10" },
];

Default.decorators = [
  (Story) => (
    <React.Fragment>
      <Theme />
      <Story />
    </React.Fragment>
  ),
];

Default.args = {
  label: "Country",
  options: options,
  onChange: () => {},
};

export const NoOptions = Template.bind({});

NoOptions.decorators = [
  (Story) => (
    <React.Fragment>
      <Theme />
      <Story />
    </React.Fragment>
  ),
];

NoOptions.args = {
  label: "Gender",
  options: [],
  onChange: () => {},
};
