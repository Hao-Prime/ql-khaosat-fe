// import components

import HomePage from "app/views/pages/homepage/HomePage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import '../index.css';
import "app/assets/css/rsuite-lib.css"
// import "./assets/css/custom-rsuite.css"
import "app/assets/css/style.css"
import "app/assets/css/custom-antd.css"
import MyListFormPage from "./views/pages/mylistformpage/MyListFormPage";
import LoginPage from "./views/pages/loginpage/LoginPage";
import FormDetailPage from "./views/pages/mylistformpage/FormDetailPage";
import ViewForm from "./views/pages/mylistformpage/components/ViewForm";
const App = () => {

  return (
    <Routes>

      <Route exact path="/khao-sat-bieu-mau" element={<ViewForm />}></Route>
      <Route exact path="/danh-sach-bieu-mau" element={<MyListFormPage />}></Route>
      <Route exact path="/dang-nhap" element={<LoginPage />}></Route>
      <Route exact path="/chi-tiet-bieu-mau" element={<FormDetailPage />}></Route>
      <Route exact path="/" element={<HomePage />}></Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={true}>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
};

export default App;
const ProtectedRoute = ({ user, redirectPath = '/landing' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
