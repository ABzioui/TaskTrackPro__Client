import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AuthenticatedRoute;
