import axios from "axios";

function getAll(id, key, search) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/doi-tuong-thuc-hien?id=${id}&key=${key}&search=${search}`);
}
function save(doiTuong) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong-thuc-hien", doiTuong);
};
function update(doiTuong) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong-thuc-hien", doiTuong);
};
function deleteByID(doiTuong) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong-thuc-hien?id=" + doiTuong);
};
const doiTuongService = {
  getAll,
  save,
  update,
  deleteByID,
};
export default doiTuongService;