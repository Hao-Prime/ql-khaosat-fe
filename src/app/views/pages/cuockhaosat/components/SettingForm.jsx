import { Button, DatePicker, Divider, Input, Modal, Radio, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Upload } from 'antd';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import { CircularProgress } from '@mui/material';
import Loading from 'app/components/Loading';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
const { Option } = Select;
const SettingForm = ({ cuocKhaoSat, reloadList, backURL }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [value, setValue] = useState(1);
    const [cuocKhaoSatUpdate, setCuocKhaoSatUpdate] = useState(cuocKhaoSat);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loadingBieuMau, setLoadingBieuMau] = useState(false)
    const [listBieuMau, setListBieuMau] = useState([]);
    const taiKhoan = useSelector(state => state.taiKhoan)
    const onChange = (arr, value) => {
        setCuocKhaoSatUpdate({ ...cuocKhaoSatUpdate, [arr]: value })
    };
    const [loading2, setLoading2] = useState(false);
    useEffect(() => {
        if (cuocKhaoSat) {

            setLoading2(false)
            realoadListSelect()
            setCuocKhaoSatUpdate(cuocKhaoSat)
        }
    }, [cuocKhaoSat]);
    async function realoadListSelect() {

        setLoadingBieuMau(true)
        let listBieuMau = await Services.getFormService().getMyListForm()
        if (listBieuMau.data) {
            setListBieuMau(listBieuMau?.data)
        }
        setLoadingBieuMau(false)

    }
    const handleDropdownVisibleChangeBieuMau = async (open) => {
        if (open) {
            let res = await Services.getFormService().getMyListForm()
            if (res.data) {
                setListBieuMau(res?.data)
            }
        }
    };
    const handleVoHieuHoaCuocKhaoSat = () => {
        setSending(true);
        Services.getCuocKhaoSatService().capNhatThongTinKhaoSat({ ...cuocKhaoSatUpdate, thanhPhan: "", trangThai: cuocKhaoSatUpdate?.trangThai > 0 ? 0 : 2 }).then(
            async (res) => {
                setSending(false);
                if (res?.data?.error) {
                    Modal.error({
                        title: 'Lỗi',
                        content: res?.data?.message,
                    });

                } else {

                    message.success("Lưu thành công")
                    reloadList()
                }
            }
        )
    }
    const handleChuaHoanThanhKhaoSat = () => {
        setSending(false)
        Services.getCuocKhaoSatService().chuaHoanThanhKhaoSat(cuocKhaoSat?._id, cuocKhaoSat?.donVi).then(
            (res) => {
                if (res.data) {
                    setSending(false)
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        message.success("Lưu thành công")
                        reloadList()
                    }
                }
            }
        )
    }
    const handleDelete = async () => {
        const confirmed = await modal.confirm({
            title: "Bạn có chắc muốn xóa khảo sát này",
            content: "",
        });
        if (confirmed) {
            setSending(true);
            Services.getCuocKhaoSatService().xoaKhaoSat(cuocKhaoSatUpdate?._id).then(
                (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        Modal.success({
                            title: 'Success',
                            content: "Khảo sát đã được xóa",
                            onOk() {
                                window.location.href = backURL ? backURL?.replaceAll("~!~", "&") : `/quan-tri/khao-sat?trangThai=1`;
                            },
                            onCancel() {
                                window.location.href = backURL ? backURL?.replaceAll("~!~", "&") : `/quan-tri/khao-sat?trangThai=1`;
                            }
                        });
                    }
                }
            )
        }
    }
    const handleOk = () => {
        setSending(true);
        setError("")
        if (checkCuocKhaoSat()) {
            Services.getCuocKhaoSatService().capNhatThongTinKhaoSat({ ...cuocKhaoSatUpdate, thanhPhan: "" }).then(
                async (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        message.success("Lưu thành công")
                    }
                }
            )
        } else {


            setSending(false);
        }

    };
    const checkCuocKhaoSat = () => {
        if (!cuocKhaoSatUpdate?.tieuDe) {
            Modal.error({
                title: 'Lỗi',
                content: "Tên khảo sát không được để trống",
            });
            setError()
            return false;
        } else if (cuocKhaoSatUpdate?.ngayBD && cuocKhaoSatUpdate?.ngayKT) {
            const ngayBD = dayjs(cuocKhaoSatUpdate?.ngayBD);
            const ngayKT = dayjs(cuocKhaoSatUpdate?.ngayKT);
            // Kiểm tra nếu ngày bắt đầu trước ngày kết thúc
            if (!ngayBD.isBefore(ngayKT)) {
                Modal.error({
                    title: 'Lỗi',
                    content: "Ngày bắt đầu không trước ngày kết thúc.",
                })
                setError();
                return false;
            }

        }
        return true;
    }
    function checkTrangThaiCuocKhaoSat(cuocKhaoSat) {
        if (cuocKhaoSat?.trangThai == 0) {
            return <span className="status-danger ">Đã khóa</span>
        } else if (cuocKhaoSat?.trangThai == 3) {
            return <span className="status-cuccess ">Đã hoàn thành</span>// Đã hoàn thành
        }
        if (cuocKhaoSat?.ngayBD) {
            if (dayjs(cuocKhaoSat?.ngayBD).isAfter(dayjs())) {
                return <span className="status-cyan ">Sắp diễn ra</span>// Sắp diễn ra
            }
        }
        if (cuocKhaoSat?.ngayKT) {
            if (dayjs(cuocKhaoSat?.ngayKT).isBefore(dayjs())) {
                return <span className="status-cuccess ">Đã kết thúc</span>// Đã kết thúc
            }
        }
        return <span className="status-cyan ">Đang diễn ra</span>;//Đâng diễn ra
    }
    const uploadButton = (
        <div>
            {loading2 ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setError('Bạn chỉ có thể chọn ảnh là png hoặc jprg');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            setError('Ảnh phải bé hơn 10MB');
        }
        return isJpgOrPng && isLt2M;
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };


    return (

        <div className="div-setting-cus">
            {contextHolder}
            {!cuocKhaoSatUpdate ? <Loading></Loading> :
                <>
                    <div className='flex justify-between pb-3'>


                        <p className='bold'> Trạng thái: {checkTrangThaiCuocKhaoSat(cuocKhaoSat)} </p>
                        <div className='div-flex'>


                            <Button type="primary" danger className='bg-red flex align-center justify-center' onClick={handleVoHieuHoaCuocKhaoSat} disabled={sending}>
                                <span style={{ display: sending ? 'inherit' : 'none' }}>
                                    <CircularProgress className="span-sender" />
                                </span>
                                {cuocKhaoSat?.trangThai > 0 ? "Khóa khảo sát" : "Mở khóa"}

                            </Button>
                            {cuocKhaoSat?.trangThai > 2 &&
                                <Button type="primary" info className='bg-red flex align-center justify-center ms-1' onClick={handleChuaHoanThanhKhaoSat} disabled={sending}>
                                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                                        <CircularProgress className="span-sender" />
                                    </span>
                                    Mở lại tiếp tục khảo sát
                                </Button>
                            }
                        </div>
                    </div>
                    {/* <div className='pb-3'>
                        <p className='bold'> Loại biểu mẫu: </p>
                        <Radio.Group onChange={onChange} defaultValue={cuocKhaoSatUpdate?.loaiCuocKhaoSat}>
                            <Radio value={1}>Cá nhân</Radio>
                            <Radio value={2}>Tổ chức</Radio>

                        </Radio.Group>

                    </div> */}
                    <div className='pb-3'>
                        <p ><span className='bold'>Biểu mẫu:</span>  <i><a className='red f-12' href='/quan-tri/bieu-mau?my=1' target='_blank'> Tạo biểu mẫu mới</a></i></p>
                        <Select
                            allowClear
                            onDropdownVisibleChange={handleDropdownVisibleChangeBieuMau}  // Gọi API khi dropdown mở
                            loading={loadingBieuMau}  // Hiển thị Spin nếu đang load dữ liệu
                            defaultValue={cuocKhaoSat?.bieuMau?._id}
                            style={{ width: '100%' }}
                            showSearch
                            onChange={(value) => onChange("bieuMau", value ? { _id: value } : null)}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa/chữ thường
                            }
                            placeholder="Chọn mẫu biểu mẫu để khảo sát"
                        >
                            {loadingBieuMau ? (
                                <Option disabled key="loading">Loading...</Option>
                            ) : (
                                listBieuMau.map((item) => (
                                    <Option key={item._id} value={item?._id}>
                                        {item.tenBieuMau}
                                    </Option>
                                ))
                            )}
                        </Select>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Tiêu đề: </p>
                        <Input placeholder="Basic usage" onChange={(e) => onChange("tieuDe", e?.target?.value)} defaultValue={cuocKhaoSatUpdate?.tieuDe} />

                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea autoSize={{ minRows: 3 }} onChange={(e) => onChange("moTa", e?.target?.value)} defaultValue={cuocKhaoSatUpdate?.moTa} placeholder="Nhập tên biểu mẫu" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Tổng số phiếu khảo sát cần đạt: </p>
                        <Input type="number" defaultValue={cuocKhaoSatUpdate?.chiTieu} onChange={(e) => onChange("chiTieu", e?.target?.value)} placeholder="Tổng toàn bộ khảo sát cần đạt" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Thời gian biểu mẫu: </p>
                        <div className='flex justify-between'>
                            <DatePicker
                                onChange={(e) => onChange("ngayBD", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                format="DD/MM/YYYY HH:mm"
                                locale={locale?.DatePicker}
                                defaultValue={cuocKhaoSatUpdate?.ngayBD ? dayjs(cuocKhaoSatUpdate?.ngayBD) : null}
                                showTime
                                style={{ width: "100%", marginRight: "10px" }}
                            />

                            <DatePicker
                                onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                defaultValue={cuocKhaoSatUpdate?.ngayKT ? dayjs(cuocKhaoSatUpdate?.ngayKT) : null}
                                format="DD/MM/YYYY HH:mm"
                                showTime style={{ width: "100%" }}
                            />

                        </div>


                    </div>

                    <div className='pb-3 flex justify-center' >
                        <Button key="submit" type="primary" className='mt-2 bg-info flex align-center justify-center' onClick={handleOk} disabled={sending}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>
                            Cập nhật
                        </Button>

                    </div>
                    <Divider ><p className='red' ></p></Divider>
                    <div className='flex justify-between pb-3 pt-3'>
                        <div >
                            <p className='bold'>Xóa khảo sát này</p>
                            <p>Một khi bạn xóa một kho lưu trữ, bạn sẽ không thể quay lại. Xin hãy chắc chắn.</p>
                        </div>
                        <Button type="primary" danger className='bg-red mt-2 flex align-center' onClick={handleDelete} disabled={sending}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>Xóa khảo sát</Button>
                    </div>
                </>}
        </div >

    );
};

export default SettingForm;
