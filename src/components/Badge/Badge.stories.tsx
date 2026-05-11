import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Badge from '.';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { text: 'Badge' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const PrimarySolid: Story = {
  args: { color: 'primary', variant: 'solid' },
};

export const PrimaryOutlined: Story = {
  args: { color: 'primary', variant: 'outlined' },
};

export const PrimaryPill: Story = {
  args: { color: 'primary', variant: 'pill' },
};

export const SecondarySolid: Story = {
  args: { color: 'secondary', variant: 'solid' },
};

export const WithIcon: Story = {
  args: {
    text: 'New',
    Icon: <span>★</span>,
  },
};

export const SmallSize: Story = {
  args: { size: 'sm', text: 'Small' },
};

export const LargeSize: Story = {
  args: { size: 'lg', text: 'Large' },
};
