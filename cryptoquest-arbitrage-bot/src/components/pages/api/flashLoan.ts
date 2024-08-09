import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { executeFlashLoan } from '../../utils/aave';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const MATIC_ADDRESS = process.env.MATIC_ADDRESS!;
const SIGNER_ADDRESS = process.env.SIGNER_ADDRESS!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { borrowAmount } = req.body;
        const tx = await executeFlashLoan(provider, ethers.utils.parseUnits(borrowAmount, 'ether'), SIGNER_ADDRESS);
        res.status(200).json({ data: tx.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
