// src/components/TradeForm.tsx

import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { ethers } from 'ethers';

interface TradeFormProps {
  signer: ethers.Signer | null;
}

const TradeForm: React.FC<TradeFormProps> = ({ signer }) => {
  const [amount, setAmount] = useState<string>('');

  const executeTrade = async () => {
    if (!signer) {
      alert('Please connect your wallet first.');
      return;
    }
    // Implement trade logic here
    alert(`Executing trade with amount: ${amount}`);
  };

  return (
    <Box>
      <FormControl id="amount" mb={4}>
        <FormLabel>Amount (MATIC)</FormLabel>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={executeTrade}>Execute Trade</Button>
    </Box>
  );
};

export default TradeForm;
