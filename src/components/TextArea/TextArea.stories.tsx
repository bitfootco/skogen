import type { Meta, StoryObj } from '@storybook/react-vite';
import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    id: 'notes',
    label: 'Notes',
    placeholder: 'Write something...',
    value: '',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'This is some example content.' },
};

export const WithError: Story = {
  args: { error: 'This field is required' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Read only content' },
};

export const NoLabel: Story = {
  args: { label: '' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};
