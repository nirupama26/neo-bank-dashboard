import React from "react";

const AccountSummary = ({ name, accountType, balance }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">Account Summary</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Account Type:</strong> {accountType}</p>
      <p><strong>Balance:</strong> ₹{balance}</p>
    </div>
  );
};


export default AccountSummary;
