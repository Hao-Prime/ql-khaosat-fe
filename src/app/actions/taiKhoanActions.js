import axios from "axios";

const setTaiKhoanNguoiDung = (taKhoan) => {
    localStorage.setItem('tkv', taKhoan?.access_token)
    localStorage.setItem('tkfv', taKhoan?.refresh_token)
    axios.defaults.headers.common.Authorization = `Bearer ${taKhoan?.access_token}`
    return {
        type: "SET_USER",
        payload: taKhoan?.nguoiDung,
    };
}

export default {
    setTaiKhoanNguoiDung,
};
