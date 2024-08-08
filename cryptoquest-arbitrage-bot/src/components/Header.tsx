// src/components/Header.tsx

import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

interface HeaderProps {
  setSigner: (signer: ethers.Signer | null) => void;
}

const Header: React.FC<HeaderProps> = ({ setSigner }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    const provider = (await detectEthereumProvider()) as any;
    if (provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      setSigner(ethersProvider.getSigner());
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <Flex as="header" p={4} bg="teal.500" color="white" alignItems="center">
      <Heading size="md">CryptoQuest LP Arbitrage Bot</Heading>
      <Spacer />
      {account ? (
        <Button colorScheme="teal" variant="outline">
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
      ) : (
        <Button colorScheme="teal" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
};

export default Header;
