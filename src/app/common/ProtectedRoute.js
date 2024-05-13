import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, redirectPath = '/dang-nhap', children }) => {
  console.log(user);
  if (user?.listVaiTro?.includes(role) || user?.listVaiTro?.includes("admin")) {
    return children;
  } return <Navigate to={redirectPath} replace />;

};
export default ProtectedRoute;