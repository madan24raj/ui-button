import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { ButtonProps } from "./Button.type";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Spark/Button",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button data-test-id="InputField-id" {...args} />
);
Primary.args = {
  primary: true,
  disabled: false,
  text: "Primary",
};


export const Disabled: Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button data-test-id="InputField-id" {...args} />
);
Disabled.args = {
  primary: false,
  disabled: true,
  text: "Disabled",
};

export const Small: Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button data-test-id="InputField-id" {...args} />
);
Small.args = {
  primary: true,
  disabled: false,
  size: "small",
  text: "Small",
};

export const Medium: Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button data-test-id="InputField-id" {...args} />
);
Medium.args = {
  primary: true,
  disabled: false,
  size: "medium",
  text: "Medium",
};

export const Large: Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button data-test-id="InputField-id" {...args} />
);
Large.args = {
  primary: true,
  disabled: false,
  size: "large",
  text: "Large",
};


export const Loading: Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button {...args} /> );
Loading.args = {
  isLoading: true,
  children: 'Click me',
};

export const WithTooltip : Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
  <Button {...args} /> );
  WithTooltip.args = {
    confirmTooltip: 'Are you sure you want to proceed?',
    confirmText: 'Confirm',
  };

  export const WithProgressBar : Story = (args: React.JSX.IntrinsicAttributes & ButtonProps) => (
    <Button {...args} /> );
  WithProgressBar.args = {
    children: 'Loading...',
    showPercentage: true,
    progress: 50,
  };