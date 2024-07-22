import FormatDate from "app/common/FormatDate";
import axios from "axios";

function getSLHetHan(idDonVi) {
  return axios.get(process.env.REACT_APP_URL_SERVER + "/be-form/dashboard/het-han?idDonVi=" + idDonVi);
};
function getSoLuongPhuTrach(idDonVi, ngayBD, ngayKT) {
  let ngayBD1 = FormatDate.setTimeZoneUTC7(ngayBD);
  let ngayKT1 = FormatDate.setTimeZoneUTC7(ngayKT);
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/dashboard/tong-khao-sat?idDonVi=${idDonVi}&ngayBD=${ngayBD1}&ngayKT=${ngayKT1}`);
};
function chiTieuTungDonVi(idDonVi, ngayBD, ngayKT) {
  let ngayBD1 = FormatDate.setTimeZoneUTC7(ngayBD);
  let ngayKT1 = FormatDate.setTimeZoneUTC7(ngayKT);
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/dashboard/chi-tieu-don-vi?idDonVi=${idDonVi}&ngayBD=${ngayBD1}&ngayKT=${ngayKT1}`);
};

function thongTinTruyCap(ngayBD, ngayKT, idDonVi) {
  let ngayBD1 = FormatDate.setTimeZoneUTC7(ngayBD);
  let ngayKT1 = FormatDate.setTimeZoneUTC7(ngayKT);
  return axios.get(process.env.REACT_APP_URL_SERVER + `/be-form/dashboard/truy-cap?ngayBD=${ngayBD1}&ngayKT=${ngayKT1}&idDonVi=${idDonVi}`);
};

const dashboardService = {
  getSLHetHan,
  getSoLuongPhuTrach,
  chiTieuTungDonVi,
  thongTinTruyCap
};
export default dashboardService;