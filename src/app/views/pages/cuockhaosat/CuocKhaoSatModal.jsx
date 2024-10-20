
import { CircularProgress, } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, Tooltip } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import SapXep from 'app/common/SapXep';
import HelpIcon from '@mui/icons-material/Help';
const { TextArea } = Input;
const { Option } = Select;
const CuocKhaoSatModal = ({ open, setOpen, cuocKhaoSatUp, reLoadList }) => {
    const [cuocKhaoSat, setCuocKhaoSat] = useState();
    const [listBieuMau, setListBieuMau] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingDoiTuong, setLoadingDoiTuong] = useState(false);
    const [loadingBieuMau, setLoadingBieuMau] = useState(false);
    const [listDoiTuong, setListDoiTuong] = useState([]);
    useEffect(() => {
        if (open) {
            realoadListSelect()
        }
    }, [open]);
    async function realoadListSelect() {
        setLoading(true)
        setSending(false)
        setCuocKhaoSat(cuocKhaoSatUp)
        let listBieuMau = await Services.getFormService().getMyListForm()
        // if (listBieuMau.data) {
        //     setListBieuMau(SapXep.sapXepTheoObjectAtr(listBieuMau?.data, "tenBieuMau", 1)?.map(obj => {
        //         return { value: obj._id, label: obj?.maBieuMau + " - " + obj.tenBieuMau };
        //     }))
        // }
        setLoading(false)

    }
    const handleOk = () => { }
    const onChange = (arr, value) => {
        setCuocKhaoSat({ ...cuocKhaoSat, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (checkCuocKhaoSat) {
            Services?.getCuocKhaoSatService()?.taoMoiKhaoSat(cuocKhaoSat)?.then(
                (res) => {
                    if (res?.data?.error) {
                        setError(res?.data?.mesage)
                    } else {
                        setOpen(false);
                        message.success("Lưu thành công")
                        reLoadList()
                    }
                    setSending(false)
                }
            )
        } else {
            setSending(false);
        }


    }
    const handleDropdownVisibleChangeDoiTuong = async (open) => {
        if (open) {
            let res = await Services.getDoiTuongService().getAll("")
            if (res.data) {
                setListDoiTuong(SapXep.sapXepTheoObjectAtr(res?.data, "stt", 1))
            }
        }
    };
    const handleDropdownVisibleChangeBieuMau = async (open) => {
        if (open) {
            let res = await Services.getFormService().getMyListForm()
            if (res.data) {
                setListBieuMau(res?.data)
            }
        }
    };
    const checkCuocKhaoSat = () => {
        if (!cuocKhaoSat?.tieuDe) {
            Modal.error({
                title: 'Lỗi',
                content: "Tiêu đề không được để trống",
            });
            setError()
            return false;
        } else if (!cuocKhaoSat.moTa) {
            Modal.error({
                title: 'Lỗi',
                content: "Nội dung không được để trống",
            });
            setError()
            return false;
        } else if (cuocKhaoSat?.ngayBD && cuocKhaoSat?.ngayKT) {
            const ngayBD = dayjs(cuocKhaoSat?.ngayBD);
            const ngayKT = dayjs(cuocKhaoSat?.ngayKT);
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
    return (
        <Modal title="THÊM MỚI MẪU KHẢO SÁT" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText="" width={900}
            maskClosable={false}
            footer={[
                <span className='me-1 red'>{error}</span>,
                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!cuocKhaoSatUp?._id ? "Tạo mới" : "Cập nhật"}
                </Button>,
                <Button key="back" onClick={() => setOpen(!open)}>
                    Hủy
                </Button>
            ]}
        >
            {loading ? <Loading />
                :
                <div className="div-setting-cus">
                     <div className='pb-3'>
                            <p className='bold'><span className='red'>*</span> Tiêu đề: </p>
                            <Input defaultValue={cuocKhaoSat?.tieuDe} onChange={(e) => onChange("tieuDe", e?.target?.value)} placeholder="Nhập tên tiêu đề" />
                        </div>
                    <div className='pb-2'>
                       

                        <p ><span className='bold'>Chọn biểu mẫu có sẵn:</span>  </p>
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
                        <p className='text-right mb-0'><i><a className='red f-12' href='/quan-tri/bieu-mau?my=1' target='_blank'> Tạo biểu mẫu mới</a></i></p>
                       
                    </div>

                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea defaultValue={cuocKhaoSat?.moTa} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold mb-1'> Đối tượng thực hiện khảo sát
                            <Tooltip title="Người khi khảo sát sẽ được gán loại đối tượng này">
                                <HelpIcon className='help' />
                            </Tooltip>
                        </p>
                        <Select
                            placeholder="Chọn đối tượng khảo sát"
                            onDropdownVisibleChange={handleDropdownVisibleChangeDoiTuong}  // Gọi API khi dropdown mở
                            loading={loadingDoiTuong}  // Hiển thị Spin nếu đang load dữ liệu
                            style={{ width: 200 }}
                            // mode="tags"
                            onChange={(value) => onChange("doiTuongTHKhaoSat", value ? { _id: value } : null)}
                            defaultValue={cuocKhaoSat?.doiTuongTHKhaoSat?._id || null}
                            className='w-100pt'
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa/chữ thường
                            }
                        >
                            {loadingDoiTuong ? (
                                <Option disabled key="loading">Loading...</Option>
                            ) : (
                                listDoiTuong.map((item) => (
                                    <Option key={item._id} value={item?._id}>
                                        {item.tenDoiTuong}
                                    </Option>
                                ))
                            )}
                        </Select>
                    </div>
                    {/* <div className='pb-3'>
                        <div className='flex justify-between'>
                            <div>
                                <p className='bold'> Thời gian bắt đầu: </p>
                                <DatePicker
                                    onChange={(e) => onChange("ngayBD", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                    format="DD/MM/YYYY HH:mm"
                                    locale={locale?.DatePicker}
                                    defaultValue={cuocKhaoSatUp?.ngayBD ? dayjs(cuocKhaoSatUp?.ngayBD) : null}
                                    showTime
                                    style={{ width: "100%", marginRight: "10px" }}
                                />
                            </div>

                            <div>
                                <p className='bold'> Thời gian kết thúc: </p>
                                <DatePicker
                                    onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                    defaultValue={cuocKhaoSatUp?.ngayKT ? dayjs(cuocKhaoSatUp?.ngayKT) : null}
                                    format="DD/MM/YYYY HH:mm"
                                    locale={locale?.DatePicker}
                                    showTime style={{ width: "100%" }}
                                />
                            </div>

                        </div>
                    </div> */}
                    <div className='pb-3'>
                        <p className='bold'>Số phiếu thực hiện: </p>
                        <Input type="number" defaultValue={cuocKhaoSat?.chiTieu} onChange={(e) => onChange("chiTieu", e?.target?.value)} placeholder="Tổng toàn bộ phiếu cần thực hiện" />
                    </div>

                </div >
            }
        </Modal>

    );
};

export default CuocKhaoSatModal;
