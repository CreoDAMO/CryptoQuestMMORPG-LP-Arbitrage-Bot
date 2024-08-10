// src/styles/theme.ts

import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Define color mode configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Extend the default theme with custom configurations
const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  colors: {
    primary: {
      100: '#E9D8FD',
      200: '#D6BCFA',
      300: '#B794F4',
      400: '#9F7AEA',
      500: '#6B46C1',
      600: '#553C9A',
      700: '#44337A',
      800: '#322659',
      900: '#21183C',
    },
    secondary: {
      100: '#EBF8FF',
      200: '#BEE3F8',
      300: '#90CDF4',
      400: '#63B3ED',
      500: '#4299E1',
      600: '#3182CE',
      700: '#2B6CB0',
      800: '#2C5282',
      900: '#2A4365',
    },
  },
  shadows: {
    neumorphic: '8px 8px 15px #d1d9e6, -8px -8px 15px #ffffff',
  },
});

export default theme;
