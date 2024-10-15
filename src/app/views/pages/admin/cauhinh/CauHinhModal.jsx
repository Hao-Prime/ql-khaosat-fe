
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const CauHinhModal = ({ open, setOpen, cauHinhUp, reLoadList }) => {
    const [cauHinh, setCauHinh] = useState(cauHinhUp);
    const [listCauHinhTT, setListCauHinhTT] = useState([]);
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
        setCauHinh(cauHinhUp)
        await new Promise(resolve => setTimeout(resolve, 50));
        console.log(cauHinhUp);
        setLoading(false)
    }
    const onChange = (arr, value) => {
        setCauHinh({ ...cauHinh, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!cauHinhUp?._id) {
            Services?.getCauHinhService()?.save(cauHinh)?.then(
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
            Services?.getCauHinhService()?.update(cauHinh)?.then(
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
        <Modal title="CẤU HÌNH THAM SỐ" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!cauHinhUp?._id ? "Tạo mới" : "Cập nhật"}
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
                        <p className='bold'> Key <span className='red'>*</span>: </p>
                        <Input defaultValue={cauHinhUp?.key} onChange={(e) => onChange("key", e?.target?.value)} placeholder="Nhập key" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'> Giá trị: </p>
                        <TextArea
                            rows={4}
                            defaultValue={cauHinh?.value
                                ? JSON.stringify(cauHinh.value, null, 2)
                                    .replace(/\\"/g, '"')
                                    .replace(/\\\\/g, '\\')
                                : ""
                            }
                            onChange={(e) => {
                                let inputValue = e.target.value;

                                inputValue = inputValue.replace(/:(\s*)"(.*?)"(,|\s*}|$)/g, (match, p1, p2, p3) => {
                                    return `:${p1}"${p2.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"${p3}`;
                                });
                                try {
                                    const parsedValue = JSON.parse(inputValue);
                                    onChange("value", parsedValue);
                                    setError("");
                                } catch (err) {
                                    setError("Dữ liệu không đúng định dạng JSON");
                                }
                            }}
                            placeholder={`Nhập value dạng JSON có dạng:\n{\n  "tieuDe": "Tiêu đề",\n  "noiDung": "Nội dung"\n}`}
                        />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default CauHinhModal;
