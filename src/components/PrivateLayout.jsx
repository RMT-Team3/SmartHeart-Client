import React from "react";
import { Navigate, Outlet } from "react-router";
export default function PrivateLayout() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
