
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect, Switch } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const NhomDoiTuongModal = ({ open, setOpen, nhomDoiTuongUp, reLoadList }) => {
    const [nhomDoiTuong, setNhomDoiTuong] = useState(nhomDoiTuongUp);
    const [listNhomDoiTuongTT, setListNhomDoiTuongTT] = useState([]);
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
        setSending(false)
        setNhomDoiTuong(nhomDoiTuongUp)
        await new Promise(resolve => setTimeout(resolve, 50));
        console.log(nhomDoiTuongUp);
        setLoading(false)
    }
    const onChange = (arr, value) => {
        setNhomDoiTuong({ ...nhomDoiTuong, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!nhomDoiTuong?.ten) {
            setError("Tên nhóm đối tượng không được để trống")
            setSending(false);
        } else {
            setError(true)
            if (!nhomDoiTuongUp?._id) {
                Services?.getNhomDoiTuongService()?.save(nhomDoiTuong)?.then(
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
                Services?.getNhomDoiTuongService()?.update(nhomDoiTuong)?.then(
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

    }
    return (
        <Modal title="NHÓM ĐỐI TƯỢNG" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText="" maskClosable={false}

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!nhomDoiTuongUp?._id ? "Tạo mới" : "Cập nhật"}
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
                        <p className='bold'> Tiêu đề <span className='red'>*</span>: </p>
                        <Input defaultValue={nhomDoiTuongUp?.ten} onChange={(e) => onChange("ten", e?.target?.value)} placeholder="Nhập tên VD: Quyết đnh số, nhóm đói tượng hành chính ,.." />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea rows={10} defaultValue={nhomDoiTuongUp?.moTa} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Thứ tự: </p>
                        <Input defaultValue={nhomDoiTuongUp?.stt} onChange={(e) => onChange("stt", e?.target?.value)} placeholder="Nhập stt " />
                    </div>
                    <div className='pb-3 div-flex justify-between'>
                        <p className='bold mb-1'> Trạng thái </p>
                        <Switch checkedChildren="Mở" unCheckedChildren="Khóa" defaultChecked={nhomDoiTuongUp?.trangThai ? true : false} onChange={(e) => onChange("trangThai", e ? 1 : 0)} />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default NhomDoiTuongModal;
