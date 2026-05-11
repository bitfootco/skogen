import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from '.';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    id: 'country',
    label: 'Country',
    options,
    selected: '',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: { selected: 'us' },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const MultiSelect: Story = {
  args: { multiple: true, selected: ['us', 'ca'] },
};
