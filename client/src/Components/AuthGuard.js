import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

const token = localStorage.getItem("token"); // 🔐 Get JWT from storage

  // 🔐 If not logged in OR token missing, redirect to login
  if (!isLoggedIn || !token) {	
    return <Navigate to="/" replace />;
  }
   
  // ✅ Allow access to protected route
  return children;  // Allow access if logged in
};

export default AuthGuard;
