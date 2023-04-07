import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import swal from "sweetalert";

function RequiredAuth() {
  const user = localStorage.getItem("authState");
  useEffect(() => {
    if (!user) swal("Please Login to continue!");
  },[]);
  return (
  user ? <Outlet /> : <Navigate to='/' replace />
  );
}

export default RequiredAuth;
