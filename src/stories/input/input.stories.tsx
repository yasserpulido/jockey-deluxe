import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "../../design-system";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "Nombre:",
  type: "text",
};
