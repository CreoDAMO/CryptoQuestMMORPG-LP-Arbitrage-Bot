import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { Token, Fetcher, Route } from '@uniswap/sdk';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const CQT_ADDRESS = process.env.CQT_ADDRESS!;
const MATIC_ADDRESS = process.env.MATIC_ADDRESS!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const cqtToken = new Token(137, CQT_ADDRESS, 18);
        const maticToken = new Token(137, MATIC_ADDRESS, 18);
        const pair = await Fetcher.fetchPairData(cqtToken, maticToken, provider);
        const route = new Route([pair], maticToken);
        res.status(200).json({
            midPrice: route.midPrice.toSignificant(6),
            inversePrice: route.midPrice.invert().toSignificant(6),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
