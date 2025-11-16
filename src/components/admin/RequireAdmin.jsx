import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAdminAuthed = () => {
  try {
    return localStorage.getItem("adminAuthed") === "true";
  } catch {
    return false;
  }
};

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
};

export default RequireAdmin;
