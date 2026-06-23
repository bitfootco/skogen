import type { Meta, StoryObj } from '@storybook/react-vite';
import FileInput from '.';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  args: { id: 'doc', label: 'Upload document', onChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};
export const PdfOnly: Story = { args: { accept: '.pdf', hint: 'PDF files only' } };
export const Multiple: Story = { args: { multiple: true } };
export const WithError: Story = { args: { error: 'A file is required' } };
