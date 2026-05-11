import type { Meta, StoryObj } from '@storybook/react-vite';
import InputField from '.';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    id: 'input',
    label: 'Email address',
    placeholder: 'you@example.com',
    value: '',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'hello@example.com' },
};

export const WithError: Story = {
  args: { error: 'This field is required' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'readonly@example.com' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Password: Story = {
  args: { type: 'password', label: 'Password', placeholder: '••••••••' },
};
