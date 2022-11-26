import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Input } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

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
  label: "Nombre",
  type: "text",
};
