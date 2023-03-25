import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { InputNumber } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "InputNumber",
  component: InputNumber,
} as ComponentMeta<typeof InputNumber>;

const Template: ComponentStory<typeof InputNumber> = (args) => (
  <InputNumber {...args} />
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
  label: "Number",
  onChange: (value) => console.log(value),
  max: 10,
  min: 0,
  step: 1,
  errors: "",
};
