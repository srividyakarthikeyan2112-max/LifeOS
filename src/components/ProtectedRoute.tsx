import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
