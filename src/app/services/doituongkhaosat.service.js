import axios from "axios";

function getAll(id, idNhomKhaoSat) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/doi-tuong-khao-sat?id=${id}&idNhomKhaoSat=${idNhomKhaoSat}`);
}
function save(doiTuongKhaoSat) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong-khao-sat", doiTuongKhaoSat);
};
function update(doiTuongKhaoSat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong-khao-sat", doiTuongKhaoSat);
};
function deleteByID(doiTuongKhaoSat) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/doi-tuong-khao-sat?id=" + doiTuongKhaoSat);
};
const doiTuongKhaoSatService = {
  getAll,
  save,
  update,
  deleteByID,
};
export default doiTuongKhaoSatService;