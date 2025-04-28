
import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedUserAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

 
  const isAuthorized = user?.username === "Chisato";

  return isAuthorized ? children : <Navigate to="/404" replace />;
};
