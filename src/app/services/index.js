
import TaiKhoanService from "./taikhoan.service"
import formService from "./form.service"
import donViService from "./donvi.service"
import nguoiDungService from "./nguoidung.service"
import cuocKhaoSatService from "./cuockhaosat.service"
function getCuocKhaoSatService() { return cuocKhaoSatService }
function getNguoiDungService() { return nguoiDungService }
function getDonViService() { return donViService }
function getFormService() { return formService }
function getTaiKhoanService() { return TaiKhoanService }
const Services = {
    getTaiKhoanService,
    getFormService,
    getDonViService,
    getCuocKhaoSatService,
    getNguoiDungService
}

export default Services