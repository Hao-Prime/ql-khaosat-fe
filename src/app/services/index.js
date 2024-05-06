
import TaiKhoanService from "./taikhoan.service"
import formService from "./form.service"
function getFormService() { return formService }
function getTaiKhoanService() { return TaiKhoanService }
const Services = {
    getTaiKhoanService,
    getFormService
}

export default Services