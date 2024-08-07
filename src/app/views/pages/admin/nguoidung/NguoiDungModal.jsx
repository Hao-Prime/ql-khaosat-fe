
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
import { useSelector } from 'react-redux';
import locale from 'antd/lib/locale/vi_VN';
import dayjs from 'dayjs';
const { TextArea } = Input;
const NguoiDungModal = ({ open, setOpen, nguoiDungUp, reLoadList }) => {
    const [nguoiDung, setNguoiDung] = useState(nguoiDungUp);
    const [listNguoiDungTT, setListNguoiDungTT] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const taiKhoan = useSelector(state => state.taiKhoan)
    useEffect(() => {
        if (open) {
            realoadListSelect()
        }
    }, [open]);

    async function realoadListSelect() {
        setLoading(true)
        setSending(false)
        setNguoiDung(nguoiDungUp)
        let dataRSLisstDv = await Services.getNguoiDungService().getSelectVaiTro()
        if (dataRSLisstDv.data) {
            setListNguoiDungTT(dataRSLisstDv?.data?.map(obj => {
                return { value: obj._id, label: obj.tenVaiTro };
            }))
        }
        setLoading(false)

    }
    const handleOk = () => { }
    const onChange = (arr, value) => {
        setNguoiDung({ ...nguoiDung, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        Services?.getNguoiDungService()?.saveNgKhaoSat(
            {
                ...nguoiDung,
                donVi: taiKhoan?.donVi,
                vaiTroTaiKhoanList: nguoiDung.taiKhoan?.vaiTroTaiKhoanList
            })?.then(
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
    }
    return (
        <Modal title="NGƯỜI KHẢO SÁT" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!nguoiDungUp?._id ? "Tạo mới" : "Cập nhật"}
                </Button>,
                <Button key="back" onClick={() => setOpen(!open)}>
                    Hủy
                </Button>
            ]}
        >
            {loading ? <Loading />
                :
                <div className="div-setting-cus">
                    {/* <div className='pb-3'>
                        <p className='bold'> Đơn vị trực thuộc: </p>
                        <Select
                            defaultValue={nguoiDung?.nguoiDungTrucThuoc?._id}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange("nguoiDungTrucThuoc", { _id: value })}
                            options={listNguoiDungTT}
                        />
                    </div> */}
                    <div className='pb-3'>
                        <p><span className='bold'>Thuộc đơn vị:</span> {taiKhoan?.donVi?.tenDonVi}</p>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Họ và tên:</p>
                        <Input defaultValue={nguoiDung?.hoTen} onChange={(e) => onChange("hoTen", e?.target?.value)} placeholder="Họ tên" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Số điện thoại: </p>
                        <Input defaultValue={nguoiDung?.soDienThoai} onChange={(e) => onChange("soDienThoai", e?.target?.value)} placeholder="Nhập số điện thoại" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'>Giới tính: </p>
                        <Radio.Group onChange={(e) => onChange("gioiTinh", e?.target?.value)} defaultValue={nguoiDung?.gioiTinh ? 1 : 0}>
                            <Radio value={1}>Nam</Radio>
                            <Radio value={0}>Nữ</Radio>

                        </Radio.Group>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'>Email: </p>
                        <Input defaultValue={nguoiDung?.email} onChange={(e) => onChange("email", e?.target?.value)} placeholder="Nhập email" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Ngày sinh: </p>
                        <div className='flex justify-between'>
                            <DatePicker
                                onChange={(e) => onChange("ngaySinh", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                format="DD/MM/YYYY"
                                locale={locale?.DatePicker}
                                defaultValue={nguoiDung?.ngaySinh ? dayjs(nguoiDung?.ngaySinh) : null}

                                style={{ width: "100%", marginRight: "10px" }}
                            />
                        </div>
                    </div>

                    {/* <div className='pb-3'>
                        <p className='bold'> Vai trò: </p>
                        <Select
                            mode="multiple"
                            defaultValue={nguoiDung?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => obj?.vaiTro?._id)}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange("listVaiTro", { _id: value })}
                            options={listNguoiDungTT}
                        />
                    </div> */}

                </div >
            }
        </Modal>

    );
};

export default NguoiDungModal;
