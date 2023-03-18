import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Panel } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Panel",
  component: Panel,
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args}/>;

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
  children: "Content",
  title: "Title",
};
