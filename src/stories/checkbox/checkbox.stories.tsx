import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Checkbox } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
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

Default.args = {
  label: "Jockey",
  name: "name",
};
