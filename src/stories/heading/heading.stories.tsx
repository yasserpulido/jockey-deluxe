import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Heading } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Heading",
  component: Heading,
  argTypes: {
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      defaultValue: "h1",
    },
  },
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
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

const content = "Lorem ipsum dolor";

Default.args = {
  size: "h1",
  children: content,
};
