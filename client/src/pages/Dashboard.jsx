import React, { useState, useEffect } from "react";
import AccountSummary from "../Components/AccountSummary";
import TransactionHistory from "../Components/TransactionHistory";
import AddTransaction from "../Components/AddTransaction";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);

  // ✅ Fetch data once when component mounts
  useEffect(() => {
    fetchAccountData();
    fetchTransactions();
  }, []);

  // 🔁 Fetch balance and email
  const fetchAccountData = () => {
    axiosInstance
      .get("/account")
      .then((res) => {
        setEmail(res.data.email);
        setBalance(res.data.balance);
        setName(res.data.name);
      })
      .catch((err) => {
        console.error("Error fetching account data:", err);
        alert("Unauthorized or session expired");
        logout();
        navigate("/");
      });
  };

  // 📥 Fetch all transactions from backend
  const fetchTransactions = () => {
    axiosInstance
      .get("/transactions")
      .then((res) => {
        setAllTransactions(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch transactions", err);
      });
  };

  // ➕ Add a new transaction
  const handleTransaction = async (type, amount) => {
    const parsedAmount = parseInt(amount);

    try {
      await axiosInstance.post("/transactions", {
        email,
        type: type.toLowerCase(),
        amount: parsedAmount,
      });

      alert(`${type} of ₹${parsedAmount} added!`);
      fetchAccountData();      // 🔁 Update balance
      fetchTransactions();     // 🔁 Refresh transaction list
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Welcome to NeoBank Dashboard!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountSummary name={name} accountType="Savings" balance={balance} />
        <TransactionHistory transactions={allTransactions} /> {/* ✅ use DB-driven data */}
        <AddTransaction onAdd={handleTransaction} />
      </div>
    </div>
  );
};

export default Dashboard;
