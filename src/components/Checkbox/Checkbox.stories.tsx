import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};
