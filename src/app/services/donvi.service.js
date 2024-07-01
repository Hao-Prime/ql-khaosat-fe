import axios from "axios";

function getAll(search) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/don-vi?search=" + search);
};

function save(donVi) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/don-vi", donVi);
};
function update(donVi) {
  return axios.put(process.env.REACT_APP_URL_SERVER + "/be-form/don-vi", donVi);
};
function deleteByID(donVi) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + "/be-form/don-vi?id=" + donVi);
};
function getSelectDonViThuocTrucTiep() {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/don-vi/select/truc-tiep`);
};
function getSelectToanBoDonViDuoi() {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/don-vi/select/gian-tiep`);
};
const donViService = {
  getSelectDonViThuocTrucTiep,
  getSelectToanBoDonViDuoi,
  getAll,
  save,
  update,
  deleteByID
};
export default donViService;