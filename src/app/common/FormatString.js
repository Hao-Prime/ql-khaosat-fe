function chiVietHoaChuCaiDau(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function removeDTOFromKeys(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            // Đệ quy nếu trường là một đối tượng
            obj[key] = removeDTOFromKeys(obj[key]);
        }
        if (key.endsWith('DTO')) {
            // Kiểm tra nếu tên trường kết thúc bằng 'DTO'
            const newKey = key.slice(0, -3); // Xóa 'DTO' khỏi tên trường
            obj[newKey] = obj[key]; // Tạo một trường mới với tên mới
            delete obj[key]; // Xóa trường cũ
        }
    }
    return obj;
}
function getMaKhaoSatTheoDonVi(cuocKhaoSat, idDonVi) {
    let ma = cuocKhaoSat?.maKhaoSat
    cuocKhaoSat?.listDonViPhuTrach?.forEach(element => {
        if (element?.donVi?._id == idDonVi) {
            ma = element?.maKhaoSat
        }
    });
    return ma
}
function convertSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0B';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(2);
    
    return `${size} ${sizes[i]}`;
}

function getTrangThaiKhaoSatTheoDonVi(cuocKhaoSat, idDonVi) {
    let ma = ""
    cuocKhaoSat?.listDonViPhuTrach?.forEach(element => {

        if (element?.donVi?._id == idDonVi && element?.trangThai == 1) {
            ma = element?.donVi?._id
        }
    });
    return ma
}
export default {
    getMaKhaoSatTheoDonVi,
    chiVietHoaChuCaiDau,
    removeDTOFromKeys,
    getTrangThaiKhaoSatTheoDonVi,
    convertSize
}