import type { Meta, StoryObj } from '@storybook/react-vite';
import DateInput from '.';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  args: { id: 'dob', label: 'Date of birth', value: '', onChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = {};
export const DateTime: Story = { args: { type: 'datetime-local', label: 'Starts at' } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { error: 'Invalid date' } };
