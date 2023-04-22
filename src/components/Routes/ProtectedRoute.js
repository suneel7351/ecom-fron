import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Component, isAdmin }) {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/login");
      }
      if (isAdmin === true && user && user.role !== "admin") {
        return navigate("/login");
      }
    }
  }, [loading, isAdmin, isAuthenticated, navigate,user]);
  return <Component />;
}

export default ProtectedRoute;
