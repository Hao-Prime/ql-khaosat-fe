
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const NguoiDungModal = ({ open, setOpen, nguoiDungUp, reLoadList }) => {
    const [nguoiDung, setNguoiDung] = useState(nguoiDungUp);
    const [listNguoiDungTT, setListNguoiDungTT] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (open) {
            realoadListSelect()

        }
    }, [open]);
    async function realoadListSelect() {
        setLoading(true)
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
        if (!nguoiDungUp?._id) {
            Services?.getNguoiDungService()?.save(nguoiDung)?.then(
                (res) => {

                    if (res?.data?.error) {
                        setError(res?.data?.mesage)
                    } else {
                        setOpen(false);
                        message.success("Lưu thành công")
                        reLoadList()
                    }
                    setSending(true)
                }
            )
        } else {
            Services?.getNguoiDungService()?.update(nguoiDung)?.then(
                (res) => {

                    if (res?.data?.error) {
                        setError(res?.data?.mesage)
                    } else {
                        setOpen(false);
                        message.success("Lưu thành công")
                        reLoadList()
                    }
                    setSending(true)
                }
            )
        }
    }
    return (
        <Modal title="NGƯỜI DÙNG" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

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
                        <p className='bold'>Họ và tên: </p>
                        <Input defaultValue={nguoiDung?.hoTen} onChange={(e) => onChange("tenNguoiDung", e?.target?.value)} placeholder="Họ tên" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'>Số điện thoại: </p>
                        <Input defaultValue={nguoiDung?.soDienThoai} onChange={(e) => onChange("soDienThoai", e?.target?.value)} placeholder="Nhập số điện thoại" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'>Email: </p>
                        <Input defaultValue={nguoiDung?.email} onChange={(e) => onChange("email", e?.target?.value)} placeholder="Nhập email" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Vai trò: </p>
                        <Select
                            mode="multiple"
                            defaultValue={nguoiDung?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => obj?.vaiTro?._id)}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange("listVaiTro", { _id: value })}
                            options={listNguoiDungTT}
                        />
                    </div>

                </div >
            }
        </Modal>

    );
};

export default NguoiDungModal;
