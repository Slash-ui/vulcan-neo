import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'neomorphic-light',
      values: [
        {
          name: 'neomorphic-light',
          value: '#E0E5EC',
        },
        {
          name: 'neomorphic-dark',
          value: '#292D32',
        },
      ],
    },
  },
};

export default preview;
