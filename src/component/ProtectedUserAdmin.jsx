import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedUserAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Verificamos si el usuario existe y si tiene el rol de administrador
  const isAuthorized = user && user.isAdmin;

  return isAuthorized ? children : <Navigate to="/404" replace />;
};
