
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect, Switch } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const DoiTuongModal = ({ open, setOpen, doiTuongUp, reLoadList }) => {
    const [doiTuong, setDoiTuong] = useState(doiTuongUp);
    const [listDoiTuongTT, setListDoiTuongTT] = useState([]);
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
        setDoiTuong(doiTuongUp)
        await new Promise(resolve => setTimeout(resolve, 50));
        console.log(doiTuongUp);
        setLoading(false)
    }
    const onChange = (arr, value) => {
        setDoiTuong({ ...doiTuong, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!doiTuongUp?._id) {
            Services?.getDoiTuongService()?.save(doiTuong)?.then(
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
            Services?.getDoiTuongService()?.update(doiTuong)?.then(
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
        <Modal title="ĐỐI TƯỢNG KHẢO SÁT" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!doiTuongUp?._id ? "Tạo mới" : "Cập nhật"}
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
                        <p className='bold'> Tên đối tượng *: </p>
                        <Input defaultValue={doiTuongUp?.tenDoiTuong} onChange={(e) => onChange("tenDoiTuong", e?.target?.value)} placeholder="Nhập tên " />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea rows={10} defaultValue={doiTuongUp?.moTa} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Thứ tự: </p>
                        <Input defaultValue={doiTuongUp?.stt} onChange={(e) => onChange("stt", e?.target?.value)} placeholder="Nhập stt " />
                    </div>
                    <div className='pb-3 div-flex justify-between'>
                        <p className='bold mb-1'> Trạng thái </p>
                        <Switch checkedChildren="Mở" unCheckedChildren="Khóa" defaultChecked={doiTuongUp?.trangThai ? true : false} onChange={(e) => onChange("trangThai", e ? 1 : 0)} />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default DoiTuongModal;
