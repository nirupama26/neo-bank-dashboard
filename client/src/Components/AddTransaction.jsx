import React, { useState } from "react";

const AddTransaction = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Credit");

const handleAdd = () => {
  if (amount && !isNaN(amount)) {
    const parsedAmount = parseInt(amount);
    onAdd(type, parsedAmount);   // 🔥 Sends value to Dashboard
    setAmount("");
  }
};


  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Add Transaction</h3>
      <div className="flex gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option>Credit</option>
          <option>Debit</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="border px-2 py-1 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
