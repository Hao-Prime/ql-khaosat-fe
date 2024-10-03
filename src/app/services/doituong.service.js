import axios from "axios";

function getAll(id, key, search) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/doi-tuong?id=${id}&key=${key}&search=${search}`);
}
function save(doiTuong) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong", doiTuong);
};
function update(doiTuong) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong", doiTuong);
};
function deleteByID(doiTuong) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong?id=" + doiTuong);
};
const doiTuongService = {
  getAll,
  save,
  update,
  deleteByID,
};
export default doiTuongService;