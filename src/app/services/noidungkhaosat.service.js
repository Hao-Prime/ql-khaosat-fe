import axios from "axios";

function getAll(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/noi-dung-khao-sat?id=${id}`);
}
function save(noiDungKhaoSat) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/noi-dung-khao-sat", noiDungKhaoSat);
};
function update(noiDungKhaoSat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/noi-dung-khao-sat", noiDungKhaoSat);
};
function deleteByID(noiDungKhaoSat) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/noi-dung-khao-sat?id=" + noiDungKhaoSat);
};
const noiDungKhaoSatService = {
  getAll,
  save,
  update,
  deleteByID,
};
export default noiDungKhaoSatService;