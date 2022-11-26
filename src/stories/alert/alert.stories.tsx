import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Alert } from "../../design-system";
import { Theme } from "../../providers";

export default {
  title: "Alert",
  component: Alert,
  argTypes: {
    type: {
      control: "select",
      options: ["Danger", "Warning", "Success"],
      defaultValue: "Success",
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

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
  type: "Success",
  children: content,
};
