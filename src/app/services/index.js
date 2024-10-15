
import TaiKhoanService from "./taikhoan.service"
import formService from "./form.service"
import donViService from "./donvi.service"
import nguoiDungService from "./nguoidung.service"
import cuocKhaoSatService from "./cuockhaosat.service"
import vaiTroService from "./vaitro.service"
import cauHinhService from "./cauhinh.service"
import dashboardService from "./dashboard.service"
import doiTuongService from "./doituong.service"
import doiTuongKhaoSatService from "./doituongkhaosat.service"
import noiDungKhaoSatService from "./noidungkhaosat.service"
import nhomDoiTuongService from "./nhomdoituong.service"
function getNhomDoiTuongService() { return nhomDoiTuongService }
function getNoiDungKhaoSatService() { return noiDungKhaoSatService }
function getDoiTuongKhaoSatService() { return doiTuongKhaoSatService }
function getDoiTuongService() { return doiTuongService }
function getDashboardService() { return dashboardService }
function getCauHinhService() { return cauHinhService }
function getVaiTroService() { return vaiTroService }
function getCuocKhaoSatService() { return cuocKhaoSatService }
function getNguoiDungService() { return nguoiDungService }
function getDonViService() { return donViService }
function getFormService() { return formService }
function getTaiKhoanService() { return TaiKhoanService }
const Services = {
    getNhomDoiTuongService,
    getNoiDungKhaoSatService,
    getDoiTuongKhaoSatService,
    getDashboardService,
    getCauHinhService,
    getVaiTroService,
    getTaiKhoanService,
    getFormService,
    getDonViService,
    getCuocKhaoSatService,
    getNguoiDungService,
    getDoiTuongService
}

export default Services