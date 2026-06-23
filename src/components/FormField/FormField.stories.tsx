import type { Meta, StoryObj } from '@storybook/react-vite';
import FormField from '.';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {
    id: 'field',
    label: 'Field label',
    children: (aria) => (
      <input
        {...aria}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Some guidance for this field' } };
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { error: 'This field is required' } };
