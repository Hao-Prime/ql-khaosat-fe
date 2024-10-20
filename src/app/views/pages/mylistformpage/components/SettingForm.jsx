import { Button, DatePicker, Divider, Input, Modal, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Upload } from 'antd';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import { CircularProgress } from '@mui/material';
import Loading from 'app/components/Loading';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const SettingForm = ({ bieuMau, reloadList }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [value, setValue] = useState(1);
    const [bieuMauUpdate, setBieuMauUpdate] = useState(bieuMau);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const onChange = (arr, value) => {
        setBieuMauUpdate({ ...bieuMauUpdate, [arr]: value })
        // console.log('radio checked', e.target.value);
        // setValue(e.target.value);
    };
    const [anhBia, setAnhBia] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const [loading2, setLoading2] = useState(false);
    useEffect(() => {
        if (bieuMau) {
            if (bieuMau?.anhBia) {
                setImageUrl(`${process.env.REACT_APP_URL_SERVER}/be-form/public/show-file?stringID=${bieuMau?.anhBia?._id}`)
            }

            setAnhBia()
            setLoading2(false)
            setBieuMauUpdate(bieuMau)
        }
    }, [bieuMau]);

    const handleVoHieuHoaBieuMau = () => {
        setSending(true);
        Services.getFormService().capNhatThongTinBieuMau({ ...bieuMauUpdate, thanhPhan: "", trangThai: bieuMauUpdate?.trangThai == 1 ? 0 : 1 }).then(
            async (res) => {
                setSending(false);
                if (res?.data?.error) {
                    Modal.error({
                        title: 'Lỗi',
                        content: res?.data?.message,
                    });

                } else {

                    message.success("Lưu thành công")
                    reloadList()
                }
            }
        )
    }
    const handleDelete = async () => {
        const confirmed = await modal.confirm({
            title: "Bạn có chắc muốn xóa biểu mẫu này",
            content: "",
        });
        if (confirmed) {
            setSending(true);
            Services.getFormService().xoaBieuMau(bieuMauUpdate?._id).then(
                (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        Modal.success({
                            title: 'Success',
                            content: "Biểu mẫu đã được xóa",
                            onOk() {
                                window.location.href = "/quan-tri/bieu-mau";
                            },
                            onCancel() {
                                window.location.href = "/quan-tri/bieu-mau";
                            }
                        });
                    }
                }
            )
        }
    }
    const handleOk = () => {
        setSending(true);
        setError("")
        if (checkBieuMau()) {
            Services.getFormService().capNhatThongTinBieuMau({ ...bieuMauUpdate, thanhPhan: "" }).then(
                async (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        if (anhBia) {
                            let formData = new FormData();
                            formData.append('file', anhBia);
                            formData.append("id", res?.data);
                            await Services.getFormService().luuAnhBia(formData, res?.data)
                        }
                        message.success("Lưu thành công")
                    }
                }
            )
        } else {


            setSending(false);
        }

    };
    const checkBieuMau = () => {
        if (!bieuMauUpdate?.tenBieuMau) {
            Modal.error({
                title: 'Lỗi',
                content: "Tên biểu mẫu không được để trống",
            });
            setError()
            return false;
        } else if (!bieuMauUpdate?.loaiBieuMau) {
            Modal.error({
                title: 'Lỗi',
                content: "Cần chọn loại biểu mẫu",
            })
            setError()
            return false;
        } else if (bieuMauUpdate?.ngayBD && bieuMauUpdate?.ngayKT) {
            const ngayBD = dayjs(bieuMauUpdate?.ngayBD);
            const ngayKT = dayjs(bieuMauUpdate?.ngayKT);
            // Kiểm tra nếu ngày bắt đầu trước ngày kết thúc
            if (!ngayBD.isBefore(ngayKT)) {
                Modal.error({
                    title: 'Lỗi',
                    content: "Ngày bắt đầu không trước ngày kết thúc.",
                })
                setError();
                return false;
            }

        }
        return true;
    }
    function checkTrangThaiBieuMau(bieuMau) {
        if (bieuMau?.ngayBD) {
            if (dayjs(bieuMau?.ngayBD).isAfter(dayjs())) {
                return <span className="status-cyan ">Sắp diễn ra</span>// Sắp diễn ra
            }
        }
        if (bieuMau?.ngayKT) {
            if (dayjs(bieuMau?.ngayKT).isBefore(dayjs())) {
                return <span className="status-cuccess ">Đã kết thúc</span>// Đã kết thúc
            }
        }
        return <span className="status-info ">Đang diễn ra</span>;//Đâng diễn ra
    }
    const uploadButton = (
        <div>
            {loading2 ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setError('Bạn chỉ có thể chọn ảnh là png hoặc jprg');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            setError('Ảnh phải bé hơn 10MB');
        }
        return isJpgOrPng && isLt2M;
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const handleChange = (info) => {

        if (info.file.status === 'uploading') {
            setLoading2(true);
            return;
        }
        if (info.file.status === 'done') {
            setAnhBia(info?.file?.originFileObj);
            getBase64(info.file.originFileObj, (url) => {
                setLoading2(false);
                setImageUrl(url);
            });
        }
    };
    const customRequest = ({ file, onSuccess, onError }) => {

        onSuccess();

    };
    return (

        <div className="div-setting-cus">
            {contextHolder}
            {!bieuMauUpdate ? <Loading></Loading> :
                <>
                    <div className='flex justify-between pb-3'>
                        {bieuMauUpdate?.trangThai == 1 ? <>

                            <p className='bold'> Trạng thái: {checkTrangThaiBieuMau(bieuMau)} </p>
                            <Button type="primary" danger className='bg-red flex align-center justify-center' onClick={handleVoHieuHoaBieuMau} disabled={sending}>
                                <span style={{ display: sending ? 'inherit' : 'none' }}>
                                    <CircularProgress className="span-sender" />
                                </span>Vô hiệu hóa</Button>
                        </> : <>
                            <p className='bold'> Trạng thái: <soan className="red">Đã vô hiệu</soan></p>
                            <Button type="primary" success className='bg-green flex align-center justify-center' onClick={handleVoHieuHoaBieuMau} disabled={sending}>
                                <span style={{ display: sending ? 'inherit' : 'none' }}>
                                    <CircularProgress className="span-sender" />
                                </span>Mở khảo sát</Button>

                        </>
                        }

                    </div>
                    {/* <div className='pb-3'>
                        <p className='bold'> Loại biểu mẫu: </p>
                        <Radio.Group onChange={onChange} defaultValue={bieuMauUpdate?.loaiBieuMau}>
                            <Radio value={1}>Cá nhân</Radio>
                            <Radio value={2}>Tổ chức</Radio>

                        </Radio.Group>

                    </div> */}
                    <div className='pb-3'>
                        <p className='bold'> Tên biểu mẫu: </p>
                        <Input placeholder="Basic usage" onChange={(e) => onChange("tenBieuMau", e?.target?.value)} defaultValue={bieuMauUpdate?.tenBieuMau} />

                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Mô tả: </p>
                        <TextArea autoSize={{ minRows: 3 }} onChange={(e) => onChange("moTa", e?.target?.value)} defaultValue={bieuMauUpdate?.moTa} placeholder="Nhập tên biểu mẫu" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'> Ảnh bìa: </p>

                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            multiple={false}
                            accept='.jpg, .jpeg, .png'
                            customRequest={customRequest}

                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>

                    </div>
                    {/* <div className='pb-3'>
                        <p className='bold'> Thời gian biểu mẫu: </p>
                        <div className='flex justify-between'>
                            <DatePicker
                                onChange={(e) => onChange("ngayBD", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                format="DD/MM/YYYY HH:mm"
                                locale={locale?.DatePicker}
                                defaultValue={bieuMauUpdate?.ngayBD ? dayjs(bieuMauUpdate?.ngayBD) : null}
                                showTime
                                style={{ width: "100%", marginRight: "10px" }}
                            />

                            <DatePicker
                                onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                defaultValue={bieuMauUpdate?.ngayKT ? dayjs(bieuMauUpdate?.ngayKT) : null}
                                format="DD/MM/YYYY HH:mm"
                                showTime style={{ width: "100%" }}
                            />

                        </div>


                    </div>
                    */}
                    <div className='pb-3 flex justify-center' >
                        <Button key="submit" type="primary" className='mt-2 bg-info flex align-center justify-center' onClick={handleOk} disabled={sending}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>
                            Cập nhật
                        </Button>

                    </div>
                    <Divider ><p className='red' ></p></Divider>
                    <div className='flex justify-between pb-3 pt-3'>
                        <div >
                            <p className='bold'>Xóa biểu mẫu này</p>
                            <p>Một khi bạn xóa một kho lưu trữ, bạn sẽ không thể quay lại. Xin hãy chắc chắn.</p>
                        </div>
                        <Button type="primary" danger className='bg-red mt-2 flex align-center' onClick={handleDelete} disabled={sending}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>Xóa biểu mẫu</Button>
                    </div>
                </>}
        </div >

    );
};

export default SettingForm;
