import axios from "axios";

function getBanThan() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/user/me");
};

function doiMatKhau(nhanVien) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/change-pass", nhanVien);
};
const dangNhap = ({ tenDangNhap, matKhau }) => {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/login", {
    "tenDangNhap": tenDangNhap,
    "matKhau": matKhau
  })
};
const refreshToken = async (token) => {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/refresh-token", token)
};
const taiKhoanService = {
  dangNhap,
  getBanThan,
  doiMatKhau,
  refreshToken
};
export default taiKhoanService;