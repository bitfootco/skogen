import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // Set base path for GitHub Pages deployment under /skogen/
    config.base = '/skogen/';
    return config;
  },
};

export default config;
