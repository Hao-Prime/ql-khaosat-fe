import axios from "axios";

function getAll(search, page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user?search=${search}&page=${page}&size=${size}`);
};
function getSelectVaiTro() {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/user/select-vaitro`);
};
function save(nguoiDung) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/user", nguoiDung);
};
function update(nguoiDung) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/user", nguoiDung);
};
function deleteByID(nguoiDung) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/user?id=" + nguoiDung);
};
const nguoiDungService = {
  getAll,
  getSelectVaiTro,
  save,
  update,
  deleteByID
};
export default nguoiDungService;