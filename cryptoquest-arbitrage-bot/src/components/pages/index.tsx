// src/pages/index.tsx

import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import TransactionHistory from '../components/TransactionHistory'; // Import the TransactionHistory component
import theme from '../styles/theme';
import { ethers } from 'ethers';
import { setupProvider, getPairData, executeFlashLoan, executeTrade } from '../utils/blockchain';

const Home: React.FC = () => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    const initialize = async () => {
      await setupProvider();
      const pairData = await getPairData();
      console.log('Pair Data:', pairData);

      // Fetch transaction history
      const response = await fetch('/api/fetchTransactionHistory?toAddress=0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152');
      const data = await response.json();
      setTransactionHistory(data.transfers);
    };

    initialize();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Header setSigner={setSigner} />
      <main>
        <Dashboard signer={signer} />
        <TransactionHistory address="0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152" />
      </main>
      <Footer />
    </ChakraProvider>
  );
};

export default Home;
