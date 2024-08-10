// pages/api/fetchBlockNumber.ts

import { NextApiRequest, NextApiResponse } from 'next';
import alchemy from '../../src/config/alchemy.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blockNumber = await alchemy.core.getBlockNumber();
    res.status(200).json({ blockNumber });
  } catch (error) {
    console.error('Error fetching block number:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};
