// import getCookie from './getCookie';
import { Modal } from "antd";
import axios from "axios";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function initInterceptor() {
    // Đặt token
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("tkv");
    // Lỗi 401 và 403
    axios.interceptors.response.use(
        (res) => {
            if (201 === res.status) {
                // toast.success('Thao tác thành công', {
                //     position: "bottom-right",
                //     autoClose: 4000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });

            }
            return res;
        },
        (error) => {
            // console.log(error);
            if (400 === error.response.status) {
                if ((axios.defaults.headers.common['Authorization']) != undefined) {
                    // console.log(error.response);
                    // toast.error((error.response?.data?.noiDung ? error.response?.data?.noiDung : error.response?.data ? error.response?.data : 'Đã có lỗi xẩy ra'), {
                    //     position: "top-right",
                    //     autoClose: 4000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    // });
                    Modal.error({
                        title: error.response?.data?.message ? error.response?.data?.message : error.response?.data ? error.response?.data : 'Đã có lỗi xẩy ra',
                    });
                }


            }


            if (401 === error.response.status) {

                // alert("Lỗi xác thực, cần đăng nhập lại");
                if (localStorage.getItem("tkv")) {
                    Modal.error({
                        title: 'Phiên đăng nhập đã hết hạn',
                        content: 'Bạn cần đăng nhập lại',
                        onOk() {
                            window.location.href = "/dang-nhap";
                        }
                    });
                    localStorage.removeItem('tkv')
                } else {

                }

            } if (403 === error.response.status) {

                // toast.warn('Bạn không có quyên truy cập', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });
                Modal.error({
                    title: 'Bạn không có quyền truy cập' + error.response.config.url,
                    content: 'Vui lòng liên hệ quản trị viên để được cấp quyền',
                    onOk() {
                        window.location.href = "/";
                    }
                });
                // alert("Bạn không có quyền truy cập " + error.response.config.url)
                // 
                return Promise.reject(error);
            } else if (413 === error.response.status) {
                Modal.error({
                    title: 'Tổng file cần lưu không được quá 25MB',
                    content: 'Vui lòng liên hệ quản trị viên để được hỗ trợ',
                    onOk() {
                        window.location.href = "/";
                    }
                });
                // toast.error('Tổng file cần lưu không được quá 10MB', {
                //     position: "top-right",
                //     autoClose: 4000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });
            } else {
                // alert("Không thành công");
                return Promise.reject(error);
            }
        }
    );
}


export default {
    initInterceptor

};