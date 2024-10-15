import axios from "axios";

function getAll(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/nhom-doi-tuong?id=${id}`);
}
function save(nhomDoiTuong) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/nhom-doi-tuong", nhomDoiTuong);
};
function update(nhomDoiTuong) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/nhom-doi-tuong", nhomDoiTuong);
};
function deleteByID(nhomDoiTuong) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/nhom-doi-tuong?id=" + nhomDoiTuong);
};
const nhomDoiTuongService = {
  getAll,
  save,
  update,
  deleteByID,
};
export default nhomDoiTuongService;