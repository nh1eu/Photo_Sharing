import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  console.log("authttt", authLoading, isAuthenticated);

  // if (authLoading)
  //   return (
  //     <div className="loading-container">
  //       Loading...
  //     </div>
  //   );

  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
