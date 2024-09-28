import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const getTimeStatus = (ngayBD, ngayKT, ngayBDTT, ngayKTTT) => {
    const now = ngayKTTT ? dayjs(ngayKTTT) : dayjs();
    const endTime = dayjs(ngayKT);

    if (!endTime.isValid()) return null;

    const diff = endTime.diff(now);

    if (diff >= 0) {
        const daysRemaining = Math.floor(dayjs.duration(diff).asDays());

        if (daysRemaining >= 1) {
            if (ngayKTTT) {
                return <span className="mb-0 green">Đúng hẹn trước {daysRemaining} ngày</span>;
            } else {
                return <span className="mb-0 green">Còn {daysRemaining} ngày</span>;
            }

        }
        const hoursRemaining = Math.floor(dayjs.duration(diff).asHours());
        if (ngayKTTT) {
            return <span className="mb-0 green">Đúng hẹn trước {hoursRemaining} giờ</span>;
        } else {
            return <span className="mb-0 yellow-l">Còn {hoursRemaining} giờ</span>
        }
    } else {
        const overdueDiff = Math.abs(diff);
        const overdueDays = Math.floor(dayjs.duration(overdueDiff).asDays());

        if (overdueDays >= 1) {
            return <span className="mb-0 red">{ngayKTTT?"Đã trễ":"Đang trễ"} {overdueDays} ngày</span>;
        }

        const overdueHours = Math.floor(dayjs.duration(overdueDiff).asHours());
        return <span className="mb-0 red">{ngayKTTT?"Đã trễ":"Đang trễ"} {overdueHours} giờ</span>;
    }
};
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
    getSelectTrangThaiXuLy,
    getTimeStatus
}