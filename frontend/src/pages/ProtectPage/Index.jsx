import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const Index = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default Index;
