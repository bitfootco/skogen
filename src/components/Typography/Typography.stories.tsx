import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from '.';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: { children: 'The quick brown fox jumps over the lazy dog' },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Paragraph: Story = {
  args: { variant: 'p' },
};

export const H1: Story = {
  args: { variant: 'h1', children: 'Heading 1' },
};

export const H2: Story = {
  args: { variant: 'h2', children: 'Heading 2' },
};

export const H3: Story = {
  args: { variant: 'h3', children: 'Heading 3' },
};

export const H4: Story = {
  args: { variant: 'h4', children: 'Heading 4' },
};

export const H5: Story = {
  args: { variant: 'h5', children: 'Heading 5' },
};

export const H6: Story = {
  args: { variant: 'h6', children: 'Heading 6' },
};

export const PrimaryColor: Story = {
  args: { variant: 'p', color: 'primary' },
};

export const SecondaryColor: Story = {
  args: { variant: 'p', color: 'secondary' },
};

export const ErrorColor: Story = {
  args: { variant: 'p', color: 'error', children: 'Something went wrong.' },
};

export const GrayColor: Story = {
  args: { variant: 'p', color: 'gray' },
};
