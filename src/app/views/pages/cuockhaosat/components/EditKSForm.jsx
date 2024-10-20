import React, { useEffect, useState } from 'react'
import Services from 'app/services';
import { Button, Divider, Modal, Select } from 'antd';
import EditForm from '../../mylistformpage/components/EditForm';
import { CircularProgress } from '@mui/material';
const { Option } = Select;
const EditKSForm = ({ cuocKhaoSat, loading2, keHoach }) => {
    const [loading, setLoading] = useState(true)
    const [listBieuMau, setListBieuMau] = useState([]);
    const [loadingBieuMau, setLoadingBieuMau] = useState(false)
    const [cuocKhaoSatUpdate, setCuocKhaoSatUpdate] = useState(cuocKhaoSat);
    const [modal, contextHolder] = Modal.useModal();
    const [sending, setSending] = useState(false);
    useEffect(() => {
        reLoadList()
    }, []);
    function reLoadList() {
        realoadListSelect()
    }
    const onChange = (arr, value) => {

        setCuocKhaoSatUpdate({ ...cuocKhaoSatUpdate, [arr]: value })

    };
    async function realoadListSelect() {
        setLoading(true)
        setLoadingBieuMau(true)
        let listBieuMau = await Services.getFormService().getMyListForm()
        if (listBieuMau.data) {
            setListBieuMau(listBieuMau?.data)
        }
        setLoadingBieuMau(false)
        setLoading(false)
    }
    const handleDropdownVisibleChangeBieuMau = async (open) => {
        if (open) {
            let res = await Services.getFormService().getMyListForm()
            if (res.data) {
                setListBieuMau(res?.data)
            }
        }
    };
    async function thietLapBieuMauCoSan() {
        const confirmed = await modal.confirm({
            title: "Bạn có chắc muốn thiết lập lại biểu mẫu",
            content: "Điều này có thể làm mất các thiết kế trước đó của bạn",
        });
        if (confirmed) {
            setSending(true);
            Services.getCuocKhaoSatService().capNhatBieuMauKhaoSat({ ...cuocKhaoSatUpdate, thanhPhan: "" }).then(
                async (res) => {
                    if (res?.data?.error) {
                        setSending(false);
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        window.location.reload()
                    }
                }
            )

        }
    }
    return (
        <div>
            {!loading2 &&
                <>
                    {contextHolder}
                    <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed className='m-1 p-2 bold'>Chọn biểu mẫu có sẵn</Divider>

                    <div className='pb-3'>
                        {/* <p ><span className='bold'>Chọn biểu mẫu có sẵn</span> </p> */}
                        <div className='div-flex'>
                            <Select
                                allowClear
                                onDropdownVisibleChange={handleDropdownVisibleChangeBieuMau}  // Gọi API khi dropdown mở
                                loading={loadingBieuMau}  // Hiển thị Spin nếu đang load dữ liệu
                                defaultValue={cuocKhaoSat?.bieuMau?._id}
                                style={{ width: 'calc(100% - 70px)' }}
                                showSearch
                                onChange={(value) => onChange("bieuMau", value ? { _id: value } : null)}
                                filterOption={(input, option) =>
                                    option?.children?.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa/chữ thường
                                }
                                placeholder="Chọn mẫu biểu mẫu để khảo sát"
                            >
                                {loadingBieuMau ? (
                                    <Option disabled key="loading">Loading...</Option>
                                ) : (
                                    listBieuMau.map((item) => (
                                        <Option key={item._id} value={item?._id}>
                                            {item.tenBieuMau}
                                        </Option>
                                    ))
                                )}
                            </Select>
                            <Button type="primary" className='ms-1' onClick={() => thietLapBieuMauCoSan()} disabled={sending}>
                                <span style={{ display: sending ? 'inherit' : 'none' }}>
                                    <CircularProgress className="span-sender" />
                                </span>
                                Thiết lập
                            </Button>
                        </div>

                        <p className='text-left'> <i><a className='red f-12' href='/quan-tri/bieu-mau?my=1' target='_blank'> Tạo biểu mẫu mới</a></i></p>

                    </div>
                    <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed className='m-1 p-2 bold'>Thiết kế lại biểu mẫu</Divider>
                    <EditForm keHoach={keHoach} bieuMau={cuocKhaoSat} ServiceSave={Services.getCuocKhaoSatService().capNhatKhaoSat} />
                </>}
        </div>
    );
};

export default EditKSForm;
