import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, getUser, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user && userInfo.role === "admin") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
