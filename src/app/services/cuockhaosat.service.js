import axios from "axios";

function getKeHoach(idKeHoach, trangThai) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/ke-hoach?`+(idKeHoach?(`idKeHoach=` + idKeHoach ):"")+ `&trangThai=` + trangThai);
};
function taoKeHoach(keHoach) {
  return axios.post(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/ke-hoach`, keHoach);
};
function capNhatKeHoach(keHoach) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/ke-hoach`, keHoach);
};
function xoaKeHoach(id) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/ke-hoach?idKeHoach=${id}`);
};
function themFileKeHoach(files) {
  return axios.post(process.env.REACT_APP_URL_SERVER + "/be-form/khao-sat/ke-hoach/themfiles", files);
};
function xoaFileKeHoach(idFile, idKH) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/khao-sat/ke-hoach/xoafile?idFile=" + idFile + "&idKH=" + idKH);
};

function ganBieuMauKhaoSat(idBieuMau, idKhaoSat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/ke-hoach?idBieuMau=${idBieuMau}&idKhaoSat=${idKhaoSat}`);
};

function getAll(filter) {
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat?isShare=${filter?.isShare || 0}&search=${filter?.search || ""}&trangThaiXL=${filter?.trangThai || ""}${filter?.idKhaoSat ? "&idKhaoSat=" + filter?.idKhaoSat : ""}${filter?.idKeHoach ? "&idKeHoach=" + filter?.idKeHoach : ""}`);
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
function tiepNhanKhaoSat(idDonVi, idKhaoSat) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form/tiep-nhan?idKhaoSat=${idKhaoSat}&idDonVi=${idDonVi}`);
};
function hoanThanhKhaoSat(idKhaoSat, idDonVi) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form/hoan-thanh?idKhaoSat=${idKhaoSat}&idDonVi=${idDonVi}`);
};
function chuaHoanThanhKhaoSat(idKhaoSat, idDonViKHT) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form/khong-hoan-thanh?idKhaoSat=${idKhaoSat}&idDonViKHT=${idDonViKHT}`);
};
function capNhatKetQuaKS(idKhaoSat, listKQ) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form/update-result?idKhaoSat=${idKhaoSat}`, listKQ);
};
function xoaKetQua(idKetQuaKhaoSat, idKhaoSat) {
  return axios.delete(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form/update-result?idKetQuaKhaoSat=${idKetQuaKhaoSat}&idKhaoSat=${idKhaoSat}`);
};
function capNhatBieuMauKhaoSat(khaoSat) {//gán biểu mẫu
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/update-form-bm`, khaoSat);
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
function phanPhuTrachDoiTuong(donViPT) {
  return axios.put(process.env.REACT_APP_URL_SERVER + `/be-form/khao-sat/phan-phu-trach-dt`, donViPT);
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
  capNhatBieuMauKhaoSat,
  taoMoiKhaoSat,
  xoaKhaoSat,
  guiKetQua,
  thongKeKetQua,
  thongKeSoLuongKhaoSatKhaoSatTheoThoiGian,
  getFormDetailSubmit,
  tiepNhanKhaoSat,
  hoanThanhKhaoSat,
  capNhatKetQuaKS,
  chuaHoanThanhKhaoSat,
  xoaKetQua,
  ganBieuMauKhaoSat,
  xoaKeHoach,
  capNhatKeHoach,
  taoKeHoach,
  getKeHoach,
  themFileKeHoach,
  xoaFileKeHoach,
  phanPhuTrachDoiTuong
};
export default cuocKhaoSatService;