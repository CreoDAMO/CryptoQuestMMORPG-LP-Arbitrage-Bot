import { ethers } from 'ethers';
import { Token, Fetcher, Route } from '@uniswap/sdk';
import { Pool } from '@aave/contract-helpers';

const ALCHEMY_URL = process.env.ALCHEMY_URL!;
const CQT_ADDRESS = process.env.CQT_ADDRESS!;
const MATIC_ADDRESS = process.env.MATIC_ADDRESS!;
const AAVE_POOL_ADDRESS_PROVIDER = process.env.AAVE_POOL_ADDRESS_PROVIDER!;
const UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_ADDRESS!;
const UNISWAP_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"CollectProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid1","type":"uint256"}],"name":"Flash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextOld","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextNew","type":"uint16"}],"name":"IncreaseObservationCardinalityNext","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Initialize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"feeProtocol0Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol0New","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1New","type":"uint8"}],"name":"SetFeeProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collectProtocol","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal0X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal1X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"}],"name":"increaseObservationCardinalityNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidityPerTick","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint32","name":"blockTimestamp","type":"uint32"},{"internalType":"int56","name":"tickCumulative","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityCumulativeX128","type":"uint160"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"secondsAgos","type":"uint32[]"}],"name":"observe","outputs":[{"internalType":"int56[]","name":"tickCumulatives","type":"int56[]"},{"internalType":"uint160[]","name":"secondsPerLiquidityCumulativeX128s","type":"uint160[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"positions","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFees","outputs":[{"internalType":"uint128","name":"token0","type":"uint128"},{"internalType":"uint128","name":"token1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"feeProtocol0","type":"uint8"},{"internalType":"uint8","name":"feeProtocol1","type":"uint8"}],"name":"setFeeProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint16","name":"observationIndex","type":"uint16"},{"internalType":"uint16","name":"observationCardinality","type":"uint16"},{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"},{"internalType":"uint8","name":"feeProtocol","type":"uint8"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"snapshotCumulativesInside","outputs":[{"internalType":"int56","name":"tickCumulativeInside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityInsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsInside","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"int256","name":"amountSpecified","type":"int256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"int256","name":"amount0","type":"int256"},{"internalType":"int256","name":"amount1","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"","type":"int16"}],"name":"tickBitmap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"ticks","outputs":[{"internalType":"uint128","name":"liquidityGross","type":"uint128"},{"internalType":"int128","name":"liquidityNet","type":"int128"},{"internalType":"uint256","name":"feeGrowthOutside0X128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthOutside1X128","type":"uint256"},{"internalType":"int56","name":"tickCumulativeOutside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityOutsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsOutside","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

let provider: ethers.providers.JsonRpcProvider;

export async function setupProvider() {
  provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);
}

export async function getPairData() {
  try {
    const cqtToken = new Token(137, CQT_ADDRESS, 18);
    const maticToken = new Token(137, MATIC_ADDRESS, 18);
    const pair = await Fetcher.fetchPairData(cqtToken, maticToken, provider);
    const route = new Route([pair], maticToken);
    console.log(`1 MATIC = ${route.midPrice.toSignificant(6)} CQT`);
    console.log(`1 CQT = ${route.midPrice.invert().toSignificant(6)} MATIC`);
  } catch (error) {
    console.error(error);
  }
}

export async function executeFlashLoan(borrowAmount: ethers.BigNumber) {
  const pool = new Pool(provider, {
    POOL_ADDRESSES_PROVIDER: AAVE_POOL_ADDRESS_PROVIDER,
  });

  const signerAddress = '0xCc380FD8bfbdF0c020de64075b86C84c2BB0AE79'; // Replace with your address

  const tx = await pool.flashLoan({
    assets: [MATIC_ADDRESS],
    amounts: [borrowAmount],
    modes: [0],
    onBehalfOf: signerAddress,
    params: '0x',
    referralCode: 0,
  });

  console.log(`Flash loan transaction data: ${tx.data}`);
}

export async function reinvestProfits(profits: number, reinvestPercentage: number) {
  const amountToReinvest = profits * (reinvestPercentage / 100);

  const cqtToken = new Token(137, CQT_ADDRESS, 18);
  const maticToken = new Token(137, MATIC_ADDRESS, 18);
  const pair = await Fetcher.fetchPairData(cqtToken, maticToken, provider);
  const route = new Route([pair], maticToken);

  const maticAmount = amountToReinvest / parseFloat(route.midPrice.toSignificant(6));
  const cqtAmount = amountToReinvest;

  await addLiquidity(cqtAmount, maticAmount);
}

export async function addLiquidity(amountCQT: number, amountMATIC: number) {
  const poolContract = new ethers.Contract(UNISWAP_POOL_ADDRESS, UNISWAP_POOL_ABI, provider);

  const tx = await poolContract.mint({
    tickLower: getTick(1.53109),
    tickUpper: getTick(2.05436),
    amount0Desired: ethers.utils.parseUnits(amountCQT.toString(), 'ether'),
    amount1Desired: ethers.utils.parseUnits(amountMATIC.toString(), 'ether'),
    amount0Min: 0,
    amount1Min: 0,
    recipient: '0xCc380FD8bfbdF0c020de64075b86C84c2BB0AE79',
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  });

  console.log(`Liquidity addition transaction data: ${tx.data}`);
}

function getTick(price: number): number {
  return Math.floor(Math.log(price) / Math.log(1.0001));
}

export function calculateReinvestmentPercentage(profits: number): number {
  if (profits > 100) return 60;
  if (profits > 50) return 50;
  return 40;
}

export async function executeTrade(buyExchange: string, sellExchange: string, amount: number) {
  let profits = 0;

  if (buyExchange === 'sushiswap' && sellExchange === 'uniswap') {
    const buyResult = await buyOnSushiSwap(amount);
    const sellResult = await sellOnUniswap(amount);
    profits = sellResult - buyResult;
  } else if (buyExchange === 'uniswap' && sellExchange === 'sushiswap') {
    const buyResult = await buyOnUniswap(amount);
    const sellResult = await sellOnSushiSwap(amount);
    profits = sellResult - buyResult;
  }

  const reinvestPercentage = calculateReinvestmentPercentage(profits);
  console.log(`Reinvesting ${reinvestPercentage}% of profits`);

  if (profits > 0) {
    await reinvestProfits(profits, reinvestPercentage);
  }
}

async function buyOnSushiSwap(amount: number) {
  // Implement SushiSwap buy logic here
  // Example:
  const sushiswapRouter = new ethers.Contract(
    '0xd9e1cE17f2641F24aE83637ab66a2cca9C378B9F', // SushiSwap router address
    [
      'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
    ],
    provider
  );

  const signer = provider.getSigner();
  const tx = await sushiswapRouter.connect(signer).swapExactETHForTokens(
    0, // Amount out minimum (set to 0 for simplicity, should be calculated)
    [MATIC_ADDRESS, CQT_ADDRESS], // Path
    '0xCc380FD8bfbdF0c020de64075b86C84c2BB0AE79', // Recipient
    Math.floor(Date.now() / 1000) + 60 * 20, // Deadline
    { value: ethers.utils.parseUnits(amount.toString(), 'ether') }
  );

  await tx.wait();
  return tx; // Return the transaction result
}

async function sellOnUniswap(amount: number) {
  // Implement Uniswap sell logic here
  // Example:
  const uniswapRouter = new ethers.Contract(
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap router address
    [
      'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    provider
  );

  const signer = provider.getSigner();
  const tx = await uniswapRouter.connect(signer).swapExactTokensForETH(
    ethers.utils.parseUnits(amount.toString(), 'ether'), // Amount in
    0, // Amount out minimum (set to 0 for simplicity, should be calculated)
    [CQT_ADDRESS, MATIC_ADDRESS], // Path
    '0xCc380FD8bfbdF0c020de64075b86C84c2BB0AE79', // Recipient
    Math.floor(Date.now() / 1000) + 60 * 20 // Deadline
  );

  await tx.wait();
  return tx; // Return the transaction result
}

async function buyOnUniswap(amount: number) {
  // Implement Uniswap buy logic here
  const uniswapRouter = new ethers.Contract(
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap router address
    [
      'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
    ],
    provider
  );

  const signer = provider.getSigner();
  const tx = await uniswapRouter.connect(signer).swapExactETHForTokens(
    0, // Amount out minimum (set to 0 for simplicity, should be calculated)
    [MATIC_ADDRESS, CQT_ADDRESS], // Path
    '0xCc380FD8bfbdF0c020de64075b86C84c2BB0AE79', // Recipient
    Math.floor(Date.now() / 1000) + 60 * 20, // Deadline
    { value: ethers.utils.parseUnits(amount.toString(), 'ether') }
  );

  await tx.wait();
  return tx; // Return the transaction result
}

async function sellOnSushiSwap(amount: number) {
  // Implement SushiSwap sell logic here
  const sushiswapRouter = new ethers.Contract(
    '0xd9e1cE17f2641F24aE83637ab66a2cca9C378B9F', // SushiSwap router address
    [
      'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    provider
  );

  const signer = provider.getSigner();
  const tx = await sushiswapRouter.connect(signer).swapExactTokensForETH(
    ethers.utils.parseUnits(amount.toString(), 'ether'), // Amount in
    0, // Amount out minimum (set to 0 for simplicity, should be calculated)
    [CQT_ADDRESS, MATIC_ADDRESS], // Path
    '0xCc380FD8bfbdF0c020de64075b86C84c2BB0AE79', // Recipient
    Math.floor(Date.now() / 1000) + 60 * 20 // Deadline
  );

  await tx.wait();
  return tx; // Return the transaction result
}

async function buyOnBalancer(amount: number) {
  // Implement Balancer buy logic here
  // Example:
  // Use Balancer SDK or direct contract interactions
}

async function sellOnBalancer(amount: number) {
  // Implement Balancer sell logic here
  // Example:
  // Use Balancer SDK or direct contract interactions
}
