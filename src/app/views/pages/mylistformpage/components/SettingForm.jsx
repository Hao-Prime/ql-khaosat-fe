import { Button, DatePicker, Divider, Input, Modal, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Upload } from 'antd';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import dayjs from 'dayjs';
const { TextArea } = Input;
import locale from 'antd/lib/locale/vi_VN';
import { CircularProgress } from '@mui/material';
import Loading from 'app/components/Loading';
const SettingForm = ({ bieuMau, reloadList }) => {

    const [value, setValue] = useState(1);
    const [bieuMauUpdate, setBieuMauUpdate] = useState(bieuMau);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const onChange = (arr, value) => {
        setBieuMauUpdate({ ...bieuMauUpdate, [arr]: value })
        // console.log('radio checked', e.target.value);
        // setValue(e.target.value);
    };
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (bieuMau) {
            setBieuMauUpdate(bieuMau)
        }
    }, [bieuMau]);
    const onChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const handleVoHieuHoaBieuMau = () => {
        setSending(true);
        Services.getFormService().capNhatThongTinBieuMau({ ...bieuMauUpdate, thanhPhan: "", trangThai: bieuMauUpdate?.trangThai == 1 ? 0 : 1 }).then(
            (res) => {
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
    const handleDelete = () => {
        if (confirm("Bạn có chắc muốn xóa biểu mẫu này")) {
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
                                window.location.href = "/danh-sach-bieu-mau";
                            },
                            onCancel() {
                                window.location.href = "/danh-sach-bieu-mau";
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
                (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
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
    return (

        <div className="div-setting-cus">
            {!bieuMauUpdate ? <Loading></Loading> :
                <>
                    <div className='flex justify-between pb-3'>
                        {bieuMauUpdate?.trangThai == 1 ? <>

                            <p className='bold'> Trạng thái: <soan className="green">Đang hoạt động</soan></p>
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
                    <div className='pb-3'>
                        <p className='bold'> Loại biểu mẫu: </p>
                        <Radio.Group onChange={onChange} defaultValue={bieuMauUpdate?.loaiBieuMau}>
                            <Radio value={1}>Cá nhân</Radio>
                            <Radio value={2}>Tổ chức</Radio>

                        </Radio.Group>

                    </div>
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
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChangeUpload}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>

                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Giới hạn thời gian trả lời biểu mẫu: </p>
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
                    <div className='pb-3 flex justify-center' >
                        <Button key="submit" type="primary" className='mt-2 bg-info flex align-center justify-center' onClick={handleOk} disabled={sending}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>
                            Cập nhật
                        </Button>

                    </div>
                    <Divider ><p className='red' >Khu vực nguy hiểm</p></Divider>
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
