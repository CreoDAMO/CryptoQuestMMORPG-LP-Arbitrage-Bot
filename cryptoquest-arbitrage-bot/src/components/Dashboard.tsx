import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [pairData, setPairData] = useState<{ midPrice: string, inversePrice: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPairData = async () => {
      try {
        const response = await fetch('/api/getPairData');
        const data = await response.json();
        setPairData(data);
      } catch (err) {
        setError('Failed to fetch pair data');
      } finally {
        setLoading(false);
      }
    };

    fetchPairData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="neumorphic p-6 animate-float">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Smart Contract Addresses</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>CQT:</strong> 0x94ef57abfBff1AD70bD00a921e1d2437f31C1665</li>
          <li><strong>MATIC:</strong> 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270</li>
          <li><strong>AAVE Pool Address Provider:</strong> 0x24a0e79e7ab9f4f4f2de9bafbf45303b093a7d34</li>
          <li><strong>Uniswap Pool:</strong> 0x0b3CD8a843DEFDF01564a0342a89ba06c4fC9394</li>
        </ul>
      </div>

      {pairData && (
        <div className="neumorphic p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Token Price Chart</h2>
          <p>1 MATIC = {pairData.midPrice} CQT</p>
          <p>1 CQT = {pairData.inversePrice} MATIC</p>
          <canvas id="priceChart"></canvas>
        </div>
      )}

      <div className="mt-12 neumorphic p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-300">
          The CryptoQuest LP Arbitrage Bot leverages flash loans and automated market making to execute profitable trades across different liquidity pools. By utilizing the AAVE lending pool and Uniswap, our bot can identify and capitalize on price discrepancies between CQT and MATIC tokens.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
