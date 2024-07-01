
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import SapXep from 'app/common/SapXep';
const { TextArea } = Input;
const CuocKhaoSatModal = ({ open, setOpen, cuocKhaoSatUp, reLoadList }) => {
    const [cuocKhaoSat, setCuocKhaoSat] = useState();
    const [listBieuMau, setListBieuMau] = useState([]);
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
        setCuocKhaoSat()
        let listBieuMau = await Services.getFormService().getMyListForm()
        if (listBieuMau.data) {
            setListBieuMau(SapXep.sapXepTheoObjectAtr(listBieuMau?.data, "tenBieuMau", 1)?.map(obj => {
                return { value: obj._id, label: obj?.maBieuMau + " - " + obj.tenBieuMau };
            }))
        }
        setLoading(false)

    }
    const handleOk = () => { }
    const onChange = (arr, value) => {
        setCuocKhaoSat({ ...cuocKhaoSat, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        console.log(cuocKhaoSat);
        Services?.getCuocKhaoSatService()?.taoMoiKhaoSat(cuocKhaoSat)?.then(
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
        <Modal title="THÊM MỚI KHẢO SÁT" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,
                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!cuocKhaoSatUp?._id ? "Tạo mới" : "Cập nhật"}
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
                        <p className='bold'> Biểu mẫu: </p>
                        <Select
                            allowClear
                            defaultValue={cuocKhaoSat?.bieuMau?._id}
                            style={{ width: '100%' }}
                            showSearch
                            onChange={(value) => onChange("bieuMau", value ? { _id: value } : null)}
                            options={listBieuMau}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            placeholder="Chọn mẫu biểu mẫu để khảo sát"
                        />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Tiêu đề: </p>
                        <Input defaultValue={cuocKhaoSat?.tieuDe} onChange={(e) => onChange("tieuDe", e?.target?.value)} placeholder="Nhập tên đơn vị" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea defaultValue={cuocKhaoSat?.moTa} onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập mô tả" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Giới hạn thời gian trả lời khỏa sát: </p>
                        <div className='flex justify-between'>
                            <DatePicker
                                onChange={(e) => onChange("ngayBD", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                format="DD/MM/YYYY HH:mm"
                                locale={locale?.DatePicker}
                                defaultValue={cuocKhaoSatUp?.ngayBD ? dayjs(cuocKhaoSatUp?.ngayBD) : null}
                                showTime
                                style={{ width: "100%", marginRight: "10px" }}
                            />

                            <DatePicker
                                onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                defaultValue={cuocKhaoSatUp?.ngayKT ? dayjs(cuocKhaoSatUp?.ngayKT) : null}
                                format="DD/MM/YYYY HH:mm"
                                locale={locale?.DatePicker}
                                showTime style={{ width: "100%" }}
                            />

                        </div>


                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Chỉ tiêu: </p>
                        <Input type="number" defaultValue={cuocKhaoSat?.chiTieu} onChange={(e) => onChange("chiTieu", e?.target?.value)} placeholder="Tổng toàn bộ khảo sát cần đạt" />
                    </div>

                </div >
            }
        </Modal>

    );
};

export default CuocKhaoSatModal;
