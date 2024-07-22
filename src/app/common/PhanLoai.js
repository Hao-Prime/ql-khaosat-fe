function getSelectTrangThaiXuLy() {
    return [
        { value: 1, label: "Chưa tiếp nhận" },
        { value: 2, label: "Chưa lên lịch" },
        { value: 3, label: "Đang trễ hạn" },
        { value: 4, label: "Đang xử lý còn hạn" },
        { value: 5, label: "Đã xử lý Đúng hạn" },
        { value: 6, label: "Đã xử lý trễ hạn" }

    ]
}
function getSelectPhanLoaiYeuCau() {
    return [
        { value: 1, label: "Chưa tiếp nhận" },
        { value: 2, label: "Đang xử lý" },
        { value: 3, label: "Đã xử lý" },
        { value: 4, label: "Không thay đổi yêu cầu" }

    ]
}
function getPhanLoaiYeuCau(key) {
    switch (key) {
        case 1:
            return "Chưa tiếp nhận"
        case 2:
            return "Đang thực hiện"
        case 3:
            return "Đã hoàn thành"
        default:
            return "Chưa phân phụ trách"
    }
}
function getSelectQuyenYCHT() {
    return [
        { value: 1, label: "Quyền ADMIN" },
        { value: 2, label: "Trưởng phòng CNTT" },
        { value: 3, label: "Nhân viên CNTT" },
        { value: 4, label: "Trưởng phòng KHTCDN" },
        { value: 5, label: "Nhân viên KHTCDN" },
        { value: 6, label: "Phòng bán hàng" },
        { value: 7, label: "Khách hàng" },

    ]
}
function getSelectQuyenYCHTThapHon() {
    return [
        { value: 3, label: "Nhân viên CNTT" },
        { value: 5, label: "Nhân viên KHTCDN" },
        { value: 6, label: "Phòng bán hàng" },
        { value: 7, label: "Khách hàng" },

    ]
}
function getQuyenYCHT(key) {
    switch (key) {
        case 1:
            return "Quyền ADMIN"
        case 2:
            return "Trưởng phòng CNTT"
        case 3:
            return "Nhân viên CNTT"
        case 4:
            return "Trưởng phòng KHTCDN"
        case 5:
            return "Nhân viên KHTCDN"
        case 6:
            return "Phòng bán hàng"
        case 7:
            return "Khách hàng"

        default:
            return "Chưa chọn"
    }
}
export default {
    getSelectPhanLoaiYeuCau,
    getPhanLoaiYeuCau,
    getQuyenYCHT,
    getSelectQuyenYCHT,
    getSelectQuyenYCHTThapHon,
    getSelectTrangThaiXuLy
}