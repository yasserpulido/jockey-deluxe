import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.decorators = [
  (Story) => (
    <React.Fragment>
      <Theme />
      <Story />
    </React.Fragment>
  ),
];

const content =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate delectus soluta exercitationem dolorum quaerat porro impedit nam ratione. Porro vitae omnis quod corporis nam molestiae fugit id odit facilis tenetur.";

Default.args = {
  title: "Card",
  children: content,
};
