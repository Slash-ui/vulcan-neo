import type { Preview } from '@storybook/react-vite';
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
      options: {
        "neomorphic-light": {
          name: 'neomorphic-light',
          value: '#E0E5EC',
        },

        "neomorphic-dark": {
          name: 'neomorphic-dark',
          value: '#292D32',
        }
      }
    },
    options: {
      storySort: {
        order: [
          'foundation',
          'Foundation',
          'Atoms',
          'Molecules',
          ['*', 'Charts'],
          'Organisms',
          'Templates',
          ['*', 'Marketing'],
        ],
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'neomorphic-light'
    }
  }
};

export default preview;
