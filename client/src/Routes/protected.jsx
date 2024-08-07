import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
