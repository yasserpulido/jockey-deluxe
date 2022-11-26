import { ComponentStory, ComponentMeta } from "@storybook/react";
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
];

Default.args = {
  text: "Gender",
  options: options,
};
