
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const DonViModal = ({ open, setOpen, donViUp, reLoadList }) => {
    const [donVi, setDonVi] = useState(donViUp);
    const [listDonViTT, setListDonViTT] = useState([]);
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
        setDonVi(donViUp)
        let dataRSLisstDv = await Services.getDonViService().getAll("")
        if (dataRSLisstDv.data) {
            setListDonViTT(dataRSLisstDv?.data?.map(obj => {
                return { value: obj._id, label: obj.tenDonVi };
            }))
        }
        setLoading(false)

    }
    const handleOk = () => { }
    const onChange = (arr, value) => {
        setDonVi({ ...donVi, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!donViUp?._id) {
            Services?.getDonViService()?.save(donVi)?.then(
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
            Services?.getDonViService()?.update(donVi)?.then(
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
        <Modal title="ĐƠN VỊ" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!donViUp?._id ? "Tạo mới" : "Cập nhật"}
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
                        <p className='bold'> Đơn vị trực thuộc: </p>
                        <Select
                            defaultValue={donVi?.donViTrucThuoc?._id}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange("donViTrucThuoc", { _id: value })}
                            options={listDonViTT}
                        />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Tên đơn vị *: </p>
                        <Input defaultValue={donVi?.tenDonVi} onChange={(e) => onChange("tenDonVi", e?.target?.value)} placeholder="Nhập tên đơn vị" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea defaultValue={donVi?.tenDonVi} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Thứ tự: </p>
                        <Input type="number" defaultValue={donVi?.stt} onChange={(e) => onChange("stt", e?.target?.value)} placeholder="Nhập tên đơn vị" />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default DonViModal;
