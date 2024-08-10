import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { addLiquidity } from '../../utils/uniswap';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const CQT_ADDRESS = process.env.CQT_ADDRESS!;
const MATIC_ADDRESS = process.env.MATIC_ADDRESS!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { profits, reinvestPercentage } = req.body;
    const amountToReinvest = profits * (reinvestPercentage / 100);

    // Reinvestment logic here

    res.status(200).json({ message: 'Reinvestment successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
