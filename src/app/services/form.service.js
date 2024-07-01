import axios from "axios";

function getMyListForm(filter) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/form?isShare=${filter?.isShare || 0}&search=${filter?.search || ""}`);
};
function getFormDetail(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/form/detail?idBieuMau=${id}`);
};
function taoMoiBieuMau(bieuMau) {
  return axios.post(process.env.REACT_APP_URL_SERVER + `/be-form/form/create`, bieuMau);
};
function luuAnhBia(file, id) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/form/public/update-backround", file);
};
function capNhatBieuMau(bieuMau) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/form/update-form`, bieuMau);
};
function capNhatQuyenBieuMau(bieuMau) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/form/update-role`, bieuMau);
};
function capNhatThongTinBieuMau(bieuMau) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/form/update-info`, bieuMau);
};
function xoaBieuMau(id) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + `/be-form/form/delete?idBieuMau=${id}`);
};


const formService = {
  getMyListForm,
  getFormDetail,
  capNhatThongTinBieuMau,
  capNhatQuyenBieuMau,
  capNhatBieuMau,
  luuAnhBia,
  taoMoiBieuMau,
  xoaBieuMau
};
export default formService;