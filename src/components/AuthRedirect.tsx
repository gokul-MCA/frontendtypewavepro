import { ReactElement } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ whenAuthenticated, whenUnauthenticated }: {
  whenAuthenticated: string;
  whenUnauthenticated: ReactElement;
}) => {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (user) return <Navigate to={whenAuthenticated} replace />;

  return whenUnauthenticated;
};

export default AuthRedirect;
