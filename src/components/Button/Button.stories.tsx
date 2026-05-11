import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { text: 'Button' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const PrimarySolid: Story = {
  args: { color: 'primary', variant: 'solid' },
};

export const PrimaryOutlined: Story = {
  args: { color: 'primary', variant: 'outlined' },
};

export const PrimaryText: Story = {
  args: { color: 'primary', variant: 'text' },
};

export const SecondarySolid: Story = {
  args: { color: 'secondary', variant: 'solid' },
};

export const Black: Story = {
  args: { color: 'black', variant: 'solid' },
};

export const White: Story = {
  args: { color: 'white', variant: 'solid' },
  parameters: { backgrounds: { default: 'dark' } },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithIcon: Story = {
  args: { Icon: <span>→</span> },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl' },
};
