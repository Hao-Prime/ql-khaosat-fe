import initService from "../services/init.service";
import phongBanService from "../services/phongban.admin.service";
import FormatDate from "./FormatDate";
function chuyenDonVi() {
    let rs = []
    donVi.forEach((dv, i) => {
        let e = { "tenDonVi": dv.UnitName }
        rs.push(e)
        // initService.getDonViAdminService().them(e)
    });
    console.log(rs);
}
function themPhongBan() {
    let rs = []
    donViRS.forEach((dv, i) => {
        let e = { boPhan: "Thực thi", tenPhongBan: dv.tenDonVi, donVi: dv }
        rs.push(e)
        phongBanService.them(e)
    });
    console.log(rs);
}
function chuyenDichVu() {
    let rs = []
    dataDV.forEach((dv, i) => {
        let e = { "ma": i + 1 + "", "ten": dv.TenDichVu }
        rs.push(e)
        // initService.getDichVuService().them(e)
    });
    console.log(rs);
}
function chuyenLoaiYC() {
}

function chuyenPhuTrach() {
    let listDonVi = []
    donViRS.forEach(dv => {
        donVi.forEach(dv2 => {
            if (dv.tenDonVi == dv2.UnitName) {
                listDonVi.push({ ...dv, ID: dv2.Id })
            }
        });
    });
    let listDichVu = []
    dataDV.forEach(dv => {
        dataDVRS.forEach(dv2 => {
            if (dv.TenDichVu == dv2.ten) {
                listDichVu.push({ ...dv2, ID: dv.Id })
            }
        });
    });
    // console.log(listDonVi);
    // console.log(listDichVu);
    let listNhanVien = []
    let index = 0
    dataNVRS.forEach(nv => {
        dataNV3.forEach(nv2 => {
            if (nv.hoTen == nv2.TenNhanSu) {
                listNhanVien.push({ ID: nv2.Id, ...nv })
            }
        });
    });
    let rs = []
    phuTrach.forEach(pt => {
        let e = { dichVu: null, donVi: null, nhanVien: null }
        listDichVu.forEach(dichvu => {
            if (dichvu.ID == pt.DichVuId) {
                e.dichVu = { _id: dichvu._id }
            }
        });
        listDonVi.forEach(dv => {
            if (dv.ID == pt.UnitId) {
                e.donVi = { _id: dv._id }
            }
        });
        listNhanVien.forEach(nv => {
            if (nv.ID == pt.NhanSuId) {
                e.nhanVien = { _id: nv._id }
            }
        });
        initService.getPhuTrachService().them(e)
        rs.push(e)
    });
    console.log(rs);
    console.log(phuTrach);

}
function chuyenNhanVien() {
    let x1 = { "_id": "628db19ac4f90a3bd16097a6", "hoTen": "Lê Minh Toàn", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0856699248", "email": "toanlm.lan@vnpt.vn", "idTelegram": "5020921665", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    let x2 = {
        "Id": 1077,
        "UId": null,
        "UserName": "lmtoan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lê Minh Toàn",
        "Phone": "0856699248",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    }
    let x3 = {
        "Id": 1,
        "TenNhanSu": "Lê Minh Toàn",
        "NguoiTaoId": 5,
        "NgayTao": "10/1/2022 16:33:54.887",
        "NgayCapNhat": "25/3/2022 14:53:36.813",
        "UnitId": 1,
        "UserId": 1077,
        "DichVuId": null,
        "AdminDichVuId": 6,
        "isActive": "1"
    }
    let nvmau = {
        "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png",
        "diaChi": "ưqewqeqweqw",
        "email": "vahaxo.lan@vnpt.vn",
        "gioiTinh": "Nam",
        "hoTen": "x",
        "listNQ": [
            {
                "tenQuyen": "ROLE_NHANVIEN"
            }
        ],
        "matKhau": "Vnpt@147",
        "ngaySinh": "1995-01-15T07:00:00.000Z",
        "phongBan": {
            "_id": "62689079d79bdd11acd17bc9"
        },
        "soCMND": "111222333",
        "soDienThoai": "0123456788"
    }
    let rs = []
    let rs2 = []
    let listPB = []
    phongBanRS.forEach(pb => {
        donVi.forEach(dv => {
            if (dv.UnitName == pb.tenPhongBan) {
                listPB.push({ ...pb, dvID: dv.Id })
            }
        });
    });

    dataNV2.forEach(nv2 => {

        dataNV3.forEach(nv3 => {
            if (nv2.Id == nv3.UserId) {
                nv2.hoTen = nv3.TenNhanSu
            }
            if (nv2.hoTen == undefined) {
                nv2.hoTen = nv2.FullName
            }
        });
        let exist = false
        dataNV1.forEach(nv1 => {
            if (nv2.hoTen == nv1.hoTen) {
                exist = true
            }
        });
        if (!exist) {
            let pbrs = null
            listPB.forEach(pb => {
                if (nv2.UnitId == pb.dvID) {
                    pbrs = pb

                }
            });
            let nvxxx = {
                "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png",
                "diaChi": "",
                "email": nv2.UserName.replace(".lan", "").replace("@vnpt.vn", "") + ".lan@vnpt.vn",
                "gioiTinh": "Nam",
                "hoTen": nv2.hoTen,
                "listNQ": [
                    {
                        "tenQuyen": "ROLE_YCHT"
                    }
                ],
                "matKhau": "Vnpt@147",
                "ngaySinh": "1995-01-01T07:00:00.000Z",
                "phongBan": pbrs == null ? null : { _id: pbrs._id },
                "soCMND": "",
                "soDienThoai": nv2.Phone == null ? randomPhoneNumber() : nv2.Phone
            }
            initService.getNhanVienAdminService().them(nvxxx)
            rs.push(nvxxx)
        } else {
            rs2.push(nv2)
        }
    });
    console.log(rs);
    console.log(rs2);
}
function randomPhoneNumber() {
    let phoneNumber = '0';
    for (let i = 0; i < 9; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
}
function chuyenYC() {
    let listNV = []
    dataNVRS.forEach(nv => {
        dataNV3.forEach(nv1 => {
            if (nv.hoTen == nv1.TenNhanSu) {
                listNV.push({ ...nv, ID: nv1.Id, UID: nv1.UserId })
            }
        });
    });
    let listDonVi = []
    donViRS.forEach(dv => {
        donVi.forEach(dv2 => {
            if (dv.tenDonVi == dv2.UnitName) {
                listDonVi.push({ ...dv, ID: dv2.Id })
            }
        });
    });
    let listPhongBanx = []
    listPhongBan.forEach(pb => {
        donVi.forEach(dv2 => {
            if (pb.tenPhongBan == dv2.UnitName) {
                listPhongBanx.push({ ...pb, ID: dv2.Id })
            }
        });
    });
    let listDichVu = []
    dataDVRS.forEach(dv2 => {
        dataDV.forEach(dv => {
            if (dv.TenDichVu == dv2.ten) {
                listDichVu.push({ ...dv2, ID: dv.Id })
            }
        });
    });
    let listLoaiYC = []
    listLYC.forEach(lyc => {
        let listx = []
        listLYCMau.forEach(lyc2 => {
            if (lyc.ten == lyc2.TenLYC) {
                listx.push(lyc2.Id)
            }
        });
        listLoaiYC.push({ ...lyc, listx: listx })
    });
    console.log(listLoaiYC);
    let rs = []
    listYC.forEach(yc => {
        let e = {
            "ma": yc.Id + "",
            "trangThai": getTrangThai(yc.StateId),
            "ten": yc.TenYeuCau,
            "ngayTao": FormatDate.setTimeZoneUTC7(new Date(yc.NgayTao).toISOString()),
            "nguoiTao": getTheoUID(yc.NguoiTaoId, listNV),
            "phanLoaiNguoiTao": 0,
            "maST": yc.MaSoThue,
            "urlJira": yc.JiraDaGui,
            "ngayBD": FormatDate.setTimeZoneUTC7(new Date(yc.NgayYeuCau).toISOString()),
            "ngayKT": yc.ThoiHan != null ? FormatDate.setTimeZoneUTC7(new Date(yc.ThoiHan).toISOString()) : new Date(),
            "ngayBDTT": yc.NgayYeuCau != null ? FormatDate.setTimeZoneUTC7((new Date(yc.NgayYeuCau).toISOString())) : null,
            "ngayKTTT": yc.NgayXuLy == null ? null : FormatDate.setTimeZoneUTC7(new Date(yc.NgayXuLy).toISOString()),
            "loaiYeuCau": yc.LoaiYeuCauId == null ? { "_id": "63e3218bba0846713f6c3481" } : getLYC(yc.LoaiYeuCauId, listLoaiYC),
            "noiDungYC": yc.NoiDung.replaceAll("/images/", "/api/public/showimage?filename="),
            "listFileYC": chuyenDataStringToListFile(yc.FileUpload),
            "ketQua": yc.NoiDungXuLy,
            "listFileKQ": null,
            "commentJira": yc.CommentJira,
            "dichVu": getTheoID(yc.DichVuId, listDichVu),
            "donVi": getTheoID(yc.UnitId, listDonVi),
            "donViYeuCau": getTheoID(yc.DonViYeuCauId, listDonVi),
            "nguoiThucHien": getTheoID(yc.NhanSuId, listNV),
            "nguoiGiamSat": getTheoID(yc.NguoiGiamSatId, listNV),
            "lichSu": null,
            "lichLamViec": null,
            "phongBan": getTheoUID(yc.NguoiTaoId, listNV)?.phongBan,
            "phanLoaiNguoiTao": yc.NguoiTaoId == 1163 ? 1 : null,
        }
        if (e.trangThai > 2 && e.ngayKTTT == null) {
            e.ngayKTTT = e.ngayKT
        }
        rs.push(e)
    });
    initService.getYeuCauService().themNhieu(rs)
    console.log(rs);
}
function getTheoID(id, listObject) {
    let rs = null
    listObject.forEach(ob => {
        if (ob.ID == id) {
            rs = ob;
            return
        }
    });
    if (rs == null) {
        return null
    } else return { "_id": rs._id }

}
function getTheoUID(id, listObject) {
    let rs = null
    listObject.forEach(ob => {
        if (ob.UID == id) {
            rs = ob;
            return
        }
    });
    if (rs == null) {
        return { _id: "622974232d99fb75611aae26", "phongBan": { "_id": "62d677c2e5d5e75076eae858" } }
    } else return { "_id": rs._id, phongBan: rs.phongBan }

}
function getLYC(id, list) {
    let rs = null
    list.forEach(ob => {
        if (ob.listx.includes(id)) {
            rs = ob;
            return
        }
    });
    if (rs == null) {
        return { "_id": "63e3218bba0846713f6c3481" }

    } else return { "_id": rs._id }

}
function getTrangThai(trangThai) {
    switch (trangThai) {
        case 10:
            return 1
        case 7:
            return 2
        case 6:
            return 3
        case 9:
            return 4
        default:
            break;
    }
}
function chuyenDataStringToListFile(value) {
    let listFileYC = JSON.parse(value).map(fileName => {
        return {
            "_id": fileName,
            "tenFile": fileName,
            "url": `/api/public/load-file/${fileName}`
        }
    });
    return listFileYC
}
function chuyenKeHoach(value) {
    let listDuAn=[]
    let ngayHT=FormatDate.getNgayGioHienTai()
    congViecKeHoach?.forEach(e => {
        // if(e.ngayBDCTCV==undefined)console.log(e);
        if(e.tenDA){
            let duAn={
                "tenDA":e.tenDA,
                "donVi":{_id:'62afea2221c49c5dfa964577'},
                "phongBan": {_id:"62689061d79bdd11acd17bc8"},
                "viecTuTao":true,
                "listCTCV":[],
                "phanLoai": "Dự Án"
            }
            listDuAn.push(duAn)
        }else {
            
            let listLLV1=[]
            e.NV1.split(", ").forEach(idNV => {
                let llv={
                    "nhanVien": {_id: idNV},
                    "ngayBDLLV": e.ngayBDCTCV+"T00:00",
                    "ngayKTLLV": e.ngayKTCTCV+"T23:59",
                    "listTrachNhiem": [{ "_id": "62490540cc74ff68986fd0af" }, { "_id": "62490540cc74ff68986fd0b0" }]
                }
                listLLV1.push(llv)
            });
            let listLLV2=[]
            if(e.NV2){
                e.NV2.split(", ").forEach(idNV => {
                    let llv={
                        "nhanVien": {_id: idNV},
                        "listTrachNhiem": [{ "_id": "62490540cc74ff68986fd0af" }]
                    }
                    listLLV2.push(llv)
                });
            }
          
            listLLV1.concat(listLLV2)
            let ctcv={
                "tenCTCV":e.tenCTCV,
                "congViec":{_id: "62d61088aa09ba5644fade19"},
                "ngayBDCTCV": e.ngayBDCTCV+"T00:00",
                "ngayKTCTCV": e.ngayKTCTCV+"T23:59",
                "phongBan": {_id:"62689061d79bdd11acd17bc8"},
                "listLLV":listLLV1
            }
            listDuAn[listDuAn.length-1].listCTCV.push(ctcv)
        }
    });
    let rs=[]
    listDuAn.forEach(e => {
        let ngayBDDA="2025-03-01T00:00"
        let ngayKTDA="2021-03-01T00:00"
        e?.listCTCV.forEach(ctcv => {
            if(ctcv.ngayBDCTCV<ngayBDDA){
                ngayBDDA=ctcv.ngayBDCTCV
            }
            if(ctcv.ngayKTCTCV>ngayKTDA){
                ngayKTDA=ctcv.ngayKTCTCV
            }
        })
        let daRS={
            ...e,
            ngayKhoiTao:ngayHT,"ngayBDDATT":ngayBDDA, "ngayBDDA":ngayBDDA,"ngayKTDA":ngayKTDA,trangThaiTiepNhan: "Đã tiếp nhận"
        }
        rs.push(daRS)
    })
    return rs;
}
export default {
    chuyenKeHoach,
    themPhongBan,
    chuyenDichVu,
    chuyenLoaiYC,
    chuyenYC,
    chuyenPhuTrach,
    chuyenNhanVien,
    chuyenDonVi
}
//Huy 628db169c4f90a3bd16097a1
//Triết 628db139c4f90a3bd160979c
//Toàn 628db19ac4f90a3bd16097a6
//Hào 62ce4a59aca616363c282b83
//Đạt 62e7356ab64a1d54bcfc49b4
// "donVi":'62afea2221c49c5dfa964577',
// "phongBan": "62689061d79bdd11acd17bc8",
// "viecTuTao":true,
const congViecKeHoach =
[
    {
     "tenDA": "PM Quản lý tiến độ dự án"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenDA": "Website bán hàng tiếp hợp VNPT Pay"
    },
    {
     "tenCTCV": "Phân tích chức năng, quy trình nghiệp vụ",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Xây dựng CSDL, thiết kế giao diện",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Tích hợp API VNPT Pay",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Test hệ thống",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Hiệu chỉnh, hoàn thiện website",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenDA": "App doanh nghiệp"
    },
    {
     "tenCTCV": "Phân tích chức năng",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Xây dựng CSDL, thiết kế giao diện Web cấu hình",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Xây dựng Mobile kết nối Web cấu hình",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Bổ sung các tính năng:",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": " Trang tin tức",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": " Trang giới thiệu",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": " Trang gửi thông tin liên hệ",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": " Trang thông báo",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": " Trang đăng nhập",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db169c4f90a3bd16097a1"
    },
    {
     "tenDA": "HT Quản lý hạ tầng, công trình công cộng"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "628db139c4f90a3bd160979c"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "628db139c4f90a3bd160979c"
    },
    {
     "tenDA": "HT Quản lý Thương mại dịch vụ"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-04-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenDA": "PM Quản lý Ô nhiễm tiếng ồn"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-04-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenDA": "PM Quản lý bức xạ"
    },
    {
     "tenCTCV": "Xúc tiến ph\/h thực hiện thủ tục",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenDA": "PM quản lý vùng\/cây trồng nông nghiệp"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-04-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenDA": "App Hội doanh nhân trẻ tỉnh Long An"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenDA": "PM Sổ tay đảng viên"
    },
    {
     "tenCTCV": "Thu thập tài liệu, nghiên cứu nghiệp vụ",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenCTCV": "Xây dựng Prototype",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenCTCV": "Trình bày, lấy ý kiến và hoàn thiện",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenCTCV": "Phát triển phần mềm",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenDA": "Hợp nhất nâng cấp PM YCHT & QLCV"
    },
    {
     "tenCTCV": "Hoàn chỉnh hệ thống hiện có ",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenCTCV": "Tập huấn, đưa vào sử dụng",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenDA": "PM Quản lý tập KHCTDN"
    },
    {
     "tenCTCV": "Hoàn thiện hệ thống",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenCTCV": "Tập huấn, đưa vào sử dụng",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "62ce4a59aca616363c282b83"
    },
    {
     "tenDA": "PM Quản lý dự án (Nội bộ)"
    },
    {
     "tenCTCV": "Phát triển hệ thống",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenCTCV": "Tập huấn, đưa vào sử dụng",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenDA": "PM Quản lý Quân nhân"
    },
    {
     "tenCTCV": "Thu thập yêu cầu khách hàng",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Phân tích, lên chức năng, báo giá",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Ph\/h báo giá",
     "NV1": "628db0ebc4f90a3bd1609796",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
    },
    {
     "tenCTCV": "Xây dựng phần mềm",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-05-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenDA": "Nâng cấp HS Kiểm định và tích hợp QL Xăng dầu"
    },
    {
     "tenCTCV": "Thu thập yêu cầu khách hàng",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Phân tích, lên chức năng, báo giáo",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Xây dựng phần mềm",
     "ngayBDCTCV": "2023-04-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenDA": "Callbot tư vấn TTHC cho Tân Trụ"
    },
    {
     "tenCTCV": "Tìm hiểu giải pháp",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-01-31",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Xây dựng báo giá",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b5"
    },
    {
     "tenCTCV": "Thu thập thông tin từ khách hàng",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "62e7356ab64a1d54bcfc49b6"
    },
    {
     "tenCTCV": "Khai báo khởi tạo dịch vụ",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "62e7356ab64a1d54bcfc49b7"
    },
    {
     "tenCTCV": "Triển khai theo nhu cầu khách hàng",
     "ngayBDCTCV": "2023-04-01",
     "ngayKTCTCV": "2023-06-30",
     "NV1": "62e7356ab64a1d54bcfc49b8"
    },
    {
     "tenDA": "Hệ thống iGate v1"
    },
    {
     "tenCTCV": "Hổ trợ kỹ thuật cổng DVC trong quá trình vận hành",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db169c4f90a3bd16097a1"
    },
    {
     "tenDA": "Hệ thống eCabinet"
    },
    {
     "tenCTCV": "Hổ trợ kỹ thuật trong quá trình vận hành",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "628db139c4f90a3bd160979c"
    },
    {
     "tenCTCV": "Hổ trợ Outsource các chức VNPT IT c628db169c4f90a3bd16097a1ển giao",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "628db139c4f90a3bd160979c"
    },
    {
     "tenDA": "Hệ thống IOC"
    },
    {
     "tenCTCV": "Hoàn thiện chức năng theo yêu cầu của Sở TTTT",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Hổ trợ kỹ thuật trong quá trình vận hành",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db169c4f90a3bd16097a1",
     "NV2": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenDA": "Hệ thống 1022"
    },
    {
     "tenCTCV": "Hoàn thiện chức năng theo yêu cầu của Sở TTTT",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Hổ trợ kỹ thuật trong quá trình vận hành",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenDA": "App Long An Số"
    },
    {
     "tenCTCV": "Hoàn thiện chức năng theo yêu cầu của Sở TTTT",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Hổ trợ kỹ thuật trong quá trình vận hành",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db139c4f90a3bd160979c",
     "NV2": "62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenDA": "Website doanh nghiệp"
    },
    {
     "tenCTCV": "Hổ trợ kỹ thuật các website đang vận hành",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenCTCV": "Thực hiện các hợp đồng mới từ P.KHTCDN",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db19ac4f90a3bd16097a6"
    },
    {
     "tenDA": "Đào tạo K8s"
    },
    {
     "tenCTCV": "Liên hệ TGG xác định lịch học tập",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-02-28",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Cử nhân sự tham gia học tập",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db0ebc4f90a3bd1609797"
    },
    {
     "tenDA": "Hệ thống iGate v2"
    },
    {
     "tenCTCV": "Đào tạo tại IT5",
     "ngayBDCTCV": "2023-02-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Tìm hiểu hệ thống iGate v2 trên site demo",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Khởi tạo hệ thống demo iGate ",
     "ngayBDCTCV": "2023-03-01",
     "ngayKTCTCV": "2023-03-31",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Tìm hiểu, code demo các chức năng trên iGate v2",
     "ngayBDCTCV": "2023-04-01",
     "ngayKTCTCV": "2023-04-30",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Bổ sung các API đã tham khảo từ Bình Dương tích hợp vào hệ thống",
     "ngayBDCTCV": "2023-05-01",
     "ngayKTCTCV": "2023-05-31",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Test kết nối thử với hệ thống 1 của ICT",
     "ngayBDCTCV": "2023-06-01",
     "ngayKTCTCV": "2023-07-31",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Hiệu chỉnh, hoàn thiện tích hợp",
     "ngayBDCTCV": "2023-08-01",
     "ngayKTCTCV": "2023-09-30",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Triển khai thử nghiệm",
     "ngayBDCTCV": "2023-10-01",
     "ngayKTCTCV": "2023-11-30",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenCTCV": "Triển khai chính thức",
     "ngayBDCTCV": "2023-12-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db169c4f90a3bd16097a1, 62e7356ab64a1d54bcfc49b4"
    },
    {
     "tenDA": "Nghiên cứu SPDV - Nắm bắt được hết SPDV từ đó đề xuất cho các đơn vị liên quan"
    },
    {
     "tenCTCV": "Nghiên cứu văn bản, hồ sơ, chính sách, kế hoạch của khối GOV, Y tế, Giáo dục, DN,...",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Thu thập danh sách SPDV (Tập đoàn, VTT T\/TP tự phát triển, hợp tác...)",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Xây dựng danh mục sản phẩm đáp ứng\/khả thi có thể triển khai",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Tìm hiểu nắm bắt SPDV",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    },
    {
     "tenCTCV": "Đề xuất, giới thiệu triển khai",
     "ngayBDCTCV": "2023-01-01",
     "ngayKTCTCV": "2023-12-31",
     "NV1": "628db0ebc4f90a3bd1609796"
    }
   ]
const YCmau = {
    "_id": "63e2fb6842bbd35f9cbbccd7",
    "ma": 1, "trangThai": 1,
    "ten": "CNTT-Thông báo v/v nộp cuốn báo cáo KLTN-HK1-(2022-2023)",
    "ngayTao": "2023-02-08T08:31:09.117",
    "nguoiTao": { "_id": "622974232d99fb75611aae26" },
    "phanLoaiNguoiTao": 0,
    "maST": "122121",
    "urlJira": null,
    "ngayBD": null,
    "ngayKT": "2023-02-24T01:30:00",
    "ngayBDTT": null,
    "ngayKTTT": null,
    "loaiYeuCau": { "_id": "63e1f6c8f0665b4751892e96" },
    "noiDungYC": "",
    "listFileYC": [],
    "ketQua": null,
    "listFileKQ": null,
    "commentJira": null,
    "dichVu": { "_id": "63e1aa7c8da55e5eb0c447ae" },
    "donVi": { "_id": "62afea2221c49c5dfa964577" },
    "nguoiThucHien": { "_id": "62ce4a59aca616363c282b83" },
    "nguoiGiamSat": null,
    "lichSu": null,
    "lichLamViec": null
}
// nhớ chuyển /api/public/showimage?filename=-> /api/public/showimage?filename=
const listYC = []
const listLYCMau = [
    { "Id": 1, "TenLYC": "Tạo mới hệ thống" },
    { "Id": 2, "TenLYC": "Hỗ trợ kĩ thuật", "DichVuId": 6 },
    { "Id": 3, "TenLYC": "Thay đổi hệ thống", "DichVuId": 6 },
    { "Id": 4, "TenLYC": "Sự cố vận hành", "DichVuId": 6 },
    { "Id": 9, "TenLYC": "Tạo mới hệ thống", "DichVuId": 6 },
    { "Id": 10, "TenLYC": "Hỗ trợ kĩ thuật", "DichVuId": 6 },
    { "Id": 11, "TenLYC": "Thay đổi hệ thống", "DichVuId": 6 },
    { "Id": 12, "TenLYC": "Sự cố vận hành", "DichVuId": 6 },
    { "Id": 13, "TenLYC": "Hỗ trợ kĩ thuật", "DichVuId": 7, "DichVu": { "Id": 7, "TenDichVu": "HIS", "IsActive": true, "DonVi": [], "LoaiYeuCauNew": [] } },
    { "Id": 14, "TenLYC": "Hỗ trợ kĩ thuật", "DichVuId": 8, "DichVu": { "Id": 8, "TenDichVu": "HSSK", "IsActive": true, "DonVi": [], "LoaiYeuCauNew": [] } },
    { "Id": 15, "TenLYC": "Hỗ trợ kĩ thuật", "DichVuId": 11, "DichVu": { "Id": 11, "TenDichVu": "Biên lai điện tử", "IsActive": true, "DonVi": [], "LoaiYeuCauNew": [] } },
    { "Id": 16, "TenLYC": "Chỉnh sửa hệ thống", "DichVuId": 24, "DichVu": { "Id": 24, "TenDichVu": "Web Hosting/Domain", "IsActive": true, "DonVi": [], "LoaiYeuCauNew": [] } },
    { "Id": 17, "TenLYC": "Hỗ trợ kĩ thuật", "DichVuId": 25, "DichVu": { "Id": 25, "TenDichVu": "VNPT Pharmacy", "IsActive": true, "DonVi": [], "LoaiYeuCauNew": [] } }
]
const listLYC = [{ "_id": "63e1f6bff0665b4751892e94", "ten": "Tạo mới hệ thống", "moTa": "" }, { "_id": "63e1f6c8f0665b4751892e96", "ten": "Hỗ trợ kĩ thuật", "moTa": "" }, { "_id": "63e1f6d0f0665b4751892e98", "ten": "Thay đổi hệ thống", "moTa": null }, { "_id": "63e1f6d6f0665b4751892e9a", "ten": "Sự cố vận hành", "moTa": null }, { "_id": "63e1f6e3f0665b4751892e9c", "ten": "Chỉnh sửa hệ thống", "moTa": null }, { "_id": "63e3218bba0846713f6c3481", "ten": "Khác", "moTa": null }]
const phuTrach = [
    {
        "Id": 1,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 6
    },
    {
        "Id": 2,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 5
    },
    {
        "Id": 3,
        "DichVuId": 7,
        "NhanSuId": 12,
        "UnitId": 1
    },
    {
        "Id": 4,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 1
    },
    {
        "Id": 5,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 4
    },
    {
        "Id": 6,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 7
    },
    {
        "Id": 7,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 8
    },
    {
        "Id": 8,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 9
    },
    {
        "Id": 9,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 12
    },
    {
        "Id": 10,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 13
    },
    {
        "Id": 11,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 14
    },
    {
        "Id": 12,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 11
    },
    {
        "Id": 13,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 10
    },
    {
        "Id": 14,
        "DichVuId": 6,
        "NhanSuId": 8,
        "UnitId": 2
    },
    {
        "Id": 15,
        "DichVuId": 10,
        "NhanSuId": 13,
        "UnitId": 1
    },
    {
        "Id": 16,
        "DichVuId": 9,
        "NhanSuId": 5,
        "UnitId": 1
    },
    {
        "Id": 18,
        "DichVuId": 6,
        "NhanSuId": 69,
        "UnitId": 15
    },
    {
        "Id": 19,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 2
    },
    {
        "Id": 20,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 4
    },
    {
        "Id": 21,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 5
    },
    {
        "Id": 22,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 6
    },
    {
        "Id": 23,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 7
    },
    {
        "Id": 24,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 8
    },
    {
        "Id": 25,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 9
    },
    {
        "Id": 26,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 10
    },
    {
        "Id": 27,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 11
    },
    {
        "Id": 28,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 12
    },
    {
        "Id": 29,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 13
    },
    {
        "Id": 30,
        "DichVuId": 11,
        "NhanSuId": 8,
        "UnitId": 14
    },
    {
        "Id": 31,
        "DichVuId": 11,
        "NhanSuId": 69,
        "UnitId": 15
    },
    {
        "Id": 32,
        "DichVuId": 10,
        "NhanSuId": 13,
        "UnitId": 1
    },
    {
        "Id": 33,
        "DichVuId": 9,
        "NhanSuId": 9,
        "UnitId": 1
    },
    {
        "Id": 34,
        "DichVuId": 12,
        "NhanSuId": 9,
        "UnitId": 1
    },
    {
        "Id": 35,
        "DichVuId": 13,
        "NhanSuId": 9,
        "UnitId": 1
    },
    {
        "Id": 36,
        "DichVuId": 6,
        "NhanSuId": 72,
        "UnitId": 1
    },
    {
        "Id": 37,
        "DichVuId": 14,
        "NhanSuId": 9,
        "UnitId": 1
    },
    {
        "Id": 38,
        "DichVuId": 6,
        "NhanSuId": 1,
        "UnitId": 1
    },
    {
        "Id": 39,
        "DichVuId": 6,
        "NhanSuId": 11,
        "UnitId": 1
    },
    {
        "Id": 40,
        "DichVuId": 6,
        "NhanSuId": 4,
        "UnitId": 1
    },
    {
        "Id": 41,
        "DichVuId": 8,
        "NhanSuId": 12,
        "UnitId": 1
    },
    {
        "Id": 42,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 43,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 2
    },
    {
        "Id": 44,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 4
    },
    {
        "Id": 45,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 5
    },
    {
        "Id": 46,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 6
    },
    {
        "Id": 47,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 7
    },
    {
        "Id": 48,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 8
    },
    {
        "Id": 49,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 9
    },
    {
        "Id": 50,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 10
    },
    {
        "Id": 51,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 11
    },
    {
        "Id": 52,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 12
    },
    {
        "Id": 53,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 13
    },
    {
        "Id": 54,
        "DichVuId": 15,
        "NhanSuId": 66,
        "UnitId": 14
    },
    {
        "Id": 55,
        "DichVuId": 15,
        "NhanSuId": 1,
        "UnitId": 1
    },
    {
        "Id": 56,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 1
    },
    {
        "Id": 57,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 5
    },
    {
        "Id": 58,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 2
    },
    {
        "Id": 59,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 4
    },
    {
        "Id": 60,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 6
    },
    {
        "Id": 61,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 7
    },
    {
        "Id": 62,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 8
    },
    {
        "Id": 63,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 9
    },
    {
        "Id": 64,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 10
    },
    {
        "Id": 65,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 11
    },
    {
        "Id": 66,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 12
    },
    {
        "Id": 67,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 13
    },
    {
        "Id": 68,
        "DichVuId": 15,
        "NhanSuId": 8,
        "UnitId": 14
    },
    {
        "Id": 69,
        "DichVuId": 9,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 70,
        "DichVuId": 12,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 71,
        "DichVuId": 13,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 72,
        "DichVuId": 7,
        "NhanSuId": 13,
        "UnitId": 1
    },
    {
        "Id": 73,
        "DichVuId": 7,
        "NhanSuId": 11,
        "UnitId": 1
    },
    {
        "Id": 74,
        "DichVuId": 8,
        "NhanSuId": 13,
        "UnitId": 1
    },
    {
        "Id": 75,
        "DichVuId": 8,
        "NhanSuId": 11,
        "UnitId": 1
    },
    {
        "Id": 76,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 1
    },
    {
        "Id": 77,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 4
    },
    {
        "Id": 78,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 5
    },
    {
        "Id": 79,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 6
    },
    {
        "Id": 80,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 7
    },
    {
        "Id": 81,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 8
    },
    {
        "Id": 82,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 9
    },
    {
        "Id": 83,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 10
    },
    {
        "Id": 84,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 11
    },
    {
        "Id": 85,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 12
    },
    {
        "Id": 86,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 13
    },
    {
        "Id": 87,
        "DichVuId": 19,
        "NhanSuId": 8,
        "UnitId": 14
    },
    {
        "Id": 88,
        "DichVuId": 19,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 89,
        "DichVuId": 11,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 90,
        "DichVuId": 20,
        "NhanSuId": 91,
        "UnitId": 1
    },
    {
        "Id": 91,
        "DichVuId": 21,
        "NhanSuId": 91,
        "UnitId": 1
    },
    {
        "Id": 92,
        "DichVuId": 22,
        "NhanSuId": 92,
        "UnitId": 1
    },
    {
        "Id": 94,
        "DichVuId": 24,
        "NhanSuId": 20,
        "UnitId": 15
    },
    {
        "Id": 95,
        "DichVuId": 24,
        "NhanSuId": 1,
        "UnitId": 15
    },
    {
        "Id": 96,
        "DichVuId": 6,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 97,
        "DichVuId": 7,
        "NhanSuId": 66,
        "UnitId": 1
    },
    {
        "Id": 98,
        "DichVuId": 11,
        "NhanSuId": 31,
        "UnitId": 2
    },
    {
        "Id": 99,
        "DichVuId": 28,
        "NhanSuId": 33,
        "UnitId": 2
    },
    {
        "Id": 100,
        "DichVuId": 27,
        "NhanSuId": 31,
        "UnitId": 2
    },
    {
        "Id": 101,
        "DichVuId": 30,
        "NhanSuId": 33,
        "UnitId": 2
    },
    {
        "Id": 102,
        "DichVuId": 23,
        "NhanSuId": 20,
        "UnitId": 2
    },
    {
        "Id": 103,
        "DichVuId": 25,
        "NhanSuId": 20,
        "UnitId": 2
    },
    {
        "Id": 104,
        "DichVuId": 11,
        "NhanSuId": 1,
        "UnitId": 15
    },
    {
        "Id": 105,
        "DichVuId": 7,
        "NhanSuId": 12,
        "UnitId": 17
    }
]
const phuTrachRD = []

const dataDV = [
    {
        "Id": 6,
        "TenDichVu": "Hóa đơn điện tử",
        "IsActive": "1"
    },
    {
        "Id": 1,
        "TenDichVu": "Tất cả",
        "IsActive": "1"
    },
    {
        "Id": 7,
        "TenDichVu": "HIS",
        "IsActive": "1"
    },
    {
        "Id": 8,
        "TenDichVu": "HSSK",
        "IsActive": "1"
    },
    {
        "Id": 9,
        "TenDichVu": "IGATE",
        "IsActive": "1"
    },
    {
        "Id": 10,
        "TenDichVu": "Smartcity - LAN",
        "IsActive": "1"
    },
    {
        "Id": 11,
        "TenDichVu": "Biên lai điện tử",
        "IsActive": "1"
    },
    {
        "Id": 12,
        "TenDichVu": "VNPT-eCabinet",
        "IsActive": "1"
    },
    {
        "Id": 13,
        "TenDichVu": "LRIS",
        "IsActive": "1"
    },
    {
        "Id": 14,
        "TenDichVu": "Một cửa - ICT",
        "IsActive": "1"
    },
    {
        "Id": 15,
        "TenDichVu": "Hộ Kinh Doanh",
        "IsActive": "1"
    },
    {
        "Id": 19,
        "TenDichVu": "Chứng từ khấu trừ thuế TNCN",
        "IsActive": "1"
    },
    {
        "Id": 20,
        "TenDichVu": "1022",
        "IsActive": "1"
    },
    {
        "Id": 21,
        "TenDichVu": "Long An Số",
        "IsActive": "1"
    },
    {
        "Id": 22,
        "TenDichVu": "Phần mềm Quản Lý Công Việc",
        "IsActive": "1"
    },
    {
        "Id": 23,
        "TenDichVu": "VNPT-Tracking",
        "IsActive": "1"
    },
    {
        "Id": 24,
        "TenDichVu": "Web Hosting/Domain",
        "IsActive": "1"
    },
    {
        "Id": 25,
        "TenDichVu": "VNPT Pharmacy",
        "IsActive": "1"
    },
    {
        "Id": 26,
        "TenDichVu": "VNPT HMIS",
        "IsActive": "1"
    },
    {
        "Id": 27,
        "TenDichVu": "VNPT eTicket",
        "IsActive": "1"
    },
    {
        "Id": 28,
        "TenDichVu": "Bệnh án điện tử VNPT EMR",
        "IsActive": "1"
    },
    {
        "Id": 29,
        "TenDichVu": "VNPT-iGate",
        "IsActive": "1"
    },
    {
        "Id": 30,
        "TenDichVu": "VNPT LIS",
        "IsActive": "1"
    }]
const dataDVRS =
    [{
        "_id": "63e34dd85932766a934bb237",
        "ten": "Tất cả",
        "ma": "1"

    }, {
        "_id": "63e1aa7c8da55e5eb0c44799",
        "ten": "Hóa đơn điện tử",
        "ma": "1"
    }, {
        "_id": "63e1aa7c8da55e5eb0c4479b",
        "ten": "HIS",
        "ma": "2"
    }, {
        "_id": "63e1aa7c8da55e5eb0c4479c",
        "ten": "VNPT-eCabinet",
        "ma": "7"
    }, {
        "_id": "63e1aa7c8da55e5eb0c4479d",
        "ten": "IGATE",
        "ma": "4"
    }, {
        "_id": "63e1aa7c8da55e5eb0c4479f",
        "ten": "Biên lai điện tử",
        "ma": "6"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447a3",
        "ten": "HSSK",
        "ma": "3"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447a5",
        "ten": "LRIS",
        "ma": "8"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447a6",
        "ten": "Chứng từ khấu trừ thuế TNCN",
        "ma": "11"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447a7",
        "ten": "Hộ Kinh Doanh",
        "ma": "10"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447ab",
        "ten": "Smartcity - LAN",
        "ma": "5"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447ac",
        "ten": "Long An Số",
        "ma": "13"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447ae",
        "ten": "Phần mềm Quản Lý Công Việc",
        "ma": "14"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447b0",
        "ten": "1022",
        "ma": "12"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447b3",
        "ten": "Web Hosting/Domain",
        "ma": "16"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447b4",
        "ten": "VNPT-Tracking",
        "ma": "15"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447b6",
        "ten": "VNPT HMIS",
        "ma": "18"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447b8",
        "ten": "VNPT eTicket",
        "ma": "19"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447bb",
        "ten": "Bệnh án điện tử VNPT EMR",
        "ma": "20"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447bd",
        "ten": "VNPT LIS",
        "ma": "22"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447be",
        "ten": "VNPT-iGate",
        "ma": "21"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447c1",
        "ten": "VNPT Pharmacy",
        "ma": "17"
    }, {
        "_id": "63e1aa7c8da55e5eb0c447c3",
        "ten": "Một cửa - ICT",
        "ma": "9"
    }]
const donVi = [
    {
        "Id": 1,
        "UId": null,
        "UnitName": "Trung Tâm CNTT",
        "ParentId": null,
        "LinhVuc": null,
        "ChatId": null,
        "IsActive": "1"
    },
    {
        "Id": 2,
        "UId": null,
        "UnitName": "Phòng KHTCDN",
        "ParentId": null,
        "LinhVuc": null,
        "ChatId": null,
        "IsActive": "1"
    },
    {
        "Id": 3,
        "UId": null,
        "UnitName": "Phòng Bán Hàng",
        "ParentId": null,
        "LinhVuc": null,
        "ChatId": null,
        "IsActive": "1"
    },
    {
        "Id": 4,
        "UId": null,
        "UnitName": "PBH Thủ Thừa",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -698647017,
        "IsActive": "1"
    },
    {
        "Id": 5,
        "UId": null,
        "UnitName": "PBH Tân An",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -643747838,
        "IsActive": "1"
    },
    {
        "Id": 6,
        "UId": null,
        "UnitName": "PBH Tân Thạnh - Thạnh Hóa",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -747537492,
        "IsActive": "1"
    },
    {
        "Id": 7,
        "UId": null,
        "UnitName": "PBH Cần Giuộc",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -652373299,
        "IsActive": "1"
    },
    {
        "Id": 8,
        "UId": null,
        "UnitName": "PBH Đức Hòa",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -735849270,
        "IsActive": "1"
    },
    {
        "Id": 9,
        "UId": null,
        "UnitName": "PBH Đức Huệ",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -796965557,
        "IsActive": "1"
    },
    {
        "Id": 10,
        "UId": null,
        "UnitName": "PBH Cần Đước",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -635050119,
        "IsActive": "1"
    },
    {
        "Id": 11,
        "UId": null,
        "UnitName": "PBH Bến Lức",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -683516969,
        "IsActive": "1"
    },
    {
        "Id": 12,
        "UId": null,
        "UnitName": "PBH Kiến Tường - Mộc Hóa",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -776926492,
        "IsActive": "1"
    },
    {
        "Id": 13,
        "UId": null,
        "UnitName": "PBH Vĩnh Hưng - Tân Hưng",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -730449220,
        "IsActive": "1"
    },
    {
        "Id": 14,
        "UId": null,
        "UnitName": "PBH Châu Thành - Tân Trụ",
        "ParentId": 3,
        "LinhVuc": null,
        "ChatId": -731523397,
        "IsActive": "1"
    },
    {
        "Id": 15,
        "UId": null,
        "UnitName": "Phòng TT",
        "ParentId": null,
        "LinhVuc": null,
        "ChatId": null,
        "IsActive": "1"
    },
    {
        "Id": 16,
        "UId": null,
        "UnitName": "Khách Hàng",
        "ParentId": null,
        "LinhVuc": null,
        "ChatId": null,
        "IsActive": "1"
    },
    {
        "Id": 17,
        "UId": null,
        "UnitName": "TTYT",
        "ParentId": null,
        "LinhVuc": null,
        "ChatId": null,
        "IsActive": "1"
    }

]
const donViRS = [{ "_id": "62afea2221c49c5dfa964577", "tenDonVi": "Trung Tâm CNTT", "moTa": "Trung Tâm CNTT" }
    , { "_id": "63e1c04ef0665b4751892ca9", "tenDonVi": "Phòng Bán Hàng" }
    , { "_id": "63e1c04ef0665b4751892caa", "tenDonVi": "Phòng KHTCDN" }
    , { "_id": "63e1c04ef0665b4751892cab", "tenDonVi": "PBH Cần Đước" }
    , { "_id": "63e1c04ef0665b4751892cad", "tenDonVi": "PBH Thủ Thừa" }
    , { "_id": "63e1c04ef0665b4751892cae", "tenDonVi": "PBH Đức Huệ" }
    , { "_id": "63e1c04ef0665b4751892caf", "tenDonVi": "PBH Tân An" }
    , { "_id": "63e1c04ef0665b4751892cb0", "tenDonVi": "PBH Kiến Tường - Mộc Hóa" }
    , { "_id": "63e1c04ef0665b4751892cb2", "tenDonVi": "PBH Châu Thành - Tân Trụ" }
    , { "_id": "63e1c04ef0665b4751892cb1", "tenDonVi": "PBH Vĩnh Hưng - Tân Hưng" }
    , { "_id": "63e1c04ef0665b4751892cb3", "tenDonVi": "PBH Tân Thạnh - Thạnh Hóa" }
    , { "_id": "63e1c04ef0665b4751892cb4", "tenDonVi": "Phòng TT" }
    , { "_id": "63e1c04ef0665b4751892cb5", "tenDonVi": "PBH Bến Lức" }
    , { "_id": "63e1c04ef0665b4751892cb6", "tenDonVi": "Khách Hàng" }
    , { "_id": "63e1c04ef0665b4751892cb7", "tenDonVi": "TTYT" }
    , { "_id": "63e1c04ef0665b4751892cb8", "tenDonVi": "PBH Đức Hòa" }
    , { "_id": "63e1c04ef0665b4751892cb9", "tenDonVi": "PBH Cần Giuộc" }
]
const phongBanRS = [
    { "_id": "62689061d79bdd11acd17bc8", "tenPhongBan": "Phòng Giải pháp", "moTa": "Phòng Giải Pháp", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "62689079d79bdd11acd17bc9", "tenPhongBan": "Phòng Tổng hợp", "moTa": "Phòng Tổng Hơp", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "628db0721a606810dab290c0", "tenPhongBan": "Phòng Hệ thống", "moTa": "Phòng Hệ Thống", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "62946fb6afabe6756e6bc62b", "tenPhongBan": "Tổ Dự án", "moTa": "Tổ Dự án", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "62d677c2e5d5e75076eae858", "tenPhongBan": "Phòng Giám Đốc", "moTa": "", "boPhan": "Quản lý", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "636b53a3459651570535834d", "tenPhongBan": "Phòng PGĐ", "moTa": "Phòng Phó Giám Đốc", "boPhan": "Quản lý", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "63e1c717f0665b4751892ce2", "tenPhongBan": "Phòng Bán Hàng", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892ca9" }
    , { "_id": "63e1c717f0665b4751892ce1", "tenPhongBan": "PBH Kiến Tường - Mộc Hóa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb0" }
    , { "_id": "63e1c717f0665b4751892ce3", "tenPhongBan": "Trung tâm CNTT", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" }
    , { "_id": "63e1c717f0665b4751892ce4", "tenPhongBan": "PBH Vĩnh Hưng - Tân Hưng", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb1" }
    , { "_id": "63e1c717f0665b4751892ce5", "tenPhongBan": "PBH Châu Thành - Tân Trụ", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb2" }
    , { "_id": "63e1c717f0665b4751892ce6", "tenPhongBan": "PBH Bến Lức", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb5" }
    , { "_id": "63e1c718f0665b4751892ce8", "tenPhongBan": "Khách Hàng", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb6" }
    , { "_id": "63e1c718f0665b4751892ce7", "tenPhongBan": "Phòng KHTCDN", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892caa" }
    , { "_id": "63e1c718f0665b4751892ce9", "tenPhongBan": "TTYT", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb7" }
    , { "_id": "63e1c718f0665b4751892cea", "tenPhongBan": "Phòng TT", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb4" }
    , { "_id": "63e1c718f0665b4751892ceb", "tenPhongBan": "PBH Thủ Thừa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cad" }
    , { "_id": "63e1c718f0665b4751892cec", "tenPhongBan": "PBH Đức Hòa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb8" }
    , { "_id": "63e1c718f0665b4751892ced", "tenPhongBan": "PBH Tân Thạnh - Thạnh Hóa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb3" }
    , { "_id": "63e1c718f0665b4751892cee", "tenPhongBan": "PBH Đức Huệ", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cae" }
    , { "_id": "63e1c718f0665b4751892cef", "tenPhongBan": "PBH Cần Đước", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cab" }
    , { "_id": "63e1c718f0665b4751892cf0", "tenPhongBan": "PBH Cần Giuộc", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb9" }
    , { "_id": "63e1c718f0665b4751892cf1", "tenPhongBan": "PBH Tân An", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892caf" }

]

const dataNVRS = [
    , { "_id": "622974232d99fb75611aae26", "hoTen": "Quản trị viên", "anhDaiDien": "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/344/external-setting-user-interface-tanah-basah-glyph-tanah-basah.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "111222333444", "soDienThoai": "0123456789", "email": "quantri.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$g2UaRz2IMprVXWc5Q2YS5eucNYgqiv0fk4ZKonZnZaOmg7WrbY08W", "phongBan": { "_id": "62d677c2e5d5e75076eae858" } }
    , { "_id": "628daf0cc4f90a3bd160978d", "hoTen": "Trần Hoàng Sơn", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0917343345", "email": "sonth.lan@vnpt.vn", "idTelegram": "898954564", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62d677c2e5d5e75076eae858" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628daf7dc4f90a3bd1609791", "hoTen": "Võ Văn Sang", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0913797989", "email": "sangvv.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$yQhey7Xzw6yNiy.RBsVDju5EtxHwDFlv8XhjiHQEAcz3Hp5WQv62.", "phongBan": { "_id": "636b53a3459651570535834d" } }
    , { "_id": "628db0ebc4f90a3bd1609796", "hoTen": "Phạm Thành Võ", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "hhhh", "soCMND": "301332255", "soDienThoai": "0914787972", "email": "vopt.lan@vnpt.vn", "idTelegram": "573865432", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$uEFtgvTdtzng2fzStLH/I.w1tfjtJiQO65o3R34Eqe6lcBwTV.zxq", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db110c4f90a3bd1609799", "hoTen": "Đoàn Công Bằng", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "bangdc.lan@vnpt.vn", "soDienThoai": "0946870302", "email": "bangdc.lan@vnpt.vn", "thongBao": "email", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$1wjGRbvZ59pGlt9nnlkFWeVWttgZqzSPomAJMJYiwqthtq.P8/oea", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db139c4f90a3bd160979c", "hoTen": "Nguyễn Minh Triết", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "327 Ấp 5, Lạc Tấn, Tân Trụ, Long An", "soCMND": "301435273", "soDienThoai": "0834445079", "email": "trietnm.lan@vnpt.vn", "idTelegram": "1122781971", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$JAgUqcr4kW6vbNPBC7/z7emV3qbBo/y8i4iLq3lAEJXbEOyCP/YeW", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db169c4f90a3bd16097a1", "hoTen": "Vũ Quang Huy", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0916686717", "email": "vqhuy.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db19ac4f90a3bd16097a6", "hoTen": "Lê Minh Toàn", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0856699248", "email": "toanlm.lan@vnpt.vn", "idTelegram": "5020921665", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db1dfc4f90a3bd16097a9", "hoTen": "Dương Công Trường", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0947818848", "email": "truongdc.lan@vnpt.vn", "idTelegram": "1005457828", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$IZJx7vUhA6NhVwyT90VSYeFmWko5CmOeevvCE6BIJMQ/dtVB7rEWW", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db20fc4f90a3bd16097ae", "hoTen": "Võ Trường Sang", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0941121088", "email": "sangvt.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62946fb6afabe6756e6bc62b" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db22dc4f90a3bd16097b1", "hoTen": "Dương Minh Tâm", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0946131466", "email": "tamdm.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62946fb6afabe6756e6bc62b" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db26cc4f90a3bd16097b4", "hoTen": "Nguyễn Ngọc Đức", "ngaySinh": { "$date": "1996-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0918269969", "email": "ducnn.lan@vnpt.vn", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$JAedBb0ujlZrovJm8hYy3.8vsHZDeJ5xJSH71MqQjhsltE1L2KXIW", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db290c4f90a3bd16097b7", "hoTen": "Huỳnh Quang Cường", "ngaySinh": { "$date": "1977-01-17T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0918606959", "email": "hqcuong.lan@vnpt.vn", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db2a3c4f90a3bd16097ba", "hoTen": "Nguyễn Thị Trúc Linh", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nữ", "diaChi": "", "soDienThoai": "0918606919", "email": "linhntt.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$NWKpVylA6KMKEJ8Byubt8u5jLZ6qI4lhBoXFlU4FabrcPQu5AzOga", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db2c3c4f90a3bd16097bd", "hoTen": "Nguyễn Thị Thu Quyên", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nữ", "diaChi": "", "soDienThoai": "0944243399", "email": "quyenntt.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db2d9c4f90a3bd16097c0", "hoTen": "Võ Hoàng Khánh Lâm", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0836645361", "email": "lamvhk.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db2ffc4f90a3bd16097c5", "hoTen": "Trần Danh Đạt", "ngaySinh": { "$date": "1997-01-19T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0834420799", "email": "dattd.lan@vnpt.vn", "idTelegram": "924912178", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689079d79bdd11acd17bc9" } }
    , { "_id": "628db311c4f90a3bd16097c8", "hoTen": "Nguyễn Phát Tài", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "123456789", "soDienThoai": "0918911007", "email": "tainp.lan@vnpt.vn", "idTelegram": "700655414", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$pAYNhJZ197EbSgc81Qpb9eGqR1XSZlDHeh6nA3mS6kbPDtibS93Ju", "phongBan": { "_id": "628db0721a606810dab290c0" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db337c4f90a3bd16097cb", "hoTen": "Nguyễn Thanh Hiền", "ngaySinh": { "$date": "1977-01-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0914711222", "email": "hiennt.lan@vnpt.vn", "idTelegram": "683091853", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$4sALqGcuwMv9BFdpDEFCSOZUCWMUt0abFkNe1HaLGTXUlKoYlEB7y", "phongBan": { "_id": "628db0721a606810dab290c0" }, "listNQ": [], "listLLV": [] }
    , { "_id": "628db35ec4f90a3bd16097d0", "hoTen": "Trần Anh Khoa", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0919773508", "email": "khoata.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$hAQrBlF6bHhYoLmJx9rT8O3scYp47EEud6uISjEliw07zO1KoreUm", "phongBan": { "_id": "628db0721a606810dab290c0" }, "listNQ": [], "listLLV": [] }
    , { "_id": "62ce4a59aca616363c282b83", "hoTen": "Võ Anh Hào", "ngaySinh": { "$date": "2000-10-23T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "080200014717", "soDienThoai": "0846771069", "email": "vahao.lan@vnpt.vn", "idTelegram": "5349548981", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$8645SMCkrTZwACrp8X.Ymug8h63bIWS9QfX6vapVYPKe4C.iiM6Ka", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "62e7356ab64a1d54bcfc49b4", "hoTen": "Huỳnh Tấn Đạt", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "soDienThoai": "0844777701", "email": "datht.lan@vnpt.vn", "idTelegram": "5087570964", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689061d79bdd11acd17bc8" }, "listNQ": [], "listLLV": [] }
    , { "_id": "62ea39e221cf08270f385df3", "hoTen": "Trần Nguyễn Minh Luân", "ngaySinh": { "$date": "1996-06-22T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "soDienThoai": "0819833433", "email": "luantnn.lan@vnpt.vn", "idTelegram": "5132559312", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$mNZ331sMQMXJN0lkJOyseeExkRVrJZ6iaeeZHh5TxIBZ1oWweJjwe", "phongBan": { "_id": "62689079d79bdd11acd17bc9" }, "listNQ": [], "listLLV": [] }
    , { "_id": "62f3c6ca21cf08270f385f2a", "hoTen": "Nguyễn Hoàng Phúc", "ngaySinh": { "$date": "1996-12-15T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "soDienThoai": "0947427934", "email": "nhphuc.lan@vnpt.vn", "idTelegram": "5523115056", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": { "_id": "62689061d79bdd11acd17bc8" } }
    , { "_id": "6308735cb1670316d91b6254", "hoTen": "Trưởng phòng test", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "soDienThoai": "0522977000", "email": "truongphong.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$LDa5l4UUVlTCcLfO/SWANujGt8IRvB3V649Hann.IzKG/A06BzK2a", "phongBan": { "_id": "62689061d79bdd11acd17bc8" } }
    , { "_id": "63e1fc33f0665b475189320a", "hoTen": "Trần Thị Tuyết Mai", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0946771000", "email": "tttmai.lan@vnpt.vn", "matKhau": "$2a$10$MwosjM7rRwZhIktC5za9Jej0I8PRIRXqJ5VgTwsuP2ujSXkq41KLa", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b475189320c", "hoTen": "Lê Văn Bùi Phước", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0988888888", "email": "lvbphuoc.lan@vnpt.vn", "matKhau": "$2a$10$7MSGrGU.mKl/rwcb.U/NeuEReeuEcqyP8NRExaOYGEnLz553pk.rG" }
    , { "_id": "63e1fc33f0665b4751893210", "hoTen": "Phan Thành Trung", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "090000000", "email": "pttrung.lan@vnpt.vn", "matKhau": "$2a$10$i7gqlnKGcFbemGKFvuyxM.2gSntR6CS/OHYq5hAC9jdo8vaFT.w.m", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b4751893212", "hoTen": "Minh Lê Toàn", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0862415007", "email": "toansauconkun994@gmail.com.lan@vnpt.vn", "matKhau": "$2a$10$fd9QD10Itf.Y.9BghKTLv.FrSFfAR5mn.eY7PKd55zdotMLmgXW/K" }
    , { "_id": "63e1fc33f0665b4751893214", "hoTen": "Admin", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0866771033", "email": "admin.lan@vnpt.vn", "matKhau": "$2a$10$yU.uAj76tkHhMr1hlSKgjOsjWzkRcZrqDLiG.4rQQT5XUHY16v6Je" }
    , { "_id": "63e1fc33f0665b4751893216", "hoTen": "Minh Toàn", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "09874636475", "email": "minhtoan1.lan@vnpt.vn", "matKhau": "$2a$10$V.qv3873Ge.DaqsoqAwKRuutT2y6IaZp7gNjRA87b4B.Av.hpBVLG", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b475189321c", "hoTen": "Minh Lê", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0983622374", "email": "minhle.lan@vnpt.vn", "matKhau": "$2a$10$cggqaiDpUT2TQzXMkJ5MTOXaAxqT0/P4bw0RI6/IIHkPU8m50lidG", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc33f0665b475189321f", "hoTen": "Nguyễn Tín", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0946771001", "email": "tinn.lan@vnpt.vn", "matKhau": "$2a$10$zhgyMXYEeRdGsNsjDdaSQOVVqSjlx8pcfK4SprOBWvwolbwS2D6hm", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b4751893221", "hoTen": "Trần Ngọc Linh", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0946771002", "email": "linhtn.lan@vnpt.vn", "matKhau": "$2a$10$scm8NdZO6EI3G6qKxf.fhOR87F7mxrm0rTR25f34SMg5nXu/WGhVO", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b4751893224", "hoTen": "Võ Thành Trí", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0917260466", "email": "trivt.lan@vnpt.vn", "matKhau": "$2a$10$QSncF.7AT3Kebdpui3PjiuNqu8mh9FITBPN3MDFDJ4Vdkmk25OPhi", "phongBan": { "_id": "63e1c717f0665b4751892ce5" } }
    , { "_id": "63e1fc33f0665b4751893225", "hoTen": "Phan Huy Đức", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0933331122", "email": "phduc.lan@vnpt.vn", "matKhau": "$2a$10$eitv8K4xZ2X0lOVDP2BMduqg1eMfjRm17g5emymbCvWdtA/.gJJTe", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b475189322b", "hoTen": "Nguyễn Hoàng Sơn", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0900090000", "email": "sonnh.lan@vnpt.vn", "matKhau": "$2a$10$HMrhx6yOCkOJSZ.dbGqVyudYzPd2vmytHX12LiV7dNKH7jKieB9SS", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc33f0665b475189322e", "hoTen": "Nguyễn Xuân Hùng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "098765423157", "email": "nxhung.lan@vnpt.vn", "matKhau": "$2a$10$AGOP5b7V6XflZ9i7EAy9Le8cBiD9C4VPgxwxOCDNewKTU5j0yhJ7q", "phongBan": { "_id": "63e1c718f0665b4751892ced" } }
    , { "_id": "63e1fc33f0665b4751893230", "hoTen": "Nguyễn Châu Ngân", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "09090090909", "email": "ncngan.lan@vnpt.vn", "matKhau": "$2a$10$T6a03N1yxYT6BeI9LbsgHu6KL0uwlJh8wcx7cBmHWbW9wZJVedLI.", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b4751893232", "hoTen": "Trần Lan Anh", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0987354678", "email": "tlanh.lan@vnpt.vn", "matKhau": "$2a$10$HtFbFQ4ERqlQtsy8GBrd3O7GI654JlR0DghfAo9CRVqenoqrJcDhe", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc33f0665b4751893236", "hoTen": "Nguyễn Thúy Hằng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0909090909", "email": "nthang.lan@vnpt.vn", "matKhau": "$2a$10$QSSBMyNbxEMyY1umlk.ZW.KVeKKRXXqheye.eCGikWExH2LLciy6q", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc33f0665b475189323a", "hoTen": "Nguyễn Trần Thúy Vân", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0987652234", "email": "nttvan.lan@vnpt.vn", "matKhau": "$2a$10$1WF6Z.Dmqa9u29MDt1LZsOSQ./IqamK3uUt6t/j.zQiOuBNzTf9.e" }
    , { "_id": "63e1fc33f0665b475189323d", "hoTen": "Nguyễn Thành Kiên", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0987652643", "email": "ntkien.lan@vnpt.vn", "matKhau": "$2a$10$5CSNbRX1VDlwU5z9jUmsmuCV62LqnqgWtmWAsHOvrsr4eNA0bIXie", "phongBan": { "_id": "63e1c718f0665b4751892ceb" } }
    , { "_id": "63e1fc33f0665b475189323f", "hoTen": "Trần Nguyên Trọng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0856677821", "email": "tntrong.lan@vnpt.vn", "matKhau": "$2a$10$1laAenuJPvHe4wYrFmrqQOo9uaJli9SPydWumfm2eQ1k1taqrP2jO", "phongBan": { "_id": "63e1c718f0665b4751892ceb" } }
    , { "_id": "63e1fc33f0665b4751893242", "hoTen": "Hoàng Thanh Tùng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0854325612", "email": "httung.lan@vnpt.vn", "matKhau": "$2a$10$phA6p.PrbtOZ2NY8sYbtZeMhhl1Nx.qcRtnlHa5FiPNLjHdeF0jQe", "phongBan": { "_id": "63e1c718f0665b4751892cf0" } }
    , { "_id": "63e1fc33f0665b4751893247", "hoTen": "Huỳnh Thanh Sơn", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0918606900", "email": "sonht.lan@vnpt.vn", "matKhau": "$2a$10$5dtuSIUCWoKgVbBbK88g9e9MnVxxTvKFVF9C9X/vkD7KEH9Yx3yfi", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc33f0665b4751893246", "hoTen": "Nguyễn Trần Thiên An", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0865243776", "email": "nttan.lan@vnpt.vn", "matKhau": "$2a$10$pIcyph7d.Uewwvt3OPOm.OZQ5.MijN7G0nrgwGC7WgSxboR6D.LnS", "phongBan": { "_id": "63e1c718f0665b4751892cf0" } }
    , { "_id": "63e1fc33f0665b475189324a", "hoTen": "Huỳnh Mai Xuân", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0813311888", "email": "xuanhm.lan@vnpt.vn", "matKhau": "$2a$10$aYyN28RiZRqh7Ksx6pR0ye7aqNy6cMxVVuILoz6ckS8TYVRDKcFWi", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc33f0665b475189324f", "hoTen": "Nguyễn Phước Hùng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0819001911", "email": "hungnp.lan@vnpt.vn", "matKhau": "$2a$10$Vk.2BEM9NW/a2OM8fk2Zze090HmCXo/e7twygT8nZpXN9sDeZbEoG", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc34f0665b4751893252", "hoTen": "Trần Thị Ngọc Quyên", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0941999689", "email": "quyenttn.lan@vnpt.vn", "matKhau": "$2a$10$HxZ6DjZSt5lR44o4lJ1ipu3AVlHfm04bJHrTLkMD05LC2kk5a1W02", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc34f0665b4751893255", "hoTen": "Dương Hoàng Giang", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0946396695", "email": "giangdh.lan@vnpt.vn", "matKhau": "$2a$10$X1dQjkz.H/KSBIa9nEti9OdkcqopPeiKCrSRmnHQGbk8jdYboFKRO", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc34f0665b4751893258", "hoTen": "Đặng Thị Tú", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0942944766", "email": "tudt.lan@vnpt.vn", "matKhau": "$2a$10$U94bj6hA2QuOj2UwRJEdr.tLJtFr/lh6WvhzXpfpV0Jo3amVf2vbO", "phongBan": { "_id": "63e1c718f0665b4751892cef" } }
    , { "_id": "63e1fc34f0665b475189325a", "hoTen": "Trần Phước Hòa", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0915797449", "email": "hoatp.lan@vnpt.vn", "matKhau": "$2a$10$A2mw969pmRjYEhz72EvXouKBdKNJLdNJDmNNquFLr6cG0RWK5f3u2", "phongBan": { "_id": "63e1c718f0665b4751892cef" } }
    , { "_id": "63e1fc34f0665b475189325c", "hoTen": "Lại Văn Cử", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0819435345", "email": "lvct2cla@gmai.com.lan@vnpt.vn", "matKhau": "$2a$10$KOSfuznbyB6cVi8gY8cV9eaI8FFZ7VmRptPoJOwoZsy3krS2ZRNwS", "phongBan": { "_id": "63e1c718f0665b4751892cef" } }
    , { "_id": "63e1fc34f0665b4751893261", "hoTen": "Nguyễn Hoàng Hiếu", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0911683983", "email": "hieunh.lan@vnpt.vn", "matKhau": "$2a$10$CGvoT7zb7TUxXyqOWs9wOuPzSNSL8Oy3vPTgLqXApIbB6bpMgoHTO", "phongBan": { "_id": "63e1c718f0665b4751892cf0" } }
    , { "_id": "63e1fc34f0665b4751893264", "hoTen": "Nguyễn Thị Kim Chi", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0888819798", "email": "chintk.lan@vnpt.vn", "matKhau": "$2a$10$hjRzkrssefMTCYMabG.4a.6YjZbxLW2jVsfZrYR0PlqMowUoJhQqS", "phongBan": { "_id": "63e1c718f0665b4751892cf0" } }
    , { "_id": "63e1fc34f0665b4751893267", "hoTen": "Đỗ Quyết Thắng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0947487737", "email": "thangdq.lan@vnpt.vn", "matKhau": "$2a$10$jNnFO469AunevQbNr3vPl.2RhFIwo1lIdY8SB7ScxjW1Dj6U0R9Tq", "phongBan": { "_id": "63e1c717f0665b4751892ce5" } }
    , { "_id": "63e1fc34f0665b475189326a", "hoTen": "Đinh Minh Tiến", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0944275008", "email": "tiendm.lan@vnpt.vn", "matKhau": "$2a$10$s3RHxcbC8OVagvSISOUXDuCtLbR2dFx01p.eqgi0qz6CFgmFm7nbW", "phongBan": { "_id": "63e1c718f0665b4751892cec" } }
    , { "_id": "63e1fc34f0665b475189326c", "hoTen": "Trần Thị Kim Nhi", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0941399661", "email": "nhittk.lan@vnpt.vn", "matKhau": "$2a$10$hUZl8vQD9xel60PX8Aum5.3VPWzmXRoPZXL5Iu1xe3e6s0SD8SOjq", "phongBan": { "_id": "63e1c718f0665b4751892cec" } }
    , { "_id": "63e1fc34f0665b475189326e", "hoTen": "Trần Thanh Long", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0941678479", "email": "longtt.lan@vnpt.vn", "matKhau": "$2a$10$oQrt8eTalOgx.CSWmYA8E.cAdBIRhF8PFg51oyOzxu6l/L2kXEmGG", "phongBan": { "_id": "63e1c718f0665b4751892cec" } }
    , { "_id": "63e1fc34f0665b4751893273", "hoTen": "Phạm Tuấn Hùng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0941399668", "email": "hungpt.lan@vnpt.vn", "matKhau": "$2a$10$CThjLSyRglJ0TfJi6zarEO0GGW6i.FvCwAcPLSPlKXz5lkc7rgWMq", "phongBan": { "_id": "63e1c718f0665b4751892cee" } }
    , { "_id": "63e1fc34f0665b4751893276", "hoTen": "Nguyễn Vũ Bảo", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0853093679", "email": "baonv.lan@vnpt.vn", "matKhau": "$2a$10$tmlKTKzZPmaShtzhAmEdCezraXGewDnFdVrlyLGPlcyeum.8Q2vYG", "phongBan": { "_id": "63e1c718f0665b4751892cee" } }
    , { "_id": "63e1fc34f0665b4751893278", "hoTen": "Lê Châu Khoa", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0941488989", "email": "khoalc.lan@vnpt.vn", "matKhau": "$2a$10$7E6vwn4Os/EuZ7txagYa7uH7wjIUwme2NB4RNn8pIfCcuWJ1iKq8y", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b475189327c", "hoTen": "Trần Quang Minh", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0886393037", "email": "minhnq.lan@vnpt.vn", "matKhau": "$2a$10$CLJP6lWT5gOIVsstZ6.0NuUPzIeszYEzv0q/yO1wYCh4hyF3Yn4AK", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b4751893280", "hoTen": "Trần Quốc Nam", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0913685741", "email": "namtq.lan@vnpt.vn", "matKhau": "$2a$10$4.kj935a66Gb0EriGcLA9.lSAZttulzjH7boFmvZGenFUJdLkjsEm", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b475189327f", "hoTen": "Phạm Thị Quờn", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0948587017", "email": "quonpt.lan@vnpt.vn", "matKhau": "$2a$10$9sLCXXzwYeenNWMyahLplu.c2LCyt.JmS46iRjEP.qPqT5pWL4gd6", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b4751893285", "hoTen": "Trần Trung Hùng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0946666725", "email": "hungtt.lan@vnpt.vn", "matKhau": "$2a$10$VBtM5OrdlDzXCt6VaUqL7.Bs6RsX4j01Mn3xkcFi/Aqr2aZ8dE0Fe", "phongBan": { "_id": "63e1c718f0665b4751892ceb" } }
    , { "_id": "63e1fc34f0665b4751893288", "hoTen": "Đỗ Hoàng Nhã", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0913337668", "email": "dhnha.lan@vnpt.vn", "matKhau": "$2a$10$f1bS9g.is8SwBcSgQQmYGuT/wQ4y0DBWprv/NLMLzHrXBR9unJLmW", "phongBan": { "_id": "63e1c717f0665b4751892ce1" } }
    , { "_id": "63e1fc34f0665b475189328a", "hoTen": "Nguyễn Hải Đăng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0945796839", "email": "dangnh.lan@vnpt.vn", "matKhau": "$2a$10$rYPgynR.aN1FzRm1UtXequ90zfZ2.Z/i7up7gjljpU6qW164QRD.e", "phongBan": { "_id": "63e1c718f0665b4751892ceb" } }
    , { "_id": "63e1fc34f0665b475189328e", "hoTen": "Phan Quốc Khánh", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0911710000", "email": "khanhpq.lan@vnpt.vn", "matKhau": "$2a$10$XvHkXxFoYPbIzqf0DPzjfu3A4YLbwzTBzyPY3HBYTXGxbwT28dwy2", "phongBan": { "_id": "63e1c718f0665b4751892ced" } }
    , { "_id": "63e1fc34f0665b4751893290", "hoTen": "Nguyễn Xuân Ngân", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0948445565", "email": "ngannx.lan@vnpt.vn", "matKhau": "$2a$10$Hlkat.sUiErk/2V5TU69ReH2u81g6V4uFVQtsCYBzSoBOgBnkXuwm", "phongBan": { "_id": "63e1c717f0665b4751892ce4" } }
    , { "_id": "63e1fc34f0665b4751893293", "hoTen": "Admin1", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0870678047", "email": "admin1.lan@vnpt.vn", "matKhau": "$2a$10$7yOnt/g0iUkzKvAHXBg7tOZagcG1ZahAmjWWgHqk1X9iD2LRG8bo." }
    , { "_id": "63e1fc34f0665b4751893297", "hoTen": "Minh lê", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0073325708", "email": "minhle1.lan@vnpt.vn", "matKhau": "$2a$10$hNQsF31flxe7WKyL61IJCOki4zEGTLLZYtSg7Zm1VwtTYZHMIQamm", "phongBan": { "_id": "63e1c718f0665b4751892cea" } }
    , { "_id": "63e1fc34f0665b475189329a", "hoTen": "Trần Hưng", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0946771011", "email": "thung.lan@vnpt.vn", "matKhau": "$2a$10$2URdvQ.wWin4Q19R1KOW/eYg4bTnNdaUUYBmyw/PTvgnnxgTlZOY2" }
    , { "_id": "63e1fc34f0665b475189329c", "hoTen": "Phan Thành Trung", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0942456367", "email": "trungpt.lan@vnpt.vn", "matKhau": "$2a$10$CTqVhij5YNldSj3wOEnODOSzJmz/sby42rdZSjeOq49aH7Y/eoTNG", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc34f0665b47518932a0", "hoTen": "Trần Quốc Nam", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0913685781", "email": "tqnam.lan@vnpt.vn", "matKhau": "$2a$10$e7DavlTsS1PceRDXYU/EsezZt4tQAr5dguM2Vm23yrPhtd.GMrgja", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b47518932a2", "hoTen": "Phạm Thị Quờn", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0948587007", "email": "ptquon.lan@vnpt.vn", "matKhau": "$2a$10$RASCRlpg1yrTsuTci4KpLOdHZTpR2kpNB37abpcbSTKgB9xUqhaqu", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b47518932a4", "hoTen": "Lê Châu Khoa", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0941488919", "email": "lckhoa.lan@vnpt.vn", "matKhau": "$2a$10$bGjONE2oNZJjkj.BRmpz1ua44eih1xLCCBdigu4NjxXM7QS1YBaS6", "phongBan": { "_id": "63e1c718f0665b4751892cf1" } }
    , { "_id": "63e1fc34f0665b47518932a9", "hoTen": "Dương Thị Ngọc Giàu", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0823433839", "email": "dtngiau.lan@vnpt.vn", "matKhau": "$2a$10$LNDapKf78ylCTGscYbXlYuCtcLJd8LCkYEhkRcBcowJThTdP3IFL6", "phongBan": { "_id": "63e1c717f0665b4751892ce5" } }
    , { "_id": "63e1fc34f0665b47518932ac", "hoTen": "Trần Thị Hồng Lợi", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0949242399", "email": "loitth.lan@vnpt.vn", "matKhau": "$2a$10$0f6xtnbpePeSB6LrXMz17eAgprNHxmue.K1OdaXN4mm8NfWwq222G", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc34f0665b47518932ae", "hoTen": "Hồ Như Ngọc", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0956771033", "email": "ngochn.lan@vnpt.vn", "matKhau": "$2a$10$gGDLppw1/4b1pe4GlKYbguE7NbdR0y.2yB/lMGUsB3/Re849uf/Wm", "phongBan": { "_id": "63e1c718f0665b4751892cec" } }
    , { "_id": "63e1fc34f0665b47518932b2", "hoTen": "Kiều Văn Trí", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0911394909", "email": "trikv.lan@vnpt.vn", "matKhau": "$2a$10$NyGmhNrVaSqQ29jtqbSOV.wwEuZb4GsF5oIcEppuKU5iO6d/0NFLK", "phongBan": { "_id": "63e1c717f0665b4751892ce6" } }
    , { "_id": "63e1fc34f0665b47518932b5", "hoTen": "Trương Thị Nhất Linh", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0956711023", "email": "linhttn.lan@vnpt.vn", "matKhau": "$2a$10$Aj5rL/i1uBkKEhifvRsJS.S7e0KpVbX/pqHC7VJBlYcsV4z0.Ivmu", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }
    , { "_id": "63e1fc34f0665b47518932b6", "hoTen": "Lê Nguyễn Kim Ngọc", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0888487487", "email": "ngoclnk.lan@vnpt.vn", "matKhau": "$2a$10$XnUQM8FYq5W3fDej8DMreOwBP4ZTLYyHvWNR9T5uvlghmckKHyXvS", "phongBan": { "_id": "63e1c718f0665b4751892ceb" } }
    , { "_id": "63e1fc34f0665b47518932bb", "hoTen": "Bệnh Viên Đa Khoa Long An", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0956774333", "email": "benhviena.lan@vnpt.vn", "matKhau": "$2a$10$dioPlsk42u7zWeQ.86daY.MeV6KCKv5NDMvNQNYcJp.6/I1USHz8a", "phongBan": { "_id": "63e1c718f0665b4751892ce8" } }
    , { "_id": "63e1fc34f0665b47518932be", "hoTen": "Nguyễn Văn B", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "111", "email": "benhvienb.lan@vnpt.vn", "matKhau": "$2a$10$YMyFrrhHZKoZj2B21E5QPeonvb8V97h608ocE4slVXOp42aBCZhSK", "phongBan": { "_id": "63e1c718f0665b4751892ce9" } }
    , { "_id": "63e1fc34f0665b47518932c1", "hoTen": "Đỗ Thùy Dương", "ngaySinh": { "$date": "1994-12-31T17:00:00.000+0000" }, "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "", "soDienThoai": "0926771033", "email": "duongdt.lan@vnpt.vn", "matKhau": "$2a$10$p7ZWYR5RswFwAA92XFL5R.BMfvkvxwFoUftJuSxBMXlOLMQiPXbSe", "phongBan": { "_id": "63e1c718f0665b4751892ce7" } }

]
const dataNV1 = [{ "_id": "622974232d99fb75611aae26", "hoTen": "Quản trị viên", "anhDaiDien": "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/344/external-setting-user-interface-tanah-basah-glyph-tanah-basah.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "111222333444", "soDienThoai": "0123456789", "email": "quantri.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$g2UaRz2IMprVXWc5Q2YS5eucNYgqiv0fk4ZKonZnZaOmg7WrbY08W", "phongBan": "62d677c2e5d5e75076eae858", "listNQ": [], "listLLV": [] }
    , { "_id": "628daf0cc4f90a3bd160978d", "hoTen": "Trần Hoàng Sơn", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0917343345", "email": "sonth.lan@vnpt.vn", "idTelegram": "898954564", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62d677c2e5d5e75076eae858", "listNQ": [], "listLLV": [] }
    , { "_id": "628daf7dc4f90a3bd1609791", "hoTen": "Võ Văn Sang", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0913797989", "email": "sangvv.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$yQhey7Xzw6yNiy.RBsVDju5EtxHwDFlv8XhjiHQEAcz3Hp5WQv62.", "phongBan": "636b53a3459651570535834d" }
    , { "_id": "628db0ebc4f90a3bd1609796", "hoTen": "Phạm Thành Võ", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "hhhh", "soCMND": "301332255", "soDienThoai": "0914787972", "email": "vopt.lan@vnpt.vn", "idTelegram": "573865432", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$uEFtgvTdtzng2fzStLH/I.w1tfjtJiQO65o3R34Eqe6lcBwTV.zxq", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "628db110c4f90a3bd1609799", "hoTen": "Đoàn Công Bằng", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "bangdc.lan@vnpt.vn", "soDienThoai": "0946870302", "email": "bangdc.lan@vnpt.vn", "thongBao": "email", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$1wjGRbvZ59pGlt9nnlkFWeVWttgZqzSPomAJMJYiwqthtq.P8/oea", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "628db139c4f90a3bd160979c", "hoTen": "Nguyễn Minh Triết", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "327 Ấp 5, Lạc Tấn, Tân Trụ, Long An", "soCMND": "301435273", "soDienThoai": "0834445079", "email": "trietnm.lan@vnpt.vn", "idTelegram": "1122781971", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$JAgUqcr4kW6vbNPBC7/z7emV3qbBo/y8i4iLq3lAEJXbEOyCP/YeW", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "628db169c4f90a3bd16097a1", "hoTen": "Vũ Quang Huy", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0916686717", "email": "vqhuy.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "628db19ac4f90a3bd16097a6", "hoTen": "Lê Minh Toàn", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0856699248", "email": "toanlm.lan@vnpt.vn", "idTelegram": "5020921665", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "628db1dfc4f90a3bd16097a9", "hoTen": "Dương Công Trường", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0947818848", "email": "truongdc.lan@vnpt.vn", "idTelegram": "1005457828", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$IZJx7vUhA6NhVwyT90VSYeFmWko5CmOeevvCE6BIJMQ/dtVB7rEWW", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db20fc4f90a3bd16097ae", "hoTen": "Võ Trường Sang", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0941121088", "email": "sangvt.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62946fb6afabe6756e6bc62b", "listNQ": [], "listLLV": [] }
    , { "_id": "628db22dc4f90a3bd16097b1", "hoTen": "Dương Minh Tâm", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0946131466", "email": "tamdm.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62946fb6afabe6756e6bc62b", "listNQ": [], "listLLV": [] }
    , { "_id": "628db26cc4f90a3bd16097b4", "hoTen": "Nguyễn Ngọc Đức", "ngaySinh": "1996-12-31T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0918269969", "email": "ducnn.lan@vnpt.vn", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$JAedBb0ujlZrovJm8hYy3.8vsHZDeJ5xJSH71MqQjhsltE1L2KXIW", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db290c4f90a3bd16097b7", "hoTen": "Huỳnh Quang Cường", "ngaySinh": "1977-01-17T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0918606959", "email": "hqcuong.lan@vnpt.vn", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db2a3c4f90a3bd16097ba", "hoTen": "Nguyễn Thị Trúc Linh", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nữ", "diaChi": "", "soDienThoai": "0918606919", "email": "linhntt.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$NWKpVylA6KMKEJ8Byubt8u5jLZ6qI4lhBoXFlU4FabrcPQu5AzOga", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db2c3c4f90a3bd16097bd", "hoTen": "Nguyễn Thị Thu Quyên", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nữ", "diaChi": "", "soDienThoai": "0944243399", "email": "quyenntt.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db2d9c4f90a3bd16097c0", "hoTen": "Võ Hoàng Khánh Lâm", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0836645361", "email": "lamvhk.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db2ffc4f90a3bd16097c5", "hoTen": "Trần Danh Đạt", "ngaySinh": "1997-01-19T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0834420799", "email": "dattd.lan@vnpt.vn", "idTelegram": "924912178", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "628db311c4f90a3bd16097c8", "hoTen": "Nguyễn Phát Tài", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "123456789", "soDienThoai": "0918911007", "email": "tainp.lan@vnpt.vn", "idTelegram": "700655414", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$pAYNhJZ197EbSgc81Qpb9eGqR1XSZlDHeh6nA3mS6kbPDtibS93Ju", "phongBan": "628db0721a606810dab290c0", "listNQ": [], "listLLV": [] }
    , { "_id": "628db337c4f90a3bd16097cb", "hoTen": "Nguyễn Thanh Hiền", "ngaySinh": "1977-01-31T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0914711222", "email": "hiennt.lan@vnpt.vn", "idTelegram": "683091853", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$4sALqGcuwMv9BFdpDEFCSOZUCWMUt0abFkNe1HaLGTXUlKoYlEB7y", "phongBan": "628db0721a606810dab290c0", "listNQ": [], "listLLV": [] }
    , { "_id": "628db35ec4f90a3bd16097d0", "hoTen": "Trần Anh Khoa", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soDienThoai": "0919773508", "email": "khoata.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$hAQrBlF6bHhYoLmJx9rT8O3scYp47EEud6uISjEliw07zO1KoreUm", "phongBan": "628db0721a606810dab290c0", "listNQ": [], "listLLV": [] }
    , { "_id": "62ce4a59aca616363c282b83", "hoTen": "Võ Anh Hào", "ngaySinh": "2000-10-23T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "diaChi": "", "soCMND": "080200014717", "soDienThoai": "0846771069", "email": "vahao.lan@vnpt.vn", "idTelegram": "5349548981", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$8645SMCkrTZwACrp8X.Ymug8h63bIWS9QfX6vapVYPKe4C.iiM6Ka", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "62e7356ab64a1d54bcfc49b4", "hoTen": "Huỳnh Tấn Đạt", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "soDienThoai": "0844777701", "email": "datht.lan@vnpt.vn", "idTelegram": "5087570964", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689061d79bdd11acd17bc8", "listNQ": [], "listLLV": [] }
    , { "_id": "62ea39e221cf08270f385df3", "hoTen": "Trần Nguyễn Minh Luân", "ngaySinh": "1996-06-22T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "soDienThoai": "0819833433", "email": "luantnn.lan@vnpt.vn", "idTelegram": "5132559312", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$mNZ331sMQMXJN0lkJOyseeExkRVrJZ6iaeeZHh5TxIBZ1oWweJjwe", "phongBan": "62689079d79bdd11acd17bc9", "listNQ": [], "listLLV": [] }
    , { "_id": "62f3c6ca21cf08270f385f2a", "hoTen": "Nguyễn Hoàng Phúc", "ngaySinh": "1996-12-15T17:00:00.000+0000", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "gioiTinh": "Nam", "soDienThoai": "0947427934", "email": "nhphuc.lan@vnpt.vn", "idTelegram": "5523115056", "thongBao": "telegram", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$J6GhS2GvgousEejZhsopweB4AQPf7RvvCQQsu4k70XqeVzEEUR.vi", "phongBan": "62689061d79bdd11acd17bc8" }
    , { "_id": "6308735cb1670316d91b6254", "hoTen": "Trưởng phòng test", "anhDaiDien": "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-user-management-kiranshastry-solid-kiranshastry-6.png", "soDienThoai": "0522977000", "email": "truongphong.lan@vnpt.vn", "thongBaoCapNhatPhamMem": false, "matKhau": "$2a$10$LDa5l4UUVlTCcLfO/SWANujGt8IRvB3V649Hann.IzKG/A06BzK2a", "phongBan": "62689061d79bdd11acd17bc8" }
]
const dataNV2 = [

    {
        "Id": 5,
        "UId": null,
        "UserName": "admin@vnpt.vn",
        "Password": "044aa2e54894348f515c6cf38451aa33b0f3be87",
        "FullName": "Admin",
        "Phone": "0866771033",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 1,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": null
    },
    {
        "Id": 1077,
        "UId": null,
        "UserName": "lmtoan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lê Minh Toàn",
        "Phone": "0856699248",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1078,
        "UId": null,
        "UserName": "toansauconkun994@gmail.com",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Minh Lê Toàn",
        "Phone": "0862415007",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1080,
        "UId": null,
        "UserName": "truongdc.lan",
        "Password": "a51ddc779a881ea971639d935d0a4e162ad36f60",
        "FullName": "Dương Công Trường",
        "Phone": null,
        "JiraAcount": "truongdc.lan",
        "JiraPass": "Dct12345679@",
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1081,
        "UId": null,
        "UserName": "vhklam",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Võ Hoàng Khánh Lâm",
        "Phone": "0988888888",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1082,
        "UId": null,
        "UserName": "tddat",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Danh Đạt",
        "Phone": "0988888888",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1083,
        "UId": null,
        "UserName": "lvbphuoc",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lê Văn Bùi Phước",
        "Phone": "0988888888",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1084,
        "UId": null,
        "UserName": "quyenntt.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Thị Thu Quyên",
        "Phone": "0988888888",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1085,
        "UId": null,
        "UserName": "minhle",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Minh Lê",
        "Phone": "0983622374",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1086,
        "UId": null,
        "UserName": "phduc",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phan Huy Đức",
        "Phone": "0933331122",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1088,
        "UId": null,
        "UserName": "minhtoan1",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Minh Toàn",
        "Phone": "09874636475",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1090,
        "UId": null,
        "UserName": "tttmai",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Thị Tuyết Mai",
        "Phone": "0946771000",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1091,
        "UId": null,
        "UserName": "sonth.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Hoàng Sơn",
        "Phone": "0917345345",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1092,
        "UId": null,
        "UserName": "pttrung",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phan Thành Trung",
        "Phone": "090000000",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1093,
        "UId": null,
        "UserName": "tinn.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Tín",
        "Phone": "0946771001",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1094,
        "UId": null,
        "UserName": "linhtn.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Ngọc Linh",
        "Phone": "0946771002",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1095,
        "UId": null,
        "UserName": "trivt.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Võ Thành Trí",
        "Phone": "0917260466",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 14,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1096,
        "UId": null,
        "UserName": "vtsang",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Võ Trường Sang",
        "Phone": "0946771003",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1097,
        "UId": null,
        "UserName": "dmtam",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Dương Minh Tâm",
        "Phone": "0946771004",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1098,
        "UId": null,
        "UserName": "sonnh.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Hoàng Sơn",
        "Phone": "0900090000",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1099,
        "UId": null,
        "UserName": "ncngan",
        "Password": "66156b9c5a1fe2ec17ba80afc4230e5a95afa2f3",
        "FullName": "Nguyễn Châu Ngân",
        "Phone": "09090090909",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1100,
        "UId": null,
        "UserName": "nthang",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Thúy Hằng",
        "Phone": "0909090909",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1101,
        "UId": null,
        "UserName": "hqcuong",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Huỳnh Quang Cường",
        "Phone": "0987999888",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1102,
        "UId": null,
        "UserName": "nxhung",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Xuân Hùng",
        "Phone": "098765423157",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 6,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1103,
        "UId": null,
        "UserName": "nttvan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Trần Thúy Vân",
        "Phone": "0987652234",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1104,
        "UId": null,
        "UserName": "tlanh",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Lan Anh",
        "Phone": "0987354678",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1105,
        "UId": null,
        "UserName": "ntkien",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Thành Kiên",
        "Phone": "0987652643",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 4,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1106,
        "UId": null,
        "UserName": "tntrong",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Nguyên Trọng",
        "Phone": "0856677821",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 4,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1107,
        "UId": null,
        "UserName": "nttan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Trần Thiên An",
        "Phone": "0865243776",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 7,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1108,
        "UId": null,
        "UserName": "httung",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Hoàng Thanh Tùng",
        "Phone": "0854325612",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 7,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1109,
        "UId": null,
        "UserName": "xuanhm.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Huỳnh Mai Xuân",
        "Phone": "0813311888",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1110,
        "UId": null,
        "UserName": "sonht.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Huỳnh Thanh Sơn",
        "Phone": "0918606900",
        "JiraAcount": "sonht.lan@vnpt.vn",
        "JiraPass": "vnpt@123",
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1111,
        "UId": null,
        "UserName": "quyenttn.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Thị Ngọc Quyên",
        "Phone": "0941999689",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1112,
        "UId": null,
        "UserName": "hungnp.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Phước Hùng",
        "Phone": "0819001911",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1113,
        "UId": null,
        "UserName": "giangdh.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Dương Hoàng Giang",
        "Phone": "0946396695",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1114,
        "UId": null,
        "UserName": "tudt.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Đặng Thị Tú",
        "Phone": "0942944766",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 10,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1115,
        "UId": null,
        "UserName": "hoatp.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Phước Hòa",
        "Phone": "0915797449",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 10,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1116,
        "UId": null,
        "UserName": "lvct2cla@gmai.com",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lại Văn Cử",
        "Phone": "0819435345",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 10,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1117,
        "UId": null,
        "UserName": "hieunh.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Hoàng Hiếu",
        "Phone": "0911683983",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 7,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1118,
        "UId": null,
        "UserName": "chintk.lan@vnpt.vn",
        "Password": "9c4a6ee5b7e9f94105d6a09cde3f8da8f1f6b137",
        "FullName": "Nguyễn Thị Kim Chi",
        "Phone": "0888819798",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 7,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1119,
        "UId": null,
        "UserName": "thangdq.lan",
        "Password": "9a7be6b314a050d2a4e11bba92e48f8a634e9d56",
        "FullName": "Đỗ Quyết Thắng",
        "Phone": "0947487737",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 14,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1120,
        "UId": null,
        "UserName": "tiendm.lan@vnpt.vn",
        "Password": "9c4a6ee5b7e9f94105d6a09cde3f8da8f1f6b137",
        "FullName": "Đinh Minh Tiến",
        "Phone": "0944275008",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 8,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1121,
        "UId": null,
        "UserName": "longtt.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Thanh Long",
        "Phone": "0941678479",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 8,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1122,
        "UId": null,
        "UserName": "nhittk.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Thị Kim Nhi",
        "Phone": "0941399661",
        "JiraAcount": "nhittk.lan@vnpt.vn",
        "JiraPass": "vnpt@123",
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 8,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1123,
        "UId": null,
        "UserName": "hungpt.lan@vnpt.vn",
        "Password": "7f0042852386eb717fd0012a9a394ac8b802cce7",
        "FullName": "Phạm Tuấn Hùng",
        "Phone": "0941399668",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 9,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1124,
        "UId": null,
        "UserName": "baonv.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Vũ Bảo",
        "Phone": "0853093679",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 9,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1125,
        "UId": null,
        "UserName": "khoalc.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lê Châu Khoa",
        "Phone": "0941488989",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1126,
        "UId": null,
        "UserName": "quonpt.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phạm Thị Quờn",
        "Phone": "0948587017",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1127,
        "UId": null,
        "UserName": "namtq.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Quốc Nam",
        "Phone": "0913685741",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1128,
        "UId": null,
        "UserName": "minhnq.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Quang Minh",
        "Phone": "0886393037",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1129,
        "UId": null,
        "UserName": "hungtt.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Trung Hùng",
        "Phone": "0946666725",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 4,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1130,
        "UId": null,
        "UserName": "dangnh.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Hải Đăng",
        "Phone": "0945796839",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 4,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1131,
        "UId": null,
        "UserName": "dhnha.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Đỗ Hoàng Nhã",
        "Phone": "0913337668",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 12,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1132,
        "UId": null,
        "UserName": "khanhpq.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phan Quốc Khánh",
        "Phone": "0911710000",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 6,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1133,
        "UId": null,
        "UserName": "ngannx.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Xuân Ngân",
        "Phone": "0948445565",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 13,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1134,
        "UId": null,
        "UserName": "ptvo",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phạm Thành Võ",
        "Phone": "0914787972",
        "JiraAcount": "vopt.lan",
        "JiraPass": "Viber123!@#",
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1135,
        "UId": null,
        "UserName": "vqhuy.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Vũ Quang Huy",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1136,
        "UId": null,
        "UserName": "tnmluan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Nguyễn Minh Luân",
        "Phone": "0819833433",
        "JiraAcount": "luantnn.lan",
        "JiraPass": "Luan2306",
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1139,
        "UId": null,
        "UserName": "admin1",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Admin1",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1140,
        "UId": null,
        "UserName": "minhle1",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "MinhLe",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 15,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1141,
        "UId": null,
        "UserName": "trungpt.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phan Thành Trung",
        "Phone": "0942456367",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1142,
        "UId": null,
        "UserName": "linhntt.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Thị Trúc Linh",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1143,
        "UId": null,
        "UserName": "trietnm.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Minh Triết",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1144,
        "UId": null,
        "UserName": "thung",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Hưng",
        "Phone": "0946771011",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "0",
        "IsReset": "1"
    },
    {
        "Id": 1145,
        "UId": null,
        "UserName": "tainp.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Phát Tài",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1146,
        "UId": null,
        "UserName": "khoata.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Anh Khoa",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1147,
        "UId": null,
        "UserName": "hiennt.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Thanh Hiền",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1148,
        "UId": null,
        "UserName": "bangdc.lan@vnpt.vn",
        "Password": "9c4a6ee5b7e9f94105d6a09cde3f8da8f1f6b137",
        "FullName": "Đoàn Công Bằng",
        "Phone": "Đoàn Công Bằng",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1149,
        "UId": null,
        "UserName": "ptquon",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Phạm Thị Quờn",
        "Phone": "0948587007",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1150,
        "UId": null,
        "UserName": "tqnam",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Quốc Nam",
        "Phone": "0913685781",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1151,
        "UId": null,
        "UserName": "lckhoa",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lê Châu Khoa",
        "Phone": "0941488919",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 5,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1152,
        "UId": null,
        "UserName": "sangvv.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Võ Văn Sang",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 2,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1153,
        "UId": null,
        "UserName": "dtngiau.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Dương Thị Ngọc Giàu",
        "Phone": "0823433839",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 14,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1154,
        "UId": null,
        "UserName": "loitth.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trần Thị Hồng Lợi",
        "Phone": "0949242399",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1155,
        "UId": null,
        "UserName": "phucnh.lan",
        "Password": "9e56062f40a095a1d553bd3ad6197facef74f2aa",
        "FullName": "Nguyễn Hoàng Phúc",
        "Phone": "0947427934",
        "JiraAcount": "nhphuc.lan",
        "JiraPass": "PhucLinh2611",
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1156,
        "UId": null,
        "UserName": "ducnn.lan",
        "Password": "bd2a2eee8640e01f7c24cbb000a68f189b88596d",
        "FullName": "Nguyễn Ngọc Đức",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1157,
        "UId": null,
        "UserName": "ngochn.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Hồ Như Ngọc",
        "Phone": "0956771033",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 8,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1158,
        "UId": null,
        "UserName": "datht.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Huỳnh Tấn Đạt",
        "Phone": "0844777701",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1159,
        "UId": null,
        "UserName": "vahao.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Võ Anh Hào",
        "Phone": null,
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 4,
        "UnitId": 1,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1160,
        "UId": null,
        "UserName": "trikv.lan@vnpt.vn",
        "Password": "2973122ade7446724d9ba59d420d5c48c994bffc",
        "FullName": "Kiều Văn Trí",
        "Phone": "0911394909",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 11,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1161,
        "UId": null,
        "UserName": "ngoclnk.lan@vnpt.vn",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Lê Nguyễn Kim Ngọc",
        "Phone": "0888487487",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 4,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1162,
        "UId": null,
        "UserName": "linhttn.lan",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Trương Thị Nhất Linh",
        "Phone": "0956711023",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1163,
        "UId": null,
        "UserName": "benhviena",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Bệnh Viện A",
        "Phone": "0956774333",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 4,
        "UnitId": 16,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1164,
        "UId": null,
        "UserName": "benhvienb",
        "Password": "26af3047801d623165b9e718ad5ded317bb9f637",
        "FullName": "Nguyễn Văn B",
        "Phone": "111",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 4,
        "UnitId": 17,
        "IsActive": "1",
        "IsReset": "1"
    },
    {
        "Id": 1165,
        "UId": null,
        "UserName": "duongdt.lan@vnpt.vn",
        "Password": "4d44746952cea28917e20f95062910635a0f908e",
        "FullName": "Đỗ Thùy Dương",
        "Phone": "0926771033",
        "JiraAcount": null,
        "JiraPass": null,
        "DateCreated": "1/1/1 00:00:00",
        "RoleId": 3,
        "UnitId": 2,
        "IsActive": "1",
        "IsReset": "1"
    }

]
const dataNV3 = [

    {
        "Id": 1,
        "TenNhanSu": "Lê Minh Toàn",
        "NguoiTaoId": 5,
        "NgayTao": "10/1/2022 16:33:54.887",
        "NgayCapNhat": "25/3/2022 14:53:36.813",
        "UnitId": 1,
        "UserId": 1077,
        "DichVuId": null,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 2,
        "TenNhanSu": "Phạm Thành Võ",
        "NguoiTaoId": 5,
        "NgayTao": "10/1/2022 16:37:23.6",
        "NgayCapNhat": "14/3/2022 16:18:05.29",
        "UnitId": 1,
        "UserId": 1134,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 4,
        "TenNhanSu": "Nguyễn Minh Triết",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:32:20.527",
        "NgayCapNhat": "25/3/2022 14:49:42.587",
        "UnitId": 1,
        "UserId": 1143,
        "DichVuId": null,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 5,
        "TenNhanSu": "Vũ Quang Huy",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:33:29.25",
        "NgayCapNhat": "16/3/2022 20:24:06.443",
        "UnitId": 1,
        "UserId": 1135,
        "DichVuId": 9,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 7,
        "TenNhanSu": "Nguyễn Trần Thúy Vân",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:33:53.92",
        "NgayCapNhat": "2/3/2022 10:40:10.79",
        "UnitId": 1,
        "UserId": 1103,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "0"
    },
    {
        "Id": 8,
        "TenNhanSu": "Huỳnh Quang Cường",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:34:01.993",
        "NgayCapNhat": "26/2/2022 09:14:44.467",
        "UnitId": 1,
        "UserId": 1101,
        "DichVuId": 15,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 9,
        "TenNhanSu": "Nguyễn Thị Trúc Linh",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:34:09.01",
        "NgayCapNhat": "25/3/2022 14:51:30.317",
        "UnitId": 1,
        "UserId": 1142,
        "DichVuId": 12,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 10,
        "TenNhanSu": "Dương Công Trường",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:34:23.87",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1080,
        "DichVuId": null,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 11,
        "TenNhanSu": "Nguyễn Thị Thu Quyên",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:34:32.56",
        "NgayCapNhat": "25/3/2022 14:28:01.75",
        "UnitId": 1,
        "UserId": 1084,
        "DichVuId": 7,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 12,
        "TenNhanSu": "Võ Hoàng Khánh Lâm",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:34:42.063",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1081,
        "DichVuId": 7,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 13,
        "TenNhanSu": "Trần Danh Đạt",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:34:51.773",
        "NgayCapNhat": "17/3/2022 08:16:03.79",
        "UnitId": 1,
        "UserId": 1082,
        "DichVuId": 7,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 15,
        "TenNhanSu": "Nguyễn Phát Tài",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:35:08.227",
        "NgayCapNhat": "25/3/2022 14:48:58.223",
        "UnitId": 1,
        "UserId": 1145,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 16,
        "TenNhanSu": "Trần Anh Khoa",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:35:14.257",
        "NgayCapNhat": "25/3/2022 14:49:03.71",
        "UnitId": 1,
        "UserId": 1146,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 17,
        "TenNhanSu": "Nguyễn Thanh Hiền",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:35:20.44",
        "NgayCapNhat": "25/3/2022 14:51:58.917",
        "UnitId": 1,
        "UserId": 1147,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 18,
        "TenNhanSu": "Võ Trường Sang",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:35:27.607",
        "NgayCapNhat": "25/3/2022 14:49:15.107",
        "UnitId": 2,
        "UserId": 1096,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 19,
        "TenNhanSu": "Dương Minh Tâm",
        "NguoiTaoId": 5,
        "NgayTao": "14/1/2022 14:35:33.567",
        "NgayCapNhat": "25/3/2022 14:49:29.65",
        "UnitId": 2,
        "UserId": 1097,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 20,
        "TenNhanSu": "Phan Huy Đức",
        "NguoiTaoId": 5,
        "NgayTao": "23/2/2022 16:54:52.513",
        "NgayCapNhat": "26/2/2022 09:22:27.273",
        "UnitId": 2,
        "UserId": 1086,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 21,
        "TenNhanSu": "Nguyễn Hoàng Sơn",
        "NguoiTaoId": 5,
        "NgayTao": "23/2/2022 16:55:15.847",
        "NgayCapNhat": "25/3/2022 14:52:31.327",
        "UnitId": 2,
        "UserId": 1098,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 27,
        "TenNhanSu": "Lê Minh Hoàng",
        "NguoiTaoId": 5,
        "NgayTao": "24/2/2022 08:47:51.603",
        "NgayCapNhat": null,
        "UnitId": 4,
        "UserId": null,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 28,
        "TenNhanSu": "Phan Thành Trung",
        "NguoiTaoId": 5,
        "NgayTao": "24/2/2022 21:01:26.26",
        "NgayCapNhat": "24/3/2022 10:06:26.827",
        "UnitId": 2,
        "UserId": 1141,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 29,
        "TenNhanSu": "Trần Ngọc Linh",
        "NguoiTaoId": 5,
        "NgayTao": "24/2/2022 21:01:37.02",
        "NgayCapNhat": null,
        "UnitId": 2,
        "UserId": null,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 30,
        "TenNhanSu": "Võ Thành Trí",
        "NguoiTaoId": 5,
        "NgayTao": "24/2/2022 21:01:47.113",
        "NgayCapNhat": "25/3/2022 14:52:46.54",
        "UnitId": 2,
        "UserId": 1095,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 31,
        "TenNhanSu": "Nguyễn Châu Ngân",
        "NguoiTaoId": 5,
        "NgayTao": "24/2/2022 21:01:58.593",
        "NgayCapNhat": "25/3/2022 14:52:40.18",
        "UnitId": 2,
        "UserId": 1099,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 32,
        "TenNhanSu": "Nguyễn Thúy Hằng",
        "NguoiTaoId": 5,
        "NgayTao": "24/2/2022 21:02:06.057",
        "NgayCapNhat": null,
        "UnitId": 2,
        "UserId": null,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 33,
        "TenNhanSu": "Nguyễn Tín",
        "NguoiTaoId": 1088,
        "NgayTao": "24/2/2022 21:03:04.43",
        "NgayCapNhat": null,
        "UnitId": 2,
        "UserId": 1093,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 34,
        "TenNhanSu": "Minh Lê",
        "NguoiTaoId": 5,
        "NgayTao": "26/2/2022 11:08:38.75",
        "NgayCapNhat": "2/3/2022 10:33:22.56",
        "UnitId": 5,
        "UserId": 1085,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 35,
        "TenNhanSu": "Nguyễn Xuân Hùng",
        "NguoiTaoId": 5,
        "NgayTao": "1/3/2022 14:42:26.54",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1102,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 36,
        "TenNhanSu": "Trần Lan Anh",
        "NguoiTaoId": 5,
        "NgayTao": "7/3/2022 10:09:40.33",
        "NgayCapNhat": null,
        "UnitId": 6,
        "UserId": 1104,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 37,
        "TenNhanSu": "Nguyễn Thành Kiên",
        "NguoiTaoId": 5,
        "NgayTao": "7/3/2022 10:10:08.05",
        "NgayCapNhat": null,
        "UnitId": 4,
        "UserId": 1105,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 38,
        "TenNhanSu": "Trần Nguyên Trọng",
        "NguoiTaoId": 5,
        "NgayTao": "7/3/2022 10:10:39.94",
        "NgayCapNhat": null,
        "UnitId": 4,
        "UserId": 1106,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 39,
        "TenNhanSu": "Nguyễn Trần Thiên An",
        "NguoiTaoId": 5,
        "NgayTao": "7/3/2022 10:11:11.3",
        "NgayCapNhat": null,
        "UnitId": 7,
        "UserId": 1107,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 40,
        "TenNhanSu": "Hoàng Thanh Tùng",
        "NguoiTaoId": 5,
        "NgayTao": "7/3/2022 10:11:32.65",
        "NgayCapNhat": null,
        "UnitId": 7,
        "UserId": 1108,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 41,
        "TenNhanSu": "Huỳnh Mai Xuân",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:06:08.27",
        "NgayCapNhat": null,
        "UnitId": 11,
        "UserId": 1109,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 42,
        "TenNhanSu": "Huỳnh Thanh Sơn",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:06:19.13",
        "NgayCapNhat": null,
        "UnitId": 11,
        "UserId": 1110,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 43,
        "TenNhanSu": "Trần Thị Ngọc Quyên",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:06:30.383",
        "NgayCapNhat": null,
        "UnitId": 11,
        "UserId": 1111,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 44,
        "TenNhanSu": "Nguyễn Phước Hùng",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:06:43.333",
        "NgayCapNhat": null,
        "UnitId": 11,
        "UserId": 1112,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 45,
        "TenNhanSu": "Dương Hoàng Giang",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:06:53.963",
        "NgayCapNhat": null,
        "UnitId": 11,
        "UserId": 1113,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 46,
        "TenNhanSu": "Đặng Thị Tú",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:07:08.62",
        "NgayCapNhat": null,
        "UnitId": 10,
        "UserId": 1114,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 47,
        "TenNhanSu": "Trần Phước Hòa",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:07:20.64",
        "NgayCapNhat": null,
        "UnitId": 10,
        "UserId": 1115,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 48,
        "TenNhanSu": "Lại Văn Cử",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:07:31.043",
        "NgayCapNhat": null,
        "UnitId": 10,
        "UserId": 1116,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 49,
        "TenNhanSu": "Nguyễn Hoàng Hiếu",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:07:42.203",
        "NgayCapNhat": null,
        "UnitId": 7,
        "UserId": 1117,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 50,
        "TenNhanSu": "Nguyễn Thị Kim Chi",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:07:57.16",
        "NgayCapNhat": null,
        "UnitId": 7,
        "UserId": 1118,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 51,
        "TenNhanSu": "Đỗ Quyết Thắng",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:08:24.657",
        "NgayCapNhat": null,
        "UnitId": 14,
        "UserId": 1119,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 52,
        "TenNhanSu": "Đinh Minh Tiến",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:08:43.29",
        "NgayCapNhat": null,
        "UnitId": 8,
        "UserId": 1120,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 53,
        "TenNhanSu": "Trần Thanh Long",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:08:54.773",
        "NgayCapNhat": null,
        "UnitId": 8,
        "UserId": 1121,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 54,
        "TenNhanSu": "Trần Thị Kim Nhi",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:09:05.757",
        "NgayCapNhat": null,
        "UnitId": 8,
        "UserId": 1122,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 55,
        "TenNhanSu": "Phạm Tuấn Hùng",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:09:20.553",
        "NgayCapNhat": null,
        "UnitId": 9,
        "UserId": 1123,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 56,
        "TenNhanSu": "Nguyễn Vũ Bảo",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:09:38.31",
        "NgayCapNhat": null,
        "UnitId": 9,
        "UserId": 1124,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 57,
        "TenNhanSu": "Lê Châu Khoa",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:09:58.763",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1125,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 58,
        "TenNhanSu": "Phạm Thị Quờn",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:10:07.96",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1126,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 59,
        "TenNhanSu": "Trần Quốc Nam",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:10:16.567",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1127,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 60,
        "TenNhanSu": "Trần Quang Minh",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:10:25.19",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1128,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 61,
        "TenNhanSu": "Trần Trung Hùng",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:10:42.393",
        "NgayCapNhat": null,
        "UnitId": 4,
        "UserId": 1129,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 62,
        "TenNhanSu": "Nguyễn Hải Đăng",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:11:06.257",
        "NgayCapNhat": null,
        "UnitId": 4,
        "UserId": 1130,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 63,
        "TenNhanSu": "Đỗ Hoàng Nhã",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:11:34.053",
        "NgayCapNhat": null,
        "UnitId": 12,
        "UserId": 1131,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 64,
        "TenNhanSu": "Phan Quốc Khánh",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:11:49.31",
        "NgayCapNhat": null,
        "UnitId": 6,
        "UserId": 1132,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 65,
        "TenNhanSu": "Nguyễn Xuân Ngân",
        "NguoiTaoId": 5,
        "NgayTao": "10/3/2022 08:12:01.937",
        "NgayCapNhat": null,
        "UnitId": 13,
        "UserId": 1133,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 66,
        "TenNhanSu": "Trần Nguyễn Minh Luân",
        "NguoiTaoId": 5,
        "NgayTao": "17/3/2022 09:39:07.69",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1136,
        "DichVuId": 6,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 69,
        "TenNhanSu": "Admin1",
        "NguoiTaoId": 5,
        "NgayTao": "22/3/2022 10:15:08.983",
        "NgayCapNhat": "22/3/2022 10:23:07.707",
        "UnitId": 1,
        "UserId": 1139,
        "DichVuId": 6,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 70,
        "TenNhanSu": "Minh lê",
        "NguoiTaoId": 5,
        "NgayTao": "22/3/2022 10:15:35.873",
        "NgayCapNhat": "22/3/2022 10:18:20.123",
        "UnitId": 15,
        "UserId": 1140,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 71,
        "TenNhanSu": "Trần Hoàng Sơn",
        "NguoiTaoId": 5,
        "NgayTao": "25/3/2022 14:54:17.407",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1091,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 72,
        "TenNhanSu": "Đoàn Công Bằng",
        "NguoiTaoId": 5,
        "NgayTao": "2/4/2022 08:48:30.51",
        "NgayCapNhat": "4/4/2022 08:21:48.733",
        "UnitId": 1,
        "UserId": 1148,
        "DichVuId": 6,
        "AdminDichVuId": 6,
        "isActive": "1"
    },
    {
        "Id": 73,
        "TenNhanSu": "Phạm Thị Quờn",
        "NguoiTaoId": 5,
        "NgayTao": "3/4/2022 09:35:21.097",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1149,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 74,
        "TenNhanSu": "Trần Quốc Nam",
        "NguoiTaoId": 5,
        "NgayTao": "3/4/2022 09:35:30.89",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1150,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 75,
        "TenNhanSu": "Lê Châu Khoa",
        "NguoiTaoId": 5,
        "NgayTao": "3/4/2022 09:35:42.623",
        "NgayCapNhat": null,
        "UnitId": 5,
        "UserId": 1151,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 76,
        "TenNhanSu": "Võ Văn Sang",
        "NguoiTaoId": 5,
        "NgayTao": "4/4/2022 07:36:05.6",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1152,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 77,
        "TenNhanSu": "Dương Thị Ngọc Giàu",
        "NguoiTaoId": 5,
        "NgayTao": "4/4/2022 11:09:24.077",
        "NgayCapNhat": null,
        "UnitId": 14,
        "UserId": 1153,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 78,
        "TenNhanSu": "Trần Thị Hồng Lợi",
        "NguoiTaoId": 5,
        "NgayTao": "20/6/2022 15:26:49.887",
        "NgayCapNhat": "20/6/2022 15:28:00.603",
        "UnitId": 11,
        "UserId": 1154,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 80,
        "TenNhanSu": "Nguyễn Hoàng Phúc",
        "NguoiTaoId": 5,
        "NgayTao": "7/7/2022 08:10:41.563",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1155,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 85,
        "TenNhanSu": "Nguyễn Ngọc Đức",
        "NguoiTaoId": 5,
        "NgayTao": "7/7/2022 08:12:04.037",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1156,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 90,
        "TenNhanSu": "Hồ Như Ngọc",
        "NguoiTaoId": 5,
        "NgayTao": "8/8/2022 14:07:05.323",
        "NgayCapNhat": null,
        "UnitId": 8,
        "UserId": 1157,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 91,
        "TenNhanSu": "Huỳnh Tấn Đạt",
        "NguoiTaoId": 5,
        "NgayTao": "13/8/2022 10:06:40.093",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1158,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 92,
        "TenNhanSu": "Võ Anh Hào",
        "NguoiTaoId": 5,
        "NgayTao": "13/8/2022 10:07:01.903",
        "NgayCapNhat": null,
        "UnitId": 1,
        "UserId": 1159,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 93,
        "TenNhanSu": "Kiều Văn Trí",
        "NguoiTaoId": 5,
        "NgayTao": "28/10/2022 08:28:58.86",
        "NgayCapNhat": null,
        "UnitId": 2,
        "UserId": 1160,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 94,
        "TenNhanSu": "Lê Nguyễn Kim Ngọc",
        "NguoiTaoId": 5,
        "NgayTao": "28/10/2022 08:32:17.187",
        "NgayCapNhat": null,
        "UnitId": 4,
        "UserId": 1161,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 95,
        "TenNhanSu": "Trương Thị Nhất Linh",
        "NguoiTaoId": 5,
        "NgayTao": "28/10/2022 13:55:27.973",
        "NgayCapNhat": null,
        "UnitId": 2,
        "UserId": 1162,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 97,
        "TenNhanSu": "Bệnh Viên Đa Khoa Long An",
        "NguoiTaoId": 5,
        "NgayTao": "15/12/2022 17:02:48.32",
        "NgayCapNhat": null,
        "UnitId": 16,
        "UserId": 1163,
        "DichVuId": 7,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 98,
        "TenNhanSu": "Nguyễn Văn B",
        "NguoiTaoId": 5,
        "NgayTao": "20/12/2022 09:20:03.44",
        "NgayCapNhat": null,
        "UnitId": 17,
        "UserId": 1164,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    },
    {
        "Id": 99,
        "TenNhanSu": "Đỗ Thùy Dương",
        "NguoiTaoId": 5,
        "NgayTao": "2/2/2023 10:45:22.183",
        "NgayCapNhat": null,
        "UnitId": 2,
        "UserId": 1165,
        "DichVuId": null,
        "AdminDichVuId": null,
        "isActive": "1"
    }
]
const listPhongBan = [
    { "_id": "62689061d79bdd11acd17bc8", "tenPhongBan": "Phòng Giải pháp", "moTa": "Phòng Giải Pháp", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "62689079d79bdd11acd17bc9", "tenPhongBan": "Phòng Tổng hợp", "moTa": "Phòng Tổng Hơp", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "628db0721a606810dab290c0", "tenPhongBan": "Phòng Hệ thống", "moTa": "Phòng Hệ Thống", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "62946fb6afabe6756e6bc62b", "tenPhongBan": "Tổ Dự án", "moTa": "Tổ Dự án", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "62d677c2e5d5e75076eae858", "tenPhongBan": "Phòng Giám Đốc", "moTa": "", "boPhan": "Quản lý", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "636b53a3459651570535834d", "tenPhongBan": "Phòng PGĐ", "moTa": "Phòng Phó Giám Đốc", "boPhan": "Quản lý", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "63e1c717f0665b4751892ce2", "tenPhongBan": "Phòng Bán Hàng", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892ca9" },
    { "_id": "63e1c717f0665b4751892ce1", "tenPhongBan": "PBH Kiến Tường - Mộc Hóa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb0" },
    { "_id": "63e1c717f0665b4751892ce3", "tenPhongBan": "Trung tâm CNTT", "boPhan": "Thực thi", "donVi": "62afea2221c49c5dfa964577" },
    { "_id": "63e1c717f0665b4751892ce4", "tenPhongBan": "PBH Vĩnh Hưng - Tân Hưng", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb1" },
    { "_id": "63e1c717f0665b4751892ce5", "tenPhongBan": "PBH Châu Thành - Tân Trụ", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb2" },
    { "_id": "63e1c717f0665b4751892ce6", "tenPhongBan": "PBH Bến Lức", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb5" },
    { "_id": "63e1c718f0665b4751892ce8", "tenPhongBan": "Khách Hàng", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb6" },
    { "_id": "63e1c718f0665b4751892ce7", "tenPhongBan": "Phòng KHTCDN", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892caa" },
    { "_id": "63e1c718f0665b4751892ce9", "tenPhongBan": "TTYT", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb7" },
    { "_id": "63e1c718f0665b4751892cea", "tenPhongBan": "Phòng TT", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb4" },
    { "_id": "63e1c718f0665b4751892ceb", "tenPhongBan": "PBH Thủ Thừa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cad" },
    { "_id": "63e1c718f0665b4751892cec", "tenPhongBan": "PBH Đức Hòa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb8" },
    { "_id": "63e1c718f0665b4751892ced", "tenPhongBan": "PBH Tân Thạnh - Thạnh Hóa", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb3" },
    { "_id": "63e1c718f0665b4751892cee", "tenPhongBan": "PBH Đức Huệ", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cae" },
    { "_id": "63e1c718f0665b4751892cef", "tenPhongBan": "PBH Cần Đước", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cab" },
    { "_id": "63e1c718f0665b4751892cf0", "tenPhongBan": "PBH Cần Giuộc", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892cb9" },
    { "_id": "63e1c718f0665b4751892cf1", "tenPhongBan": "PBH Tân An", "boPhan": "Thực thi", "donVi": "63e1c04ef0665b4751892caf" },
    { "_id": "63e61781397b600a8bacb13f", "tenPhongBan": "TTYT Mộc Hóa", "moTa": "", "boPhan": "Thực thi", "donVi": "63eb3560e3c4ce3471d86c5a" },
    { "_id": "63e6e912397b600a8bacb14b", "tenPhongBan": "TTYT Châu Thành", "moTa": "", "boPhan": "Thực thi", "donVi": "63eb35a0e3c4ce3471d86c5d" },
    { "_id": "63e6ea27397b600a8bacb159", "tenPhongBan": "BVĐKLA", "moTa": "Bệnh viện đa khoa Long An", "boPhan": "Thực thi", "donVi": "63eb357ee3c4ce3471d86c5c" },
    { "_id": "63e6fd93397b600a8bacb175", "tenPhongBan": "BVĐKKV Đồng Tháp Mười", "moTa": "", "boPhan": "Thực thi", "donVi": "63eb356be3c4ce3471d86c5b" },

]
