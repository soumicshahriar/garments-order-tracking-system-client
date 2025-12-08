import React from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../../pages/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      ></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
