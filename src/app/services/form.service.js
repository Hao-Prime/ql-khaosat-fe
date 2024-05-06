import axios from "axios";

function getMyListForm(filter) {
  console.log(filter);
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/form/my?isShare=${filter?.isShare || 0}&search=${filter?.search || ""}`);
};

function getFormDetail(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/form/detail?idBieuMau=${id}`);
};
function taoMoiBieuMau(bieuMau) {
  return axios.post(process.env.REACT_APP_URL_SERVER + `/be-form/form/create`, bieuMau);
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
function guiKetQua(rs) {
  return axios.post(process.env.REACT_APP_URL_SERVER + `/be-form/form/send-result`, rs);
};

const formService = {
  getMyListForm,
  getFormDetail,
  capNhatThongTinBieuMau,
  capNhatQuyenBieuMau,
  capNhatBieuMau,
  taoMoiBieuMau,
  xoaBieuMau,
  guiKetQua

};
export default formService;