import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Slash UI - Neomorphic Design System',
  brandUrl: '/',
  brandImage: './logo.svg',
  brandTarget: '_self',

  // UI colors
  colorPrimary: '#6C5CE7',
  colorSecondary: '#6C5CE7',

  // Background
  appBg: '#E0E5EC',
  appContentBg: '#E0E5EC',
  appBorderColor: 'rgba(163, 177, 198, 0.4)',
  appBorderRadius: 12,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#2D3436',
  textInverseColor: '#E0E5EC',

  // Toolbar
  barTextColor: '#636E72',
  barSelectedColor: '#6C5CE7',
  barBg: '#E0E5EC',

  // Form colors
  inputBg: '#E0E5EC',
  inputBorder: 'rgba(163, 177, 198, 0.4)',
  inputTextColor: '#2D3436',
  inputBorderRadius: 8,
});

addons.setConfig({
  theme,
});
