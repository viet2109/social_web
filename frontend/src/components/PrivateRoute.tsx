import { Navigate } from "react-router-dom";

interface Props {
  isAuthenticated?: boolean;
  children?: React.ReactNode;
}

function PrivateRoute(props: Props) {
  const { isAuthenticated, children } = props;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
