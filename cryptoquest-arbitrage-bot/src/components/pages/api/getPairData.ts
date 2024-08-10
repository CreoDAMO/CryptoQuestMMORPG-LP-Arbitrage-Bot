import { NextApiRequest, NextApiResponse } from 'next';
import { ethers, providers } from 'ethers';
import { Token } from '@uniswap/sdk-core';
import { Pool, Route, TickMath, nearestUsableTick, Position } from '@uniswap/v3-sdk';
import { ALPHA, ETH } from './constants'; // Ensure you have the necessary constants defined
require('dotenv').config();

const provider = new providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const CQT_ADDRESS = process.env.CQT_ADDRESS!;
const MATIC_ADDRESS = process.env.MATIC_ADDRESS!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const cqtToken = new Token(137, CQT_ADDRESS, 18);
        const maticToken = new Token(137, MATIC_ADDRESS, 18);

        // Fetch pool data from Uniswap V3
        const poolAddress = 'YOUR_POOL_ADDRESS'; // Specify the pool address
        const poolContract = new ethers.Contract(poolAddress, ['function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)'], provider);
        const [sqrtPriceX96, tick] = await poolContract.slot0();

        const pool = new Pool(
            cqtToken,
            maticToken,
            3000, // Fee tier
            sqrtPriceX96,
            TickMath.getTickAtSqrtRatio(sqrtPriceX96),
            tick
        );

        const route = new Route([pool], cqtToken, maticToken);
        res.status(200).json({
            midPrice: route.midPrice.toSignificant(6),
            inversePrice: route.midPrice.invert().toSignificant(6),
        });
    } catch (error) {
        console.error('Error fetching pair data:', error);
        res.status(500).json({ error: error.message });
    }
};
