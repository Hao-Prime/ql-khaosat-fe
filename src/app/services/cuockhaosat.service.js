import axios from "axios";

function getAll(filter) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat?isShare=${filter?.isShare || 0}&search=${filter?.search || ""}&trangThaiXL=${filter?.trangThai || ""}${filter?.idKhaoSat ? "&idKhaoSat=" + filter?.idKhaoSat : ""}`);
};
function getFormDetail(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/detail?idKhaoSat=${id}`);
};
function getFormDetailSubmit(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/detail-submit?idKhaoSat=${id}`);
};
function getAllResult(idbieumau, idDonVi, page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/result?idKhaoSat=${idbieumau}&idDonVi=${idDonVi}&page=${page}&size=${size}`);
};

function taoMoiKhaoSat(khaoSat) {
  return axios.post(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/create`, khaoSat);
};
function capNhatKhaoSat(khaoSat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form`, khaoSat);
};
function capNhatQuyenKhaoSat(taiKhoan) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-role`, taiKhoan);
};
function phanDonViPhuTrach(idkhaoSat, listDonVi) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/phan-phu-trach?idKhaoSat=${idkhaoSat}`, listDonVi);
};
function capNhatThongTinKhaoSat(khaoSat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-info`, khaoSat);
};
function xoaKhaoSat(id) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/delete?idKhaoSat=${id}`);
};
function guiKetQua(rs) {
  return axios.post(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/send-result`, rs);
};
function thongKeKetQua(id) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/thongke-selectbox?idKhaoSat=${id}`);
};
function thongKeSoLuongKhaoSatKhaoSatTheoThoiGian(id, ngayBD, ngayKT) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/thongke-truycap?idKhaoSat=${id}&ngayBD=${ngayBD}&ngayKT=${ngayKT}`);
};
function getListNguoiDungTheoDonVICuaToi(search, page, size) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/nguoidung?search=${search}&page=${page}&size=${size}`);
};
function getListDonViPhuTrach(idKhaoSat) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/don-vi-phu-trach?idKhaoSat=${idKhaoSat}`);
};
const cuocKhaoSatService = {
  getListDonViPhuTrach,
  getListNguoiDungTheoDonVICuaToi,
  getAllResult,
  getAll,
  getFormDetail,
  capNhatThongTinKhaoSat,
  capNhatQuyenKhaoSat,
  capNhatKhaoSat, phanDonViPhuTrach,
  taoMoiKhaoSat,
  xoaKhaoSat,
  guiKetQua,
  thongKeKetQua,
  thongKeSoLuongKhaoSatKhaoSatTheoThoiGian,
  getFormDetailSubmit
};
export default cuocKhaoSatService;