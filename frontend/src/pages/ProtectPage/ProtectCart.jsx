import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const ProtectCart = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectCart;
