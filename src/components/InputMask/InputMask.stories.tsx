import type { Meta, StoryObj } from '@storybook/react-vite';
import InputMask from '.';

const meta: Meta<typeof InputMask> = {
  title: 'Components/InputMask',
  component: InputMask,
  tags: ['autodocs'],
  args: {
    id: 'phone',
    label: 'Phone number',
    mask: '(###) ###-####',
    value: '',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof InputMask>;

export const PhoneNumber: Story = {};

export const DateOfBirth: Story = {
  args: {
    id: 'dob',
    label: 'Date of birth',
    mask: '##/##/####',
    value: '',
  },
};

export const SocialSecurity: Story = {
  args: {
    id: 'ssn',
    label: 'SSN',
    mask: '###-##-####',
    value: '',
  },
};
