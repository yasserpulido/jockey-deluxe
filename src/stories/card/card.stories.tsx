import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card } from "../../design-system";

export default {
  title: "Card",
  component: Card,
  //   argTypes: {
  //     variant: {
  //       control: "select",
  //       options: ["Primary", "Danger", "Warning", "Success"],
  //       defaultValue: "Primary",
  //     },
  //   },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card />;

export const Default = Template.bind({});

Default.args = {
  title: "Primary",
  content: "Primary",
};
