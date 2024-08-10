// pages/_app.tsx

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/styles/theme'; // Ensure the path is correct
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
