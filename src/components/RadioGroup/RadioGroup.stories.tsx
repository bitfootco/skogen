import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioGroup from '.';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    id: 'fruit',
    label: 'Favourite fruit',
    value: 'a',
    options: [
      { value: 'a', label: 'Apple' },
      { value: 'b', label: 'Banana' },
      { value: 'c', label: 'Cherry' },
    ],
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { error: 'Please choose one' } };
export const Disabled: Story = { args: { disabled: true } };
