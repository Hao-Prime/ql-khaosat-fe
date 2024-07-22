import axios from "axios";

function getAll(id, key, search) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/cau-hinh?id=${id}&key=${key}&search=${search}`);
}
function getLogs(search, page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/cau-hinh/logs?search=${search}&page=${page}&size=${size}`);
}
function save(cauHinh) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/cau-hinh", cauHinh);
};
function update(cauHinh) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/cau-hinh", cauHinh);
};
function deleteByID(cauHinh) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/cau-hinh?id=" + cauHinh);
};
const cauHinhService = {
  getAll,
  save,
  update,
  deleteByID,
  getLogs
};
export default cauHinhService;