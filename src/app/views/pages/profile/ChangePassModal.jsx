
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message } from 'antd';
import Services from 'app/services';

const ChangePassModal = ({ open, setOpen }) => {
    const [nguoiDung, setnguoiDung] = useState();
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    useEffect(() => {
        if (open) {
            setnguoiDung()
        }
    }, [open]);
    const onChange = (arr, value) => {
        setnguoiDung({ ...nguoiDung, [arr]: value })
    }
    const onSubmit = async () => {
        setSending(true);
        if (nguoiDung?.matKhauMoi != nguoiDung.matKhauMoi2) {
            setError("Nhập lại mật khẩu mới không hợp lệ")
            return
        }
        const res = await Services?.getTaiKhoanService()?.doiMatKhau(nguoiDung);
        console.log(res?.data?.error);
        if (res?.data?.error) {
            setError(res?.data?.message);
        } else {
            alert("Lưu thành công");
            window.location.reload();
        }
        setSending(false);
        // Services?.getTaiKhoanService()?.doiMatKhau(nguoiDung)?.then(
        //     (res) => {
        //         if (res?.data?.error) {
        //             setError(res?.data?.mesage)
        //         } else {
        //             alert("Lưu thành công")
        //             window.location.reload()
        //         }
        //         setSending(true)
        //     }
        // )

    }
    return (
        <Modal title="ĐỔI MẬT KHẨU" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,
                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    Lưu
                </Button>,
                <Button key="back" onClick={() => setOpen(!open)}>
                    Hủy
                </Button>
            ]}
        >

            <div className="div-setting-cus">

                <div className='pb-3'>
                    <p className='bold'> Mật khẩu cũ*: </p>
                    <Input type='password' onChange={(e) => onChange("matKhauCu", e?.target?.value)} placeholder="Nhập mật khẩu cũ" />
                </div>
                <div className='pb-3'>
                    <p className='bold'> Mật khẩu mới *: </p>
                    <Input type='password' onChange={(e) => onChange("matKhauMoi", e?.target?.value)} placeholder="Nhập mật khẩu mới" />
                </div>
                <div className='pb-3'>
                    <p className='bold'> Nhập lại Mật khẩu mới *: </p>
                    <Input type='password' onChange={(e) => onChange("matKhauMoi2", e?.target?.value)} placeholder="Nhập lại mật khẩu mới" />
                </div>


            </div >

        </Modal>

    );
};

export default ChangePassModal;
