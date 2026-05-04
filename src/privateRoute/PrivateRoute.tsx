import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import React from "react";


type Props = {children: React.ReactNode}

export default function PrivateRoute({children}: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated){
    return children;
  }
  else {
    return <Navigate to="/login" />
  }
}
