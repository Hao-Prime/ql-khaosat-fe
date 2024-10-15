
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect, Switch } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const { Option } = Select;
const DoiTuongKhaoSatModal = ({ open, setOpen, doiTuongKhaoSatUp, reLoadList }) => {
    const [doiTuongKhaoSat, setDoiTuongKhaoSat] = useState(doiTuongKhaoSatUp);
    const [listDoiTuongKhaoSatTT, setListDoiTuongKhaoSatTT] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [listNDT, setListNDT] = useState([]);
    const [loadingNDT, setLoadingNDT] = useState(false);
    useEffect(() => {
        if (open) {
            realoadListSelect()
        }
    }, [open]);
    async function realoadListSelect() {
        setLoading(true)
        setSending(false)
        setDoiTuongKhaoSat(doiTuongKhaoSatUp)
        let res = await Services.getNhomDoiTuongService().getAll("")
        if (res.data) {
            setListNDT(res?.data)
        }
        setLoading(false)
    }
    const onChange = (arr, value) => {
        setDoiTuongKhaoSat({ ...doiTuongKhaoSat, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!doiTuongKhaoSat?.nhomDoiTuong) {
            setError("Nhóm đối tượng không được để trống")
            setSending(false);
        } else if (!doiTuongKhaoSat?.ten) {
            setError("Tên đối tượng không được để trống")
            setSending(false);
        } else {
            setError(true)
            if (!doiTuongKhaoSatUp?._id) {
                Services?.getDoiTuongKhaoSatService()?.save(doiTuongKhaoSat)?.then(
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
                Services?.getDoiTuongKhaoSatService()?.update(doiTuongKhaoSat)?.then(
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
    const handleDropdownVisibleChangeNDT = async (open) => {
        if (open) {
            let res = await Services.getNhomDoiTuongService().getAll("")
            if (res.data) {
                setListNDT(res?.data)
            }
        }
    };
    return (
        <Modal title="ĐỐI TƯỢNG KHẢO SÁT" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText="" maskClosable={false}

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!doiTuongKhaoSatUp?._id ? "Tạo mới" : "Cập nhật"}
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
                        <p className='bold'> Nhóm đối tượng <span className='red'>*</span>: <i><a className='red f-12 pointer' href='/quan-tri/nhom-doi-tuong' target='_blank'> Tạo nhóm mới</a></i></p>
                        <Select
                            allowClear
                            onDropdownVisibleChange={handleDropdownVisibleChangeNDT}  // Gọi API khi dropdown mở
                            loading={loadingNDT}  // Hiển thị Spin nếu đang load dữ liệu
                            defaultValue={doiTuongKhaoSat?.nhomDoiTuong?._id}
                            style={{ width: '100%' }}
                            showSearch
                            onChange={(value) => onChange("nhomDoiTuong", value ? { _id: value } : null)}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa/chữ thường
                            }
                            placeholder="Chọn nhóm đối tượng"
                        >
                            {loadingNDT ? (
                                <Option disabled key="loading">Loading...</Option>
                            ) : (
                                listNDT.map((item) => (
                                    <Option key={item._id} value={item?._id}>
                                        {item.ten}
                                    </Option>
                                ))
                            )}
                        </Select>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Tên đối tượng <span className='red'>*</span>: </p>
                        <Input defaultValue={doiTuongKhaoSatUp?.ten} onChange={(e) => onChange("ten", e?.target?.value)} placeholder="Nhập tên VD: UBND Huyện/Xã,.." />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea rows={10} defaultValue={doiTuongKhaoSatUp?.moTa} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Thứ tự: </p>
                        <Input defaultValue={doiTuongKhaoSatUp?.stt} onChange={(e) => onChange("stt", e?.target?.value)} placeholder="Nhập stt " />
                    </div>
                    <div className='pb-3 div-flex justify-between'>
                        <p className='bold mb-1'> Trạng thái </p>
                        <Switch checkedChildren="Mở" unCheckedChildren="Khóa" defaultChecked={doiTuongKhaoSatUp?.trangThai ? true : false} onChange={(e) => onChange("trangThai", e ? 1 : 0)} />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default DoiTuongKhaoSatModal;
