
function format(loai) {
    switch (loai) {
        case 1: return <label className="badge badge-danger">Đang trễ hạn</label>
        case 2: return <label className="badge badge-info">Đang làm</label>
        case 3: return <label className="badge badge-dark">Chưa lên lịch</label>
        case 4: return <label className="badge badge-success">Đúng thực hiện</label>
        case 5: return <label className="badge badge-warning">Đã trễ hạn</label>
        default: return <label className="badge badge-dark">Không xác định</label>
    }
}

export default {
    format
}