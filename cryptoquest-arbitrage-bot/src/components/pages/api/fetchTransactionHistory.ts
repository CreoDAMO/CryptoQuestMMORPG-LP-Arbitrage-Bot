// pages/api/fetchTransactionHistory.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: process.env.ALCHEMY_API_KEY!,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { toAddress } = req.query;

    if (!toAddress) {
      return res.status(400).json({ error: 'toAddress query parameter is required' });
    }

    const response = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      fromAddress: '0x0000000000000000000000000000000000000000',
      toAddress: toAddress as string,
      excludeZeroValue: true,
      category: ['erc721', 'erc1155'],
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: error.message });
  }
};
