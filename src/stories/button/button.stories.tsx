import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
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

export const Primary = Template.bind({});

Primary.args = {
  label: "Primary",
  variant: "Primary",
  disabled: false,
};
