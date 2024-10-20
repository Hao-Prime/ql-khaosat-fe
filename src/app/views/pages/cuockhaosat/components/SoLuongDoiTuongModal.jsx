
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const SoLuongDoiTuongModal = ({ open, setOpen, doiTuongUp, listDoiTuongKhaoSat, setListDoiTuongKhaoSat }) => {
    const [doiTuong, setDoiTuong] = useState(doiTuongUp);
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
        if (doiTuong.soLuong < 0) {
            setError("Số lượng không được < 0")
            setSending(false);
        } else {
            let rs = []
            listDoiTuongKhaoSat?.forEach(element => {
                if (element?._id == doiTuong?._id) {
                    rs.push({ ...element, soLuong: doiTuong?.soLuong,ghiChu: doiTuong?.ghiChu })
                } else {
                    rs.push(element)
                }

            });
            setListDoiTuongKhaoSat(rs)
            setSending(false)
            setOpen(false)
        }

    }
    return (
        <Modal title={"GIAO SỐ LƯỢNG " + doiTuong?.tenDoiTuong} open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    Thêm
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
                        <p className='bold'> Số phiếu *: </p>
                        <Input type='number' defaultValue={doiTuongUp?.soLuong} onChange={(e) => onChange("soLuong", e?.target?.value)} placeholder="Nhập số phiếu" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea defaultValue={doiTuongUp?.ghiChu} onChange={(e) => onChange("ghiChu", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default SoLuongDoiTuongModal;
