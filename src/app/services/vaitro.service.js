import axios from "axios";

function getAll() {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/vai-tro");
}
function save(vaiTro) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/vai-tro", vaiTro);
};
function update(listVaiTro) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/vai-tro", listVaiTro);
};
function deleteByID(vaiTro) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/vai-tro?id=" + vaiTro);
};
const vaiTroService = {
  getAll,
  save,
  update,
  deleteByID
};
export default vaiTroService;