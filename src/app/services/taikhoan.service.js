import axios from "axios";

function getMe() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/user/me");
};

function doiMatKhau(nhanVien) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/change-pas", nhanVien);
};
const dangNhap = ({ tenDangNhap, matKhau }) => {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/login", {
    "tenDangNhap": tenDangNhap,
    "matKhau": matKhau
  })
};
const dangXuat = () => {
  localStorage.removeItem('tkv')
  localStorage.removeItem('tkfv')
  axios.defaults.headers.common["Authorization"] = ""
  window.location.href = "/"
  // return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/login", {
  //   "tenDangNhap": tenDangNhap,
  //   "matKhau": matKhau
  // })
};
const refreshToken = async (token) => {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/refresh-token", token)
};
const taiKhoanService = {
  dangNhap,
  dangXuat,
  getMe,
  doiMatKhau,
  refreshToken
};
export default taiKhoanService;