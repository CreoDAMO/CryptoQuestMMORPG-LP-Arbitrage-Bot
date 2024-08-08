// src/pages/index.tsx
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import theme from '../styles/theme';
import { ethers } from 'ethers';
import { setupProvider, getPairData, executeFlashLoan, executeTrade } from '../utils/blockchain';

const Home: React.FC = () => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const initialize = async () => {
      await setupProvider();
      await getPairData();
    };

    initialize();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Header setSigner={setSigner} />
      <Dashboard signer={signer} />
      <Footer />
    </ChakraProvider>
  );
};

export default Home;
