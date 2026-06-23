import type { Meta, StoryObj } from '@storybook/react-vite';
import MultiSelect from '.';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: {
    id: 'fruit',
    label: 'Fruits',
    value: [],
    options: [
      { value: 'a', label: 'Apple' },
      { value: 'b', label: 'Banana' },
      { value: 'c', label: 'Cherry' },
      { value: 'd', label: 'Date' },
    ],
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {};
export const WithSelection: Story = { args: { value: ['a', 'c'] } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { error: 'Select at least one' } };
