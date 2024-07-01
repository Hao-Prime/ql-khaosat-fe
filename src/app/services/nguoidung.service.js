import axios from "axios";

function getCanBo(search, idDonVi, page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user/can-bo?search=${search}&idDonVi=${idDonVi}&page=${page}&size=${size}`);
};
function getNguoiKhaoSat(search, idDonVi, page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user/ng-khao-sat?search=${search}&idDonVi=${idDonVi}&page=${page}&size=${size}`);
};
function getSelectVaiTro() {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user/select-vaitro`);
};
function saveNgKhaoSat(nguoiDung) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/ng-khao-sat", nguoiDung);
};
function saveCanBo(nguoiDung) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user/can-bo", nguoiDung);
};
function deleteByID(nguoiDung) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/user?id=" + nguoiDung);
};
function getSelect(search) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user/select?key=${search}`);
};
const nguoiDungService = {
  getCanBo,
  getNguoiKhaoSat,
  getSelectVaiTro,
  getSelect,
  saveNgKhaoSat,
  saveCanBo,
  deleteByID
};
export default nguoiDungService;