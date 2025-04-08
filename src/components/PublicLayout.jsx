import React from "react";
import { Navigate, Outlet } from "react-router";
export default function PublicLayout() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return <Navigate to="/about" />;
  }
  return <Outlet />;
}
