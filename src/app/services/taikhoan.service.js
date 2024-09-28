import axios from "axios";

function getMe() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/user/me");
};

function doiMatKhau(nhanVien) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/change-pas", nhanVien);
};
const dangNhap = (user) => {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/login", user)
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
function getThongBaoCuaToi(page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user/thong-bao?page=${page}&size=${size}`);
};
function daDocThongBao(thongBaos) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/user/thong-bao`, thongBaos);
};
function xoaThongBao(thongBaoIds) {
  const params = new URLSearchParams({ thongBaoIds: thongBaoIds.join(',') });
  return axios.delete(`${process.env.REACT_APP_URL_SERVER}/be-form/user/thong-bao?${params.toString()}`);
}
function xoaTatCaTB() {
  return axios.delete(process.env.REACT_APP_URL_SERVER + `/be-form/user/thong-bao/all`);
};
const taiKhoanService = {
  dangNhap,
  dangXuat,
  getMe,
  doiMatKhau,
  refreshToken,
  getThongBaoCuaToi,
  xoaThongBao,
  daDocThongBao,
  xoaTatCaTB
};
export default taiKhoanService;