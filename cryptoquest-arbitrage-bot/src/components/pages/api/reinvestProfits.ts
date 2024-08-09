import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { Token, Fetcher, Route } from '@uniswap/sdk';
import { addLiquidity } from '../../utils/uniswap';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const CQT_ADDRESS = process.env.CQT_ADDRESS!;
const MATIC_ADDRESS = process.env.MATIC_ADDRESS!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { profits, reinvestPercentage } = req.body;
        const amountToReinvest = profits * (reinvestPercentage / 100);

        const cqtToken = new Token(137, CQT_ADDRESS, 18);
        const maticToken = new Token(137, MATIC_ADDRESS, 18);
        const pair = await Fetcher.fetchPairData(cqtToken, maticToken, provider);
        const route = new Route([pair], maticToken);

        const maticAmount = amountToReinvest / parseFloat(route.midPrice.toSignificant(6));
        const cqtAmount = amountToReinvest;

        await addLiquidity(provider, cqtAmount, maticAmount);
        res.status(200).json({ message: 'Reinvestment successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
