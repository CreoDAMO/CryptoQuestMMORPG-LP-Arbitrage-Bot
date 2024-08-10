// src/components/TransactionHistory.tsx

import React, { useEffect, useState } from 'react';

const TransactionHistory = ({ address }: { address: string }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch(`/api/fetchTransactionHistory?toAddress=${address}`);
        const data = await response.json();
        setTransactions(data.transfers);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [address]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transaction History for {address}</h1>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <p>From: {tx.from}</p>
            <p>To: {tx.to}</p>
            <p>Token ID: {tx.tokenId}</p>
            <p>Category: {tx.category}</p>
            <p>Transaction Hash: {tx.hash}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
