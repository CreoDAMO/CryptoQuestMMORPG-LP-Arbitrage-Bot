// pages/api/fetchTokenBalances.ts

import { NextApiRequest, NextApiResponse } from 'next';
import alchemy from '../../src/config/alchemy.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const address = req.query.address as string;
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const tokenBalances = await alchemy.core.getTokenBalances(address);
    res.status(200).json(tokenBalances);
  } catch (error) {
    console.error('Error fetching token balances:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};
