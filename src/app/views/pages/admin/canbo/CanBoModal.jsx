
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { Children, useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
import { useSelector } from 'react-redux';
import locale from 'antd/lib/locale/vi_VN';
import dayjs from 'dayjs';
const { TextArea } = Input;
const CanBoModal = ({ open, setOpen, canBoUp, reLoadList }) => {
    const [canBo, setCanBo] = useState(canBoUp);
    const [listVaiTro, setListVaiTro] = useState([]);
    const [listDonVi, setListDonVi] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const taiKhoan = useSelector(state => state.taiKhoan)
    useEffect(() => {
        if (open) {
            realoadListSelect()
        }
    }, [open]);

    async function realoadListSelect() {
        setLoading(true)
        setSending(false)
        setCanBo(canBoUp)
        let dataRSLisstDv = await Services.getNguoiDungService().getSelectVaiTro()
        let resListAllDonVi = (await Services.getDonViService().getSelectToanBoDonViDuoi())?.data
        if (dataRSLisstDv.data) {
            setListVaiTro(dataRSLisstDv?.data?.map(obj => {
                return { value: obj._id, label: obj.tenVaiTro };
            }))
            setListDonVi(formatDataDonVi(resListAllDonVi))
        }
        setLoading(false)

    }
    const handleOk = () => { }
    const onChange = (arr, value) => {
        setCanBo({ ...canBo, [arr]: value })
    }
    function formatDataDonVi(list) {
        let rs = []
        list?.forEach(element => {
            rs.push({ ...element, value: element?._id, title: element.tenDonVi, children: formatDataDonVi(element?.children) })
        });
        return rs;
    }
    const onSubmit = () => {
        setSending(true);
        Services?.getNguoiDungService()?.saveCanBo(
            {
                ...canBo,
                vaiTroTaiKhoanList: canBo?.vaiTroTaiKhoanList?.map(obj => { return { vaiTro: { _id: obj } } })
            })?.then(
                (res) => {
                    if (res?.data?.error) {
                        setError(res?.data?.mesage)
                    } else {
                        setOpen(false);
                        message.success("Lưu thành công")
                        reLoadList()
                    }

                }
            ).catch((e) => setSending(false))
    }
    return (
        <Modal title="CÁN BỘ PHỤ TRÁCH" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText="" maskClosable={false}

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!canBoUp?._id ? "Tạo mới" : "Cập nhật"}
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
                            defaultValue={canBo?.canBoTrucThuoc?._id}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange("canBoTrucThuoc", { _id: value })}
                            options={listCanBoTT}
                        />
                    </div> */}
                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Thuộc đơn vị:</p>
                        <TreeSelect
                            style={{
                                width: '100%',
                            }}
                            value={canBo?.donVi?._id}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            treeData={listDonVi}
                            placeholder="Chọn đơn vị"

                            onChange={(newValue) => onChange("donVi", { _id: newValue })}
                        />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Họ và tên:</p>
                        <Input defaultValue={canBo?.hoTen} onChange={(e) => onChange("hoTen", e?.target?.value)} placeholder="Họ tên" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Số điện thoại:</p>
                        <Input defaultValue={canBo?.soDienThoai} onChange={(e) => onChange("soDienThoai", e?.target?.value)} placeholder="Nhập số điện thoại" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'>Giới tính: </p>
                        <Radio.Group onChange={(e) => onChange("gioiTinh", e?.target?.value)} defaultValue={canBo?.gioiTinh ? 1 : 0}>
                            <Radio value={1}>Nam</Radio>
                            <Radio value={0}>Nữ</Radio>

                        </Radio.Group>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'>Email: </p>
                        <Input defaultValue={canBo?.email} onChange={(e) => onChange("email", e?.target?.value)} placeholder="Nhập email" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Ngày sinh: </p>
                        <div className='flex justify-between'>
                            <DatePicker
                                onChange={(e) => onChange("ngaySinh", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                format="DD/MM/YYYY"
                                locale={locale?.DatePicker}
                                defaultValue={canBo?.ngaySinh ? dayjs(canBo?.ngaySinh) : null}

                                style={{ width: "100%", marginRight: "10px" }}
                            />
                        </div>
                    </div>

                    <div className='pb-3'>
                        <p className='bold'><span className='red'>*</span> Vai trò:</p>
                        <Select
                            mode="multiple"
                            defaultValue={canBo?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => obj?.vaiTro?._id)}
                            style={{ width: '100%' }}
                            onChange={(value) => onChange("vaiTroTaiKhoanList", value)}
                            options={listVaiTro}
                            placeholder="Chọn vai trò cán bộ"
                        />
                    </div>

                </div >
            }
        </Modal>

    );
};

export default CanBoModal;
