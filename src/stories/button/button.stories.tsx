import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "../../providers";
import { Button } from "../../design-system";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["Primary", "Danger", "Warning", "Success"],
      defaultValue: "Primary",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

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
  text: "Primary",
  variant: "primary",
  disabled: false,
};
