// src/config/alchemy.config.ts

import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
  network: Network.MATIC_MAINNET, // Replace with your network, e.g., Network.MATIC_MAINNET.
};

const alchemy = new Alchemy(settings);

export default alchemy;
