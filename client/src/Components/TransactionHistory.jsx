import React from "react";

const TransactionHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  const credits = transactions.filter(txn => txn.type === "credit");
  const debits = transactions.filter(txn => txn.type === "debit");

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Transaction History</h2>

      <h3 className="font-semibold">Credit:</h3>
      {credits.map((txn, idx) => (
        <div key={idx}>
          <p>₹{txn.amount}</p>
          <p className="text-sm text-gray-500">
            {new Date(txn.timestamp).toLocaleString()}
          </p>
        </div>
      ))}

      <h3 className="font-semibold mt-4">Debit:</h3>
      {debits.map((txn, idx) => (
        <div key={idx}>
          <p>₹{txn.amount}</p>
          <p className="text-sm text-gray-500">
            {new Date(txn.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;

