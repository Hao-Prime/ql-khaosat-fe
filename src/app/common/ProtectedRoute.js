import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ user, role, redirectPath = '/dang-nhap', children }) => {
  if (user?.listVaiTro?.includes(role) || user?.listVaiTro?.includes("admin")) {
    return children;
  } return <Navigate to={redirectPath + "?url=" + window.location.pathname} replace />;

};
export default ProtectedRoute;