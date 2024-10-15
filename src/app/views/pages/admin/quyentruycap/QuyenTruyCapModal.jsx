
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const QuyenTruyCapModal = ({ open, setOpen, vaiTroUp, setVaiTroUp, reLoadList }) => {
    const [vaiTro, setVaiTro] = useState(vaiTroUp);
    const [listVaiTroTT, setListVaiTroTT] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (open) {
            setLoading(true)
            realoadListSelect()
        } else {
            setVaiTroUp()
        }
    }, [open]);
    async function realoadListSelect() {

        setSending(false)
        setVaiTro(vaiTroUp)
        await new Promise(resolve => setTimeout(resolve, 50));

        setLoading(false)
    }

    const onChange = (arr, value) => {
        setVaiTro({ ...vaiTro, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!vaiTroUp?._id) {
            Services?.getVaiTroService()?.save({ ...vaiTro, listRoles: [], phanLoai: 1 })?.then(
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
            Services?.getVaiTroService()?.update([vaiTro])?.then(
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
    const onDelete = () => {
        Services?.getVaiTroService()?.deleteByID(vaiTro?._id)?.then(
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
    return (
        <Modal title="VAI TRÒ" open={open} onOk={onSubmit} onCancel={() => { setOpen(!open); setVaiTroUp() }} okText="" maskClosable={false}

            footer={[
                <span className='me-1 red'>{error}</span>,
                ...(vaiTroUp?._id && vaiTroUp?.phanLoai > 0 ? [<Button key="submit" type="primary" danger onClick={onDelete} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    Xóa
                </Button>] : []),
                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!vaiTroUp?._id ? "Tạo mới" : "Cập nhật"}
                </Button>,
                <Button key="back" onClick={() => setOpen(!open)}>
                    Hủy
                </Button>
            ]}
        >
            {(loading) ? <Loading />
                :
                <div className="div-setting-cus">

                    <div className='pb-3'>
                        <p className='bold'> Tên vai trò *: </p>
                        <Input defaultValue={vaiTroUp?.moTa} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập tên đơn vị" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Ký hiệu *: </p>
                        <Input defaultValue={vaiTroUp?.tenVaiTro} onChange={(e) => onChange("tenVaiTro", e?.target?.value)} placeholder="Nhập tên đơn vị" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Thứ tự: </p>
                        <Input type="number" defaultValue={vaiTroUp?.stt} onChange={(e) => onChange("stt", e?.target?.value)} placeholder="Nhập tên đơn vị" />
                    </div>
                </div >
            }
        </Modal >

    );
};

export default QuyenTruyCapModal;
