// src/components/ReinvestForm.tsx

import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { ethers } from 'ethers';

interface ReinvestFormProps {
  signer: ethers.Signer | null;
}

const ReinvestForm: React.FC<ReinvestFormProps> = ({ signer }) => {
  const [profits, setProfits] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');

  const reinvestProfits = async () => {
    if (!signer) {
      alert('Please connect your wallet first.');
      return;
    }
    // Implement reinvest logic here
    alert(`Reinvesting ${percentage}% of profits: ${profits}`);
  };

  return (
    <Box>
      <FormControl id="profits" mb={4}>
        <FormLabel>Profits (MATIC)</FormLabel>
        <Input type="number" value={profits} onChange={(e) => setProfits(e.target.value)} />
      </FormControl>
      <FormControl id="percentage" mb={4}>
        <FormLabel>Reinvestment Percentage</FormLabel>
        <Input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={reinvestProfits}>Reinvest Profits</Button>
    </Box>
  );
};

export default ReinvestForm;
