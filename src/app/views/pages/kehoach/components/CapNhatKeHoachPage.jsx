import { Button, DatePicker, Divider, Input, Modal, Radio, message, Upload, TreeSelect, Tooltip } from 'antd';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import { CircularProgress, Grid } from '@mui/material';
import Loading from 'app/components/Loading';
import SunEditor from 'suneditor-react';
import { UploadOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import states from 'app/states/States';
import HelpIcon from '@mui/icons-material/Help';
import { useState, useEffect, useRef } from 'react';
import FormatString from 'app/common/FormatString';
const { TextArea } = Input;
const CapNhatKeHoachPage = ({ keHoach, reloadDetail, loading, setTabValue }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [value, setValue] = useState(1);
    const [keHoachUpdate, setKeHoachUpdate] = useState(keHoach);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [noiDung, setNoiDung] = useState();
    const [loading2, setLoading2] = useState(false);
    const [listFile, setListFile] = useState([]);
    const [listDonViTT, setListDonViTT] = useState([]);
    const editorRef = useRef(null);
    useEffect(() => {
        if (keHoach?._id) {
            setLoading2(false)
            setKeHoachUpdate(keHoach)
            if (keHoach?.listFile?.length > 0) {
                setListFile(keHoach?.listFile?.map((e) => {
                    return {
                        ...e,
                        url: process.env.REACT_APP_URL_SERVER + e?.url,
                        name: `${e?.tenFile} (${FormatString.convertSize(e?.size)})`
                    }
                }))
            }
            setNoiDung(keHoach?.noiDung)
        } else {
            setKeHoachUpdate()
            setNoiDung("")
            setListFile([])
            console.log(editorRef.current);

            if (editorRef.current) {
                editorRef?.current?.setContents(""); // Cập nhật nội dung của editor
            }
        }

    }, [keHoach]);
    useEffect(() => {
        realoadListSelect()
    }, []);
    async function realoadListSelect() {
        setLoading2(true)
        setSending(false)
        let dataRSLisstDv = await Services.getDonViService().getAll("")
        if (dataRSLisstDv.data) {
            setListDonViTT(dataRSLisstDv?.data?.map(obj => {
                return { value: obj._id, label: obj.tenDonVi, children: formatSelect(obj.children) };
            }))
        }
        setLoading2(false)
    }
    function formatSelect(children) {
        return (children?.map(obj => {
            return { value: obj._id, label: obj.tenDonVi, children: formatSelect(obj.children) };
        }))

    }
    const onChange = (arr, value) => {
        setKeHoachUpdate({ ...keHoachUpdate, [arr]: value })
    };
    const handleDelete = async () => {
        const confirmed = await modal.confirm({
            title: "Bạn có chắc muốn xóa biểu mẫu này",
            content: "",
        });
        if (confirmed) {
            setSending(true);
            Services.getFormService().xoaKeHoach(keHoachUpdate?._id).then(
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
        if (checkKeHoach()) {
            if (keHoach?._id) {
                Services.getCuocKhaoSatService().capNhatKeHoach({ ...keHoachUpdate, noiDung: noiDung }).then(
                    async (res) => {
                        if (res?.data?.error) {
                            Modal.error({
                                title: 'Lỗi',
                                content: res?.data?.message,
                            });
                        } else {
                            if (listFile) {
                                let formData = new FormData();
                                let listLength = 0
                                listFile?.forEach(element => {
                                    if (!element?._id) {
                                        formData.append('files', element?.originFileObj);
                                        listLength++
                                    }
                                });
                                formData.append("id", res?.data);
                                if (listLength > 0) {
                                    await Services.getCuocKhaoSatService().themFileKeHoach(formData, res?.data)
                                }

                            }
                            message.success("Lưu thành công")
                            reloadDetail(false)
                        }
                        setSending(false);
                    }
                )
            } else {
                Services.getCuocKhaoSatService().taoKeHoach({ ...keHoachUpdate, noiDung: noiDung }).then(
                    async (res) => {
                        if (res?.data?.error) {
                            Modal.error({
                                title: 'Lỗi',
                                content: res?.data?.message,
                            });
                        } else {
                            if (listFile) {
                                let formData = new FormData();
                                listFile?.forEach(element => {
                                    if (!element?._id) {
                                        formData.append('files', element?.originFileObj);
                                    }
                                });
                                formData.append("id", res?.data);
                                await Services.getCuocKhaoSatService().themFileKeHoach(formData, res?.data)
                            }
                            message.success("Lưu thành công")

                            // reloadDetail()
                        }
                        setSending(false);
                        window.location.href = "/quan-tri/chi-tiet-ke-hoach?id=" + res?.data +"&tab=2"
                    }
                )
            }

        } else {
            setSending(false);
        }

    };
    const checkKeHoach = () => {
        if (!keHoachUpdate?.tieuDe) {
            Modal.error({
                title: 'Lỗi',
                content: "Tiêu đề không được để trống",
            });
            setError()
            return false;
        } else if (!noiDung) {
            Modal.error({
                title: 'Lỗi',
                content: "Nội dung không được để trống",
            });
            setError()
            return false;
        } else if (keHoachUpdate?.ngayBD && keHoachUpdate?.ngayKT) {
            const ngayBD = dayjs(keHoachUpdate?.ngayBD);
            const ngayKT = dayjs(keHoachUpdate?.ngayKT);
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
    const handleChangeUploadYC = (info) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        setListFile(newFileList);
    };

    return (

        <div className="div-setting-cus">
            {contextHolder}
            {loading ? <Loading></Loading> :
                <>

                    <div className='pb-3'>
                        <p className='bold'> Tiêu đề kế hoạch: </p>
                        <Input placeholder="Nhập tiêu đề" onChange={(e) => onChange("tieuDe", e?.target?.value)} value={keHoachUpdate?.tieuDe} />

                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Nội dung tóm tắt: </p>
                        <TextArea autoSize={{ minRows: 3 }} onChange={(e) => onChange("tomTat", e?.target?.value)} value={keHoachUpdate?.tomTat} placeholder="Nhập nội dung tóm tắt" />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Nội dung: </p>
                        <SunEditor
                            getSunEditorInstance={(editor) => {
                                editorRef.current = editor; // Gán SunEditor instance vào ref
                            }}
                            setDefaultStyle="font-family: arial; font-size: 15px;"
                            defaultValue={keHoachUpdate?.noiDung}
                            setOptions={{
                                height: 'auto',
                                minHeight: '170px',
                                katex: "katex",
                                buttonList: states.getButtonList(),
                                // imageUploadUrl: process.env.REACT_APP_URL_SERVER + '/api/public/themfilenoidung',
                            }}
                            onBlur={(content) => {
                                setNoiDung(content?.target?.innerHTML);
                            }}
                        />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Phạm vi thực hiện trong đơn vị:
                            <Tooltip title="Giới hạn phạm vi phân công thực hiện khảo sát">
                                <HelpIcon className='help' />
                            </Tooltip>
                        </p>
                        <TreeSelect
                            showSearch
                            treeDefaultExpandAll
                            allowClear
                            multiple
                            value={keHoachUpdate?.phamViThucHien?.map(obj => obj?._id)}
                            style={{ width: '100%' }}
                            filterTreeNode={(input, treeNode) => {
                                const match = treeNode?.label?.toLowerCase().includes(input.toLowerCase());
                                if (match && !treeNode?.isLeaf && !treeNode?.children) { } return match;
                            }}
                            onChange={(value, label, list) => {
                                onChange("phamViThucHien", value.map((id, index) => ({
                                    _id: id,
                                    tenDonVi: label[index]
                                })));
                            }}
                            treeData={listDonViTT}
                            placeholder="Chọn đơn vị"
                        />
                    </div>
                    <Grid container className='w-100pt '>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2'>

                            <p className='bold'> Đơn vị chủ trì thực hiện:
                                <Tooltip title="Đơn vị có thể cập nhật, phân công phụ trách">
                                    <HelpIcon className='help' />
                                </Tooltip>
                            </p>
                            <TreeSelect
                                showSearch
                                treeDefaultExpandAll
                                allowClear
                                multiple
                                style={{ width: '100%' }}
                                value={keHoachUpdate?.donViThucHien?.map(obj => obj?._id)}
                                filterTreeNode={(input, treeNode) => {
                                    const match = treeNode?.label?.toLowerCase().includes(input.toLowerCase());
                                    if (match && !treeNode?.isLeaf && !treeNode?.children) { } return match;
                                }}
                                onChange={(value, label, list) => {
                                    onChange("donViThucHien", value.map((id, index) => ({
                                        _id: id,
                                        tenDonVi: label[index]
                                    })));
                                }}
                                treeData={listDonViTT}
                                placeholder="Chọn đơn vị"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2 ps-2'>
                            <p className='bold'>Đơn vị phối hợp:
                                <Tooltip title="Đơn vị có thể xem kế hoạch này">
                                    <HelpIcon className='help' />
                                </Tooltip>
                            </p>
                            <TreeSelect
                                showSearch
                                treeDefaultExpandAll
                                allowClear
                                multiple
                                value={keHoachUpdate?.donViPhoiHop?.map(obj => obj?._id)}
                                style={{ width: '100%' }}
                                filterTreeNode={(input, treeNode) => {
                                    const match = treeNode?.label?.toLowerCase().includes(input.toLowerCase());
                                    if (match && !treeNode?.isLeaf && !treeNode?.children) { } return match;
                                }}
                                onChange={(value, label, list) => {
                                    onChange("donViPhoiHop", value.map((id, index) => ({
                                        _id: id,
                                        tenDonVi: label[index]
                                    })));
                                }}
                                treeData={listDonViTT}
                                placeholder="Chọn đơn vị"
                            />
                        </Grid>
                    </Grid>
                    <Grid container className='w-100pt'>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2'>
                            <p className='bold'> Thời gian bắt đầu: </p>
                            <DatePicker
                                onChange={(e) => onChange("ngayBD", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                format="DD/MM/YYYY"
                                locale={locale?.DatePicker}
                                value={keHoachUpdate?.ngayBD ? dayjs(keHoachUpdate?.ngayBD) : null}

                                style={{ width: "100%", marginRight: "10px" }}
                                className='me-2'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2 ps-2'>
                            <p className='bold'>Kế thúc: </p>
                            <DatePicker
                                onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))}
                                value={keHoachUpdate?.ngayKT ? dayjs(keHoachUpdate?.ngayKT) : null}
                                locale={locale?.DatePicker}
                                format="DD/MM/YYYY"
                                style={{ width: "100%" }}
                                className='me-2'
                            />
                        </Grid>
                    </Grid>
                    <div className='pb-3'>
                        <p className='bold'> File đính kèm: </p>
                        <Upload
                            // action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                            onChange={handleChangeUploadYC}
                            beforeUpload={() => false}
                            onRemove={(file) => {
                                if (file?._id && keHoach?._id) {
                                    Services.getCuocKhaoSatService().xoaFileKeHoach(file?._id, keHoach?._id)
                                }
                            }}
                            multiple={true}
                            fileList={listFile}
                            className='ms-1'>
                            <Button icon={<UploadOutlined />}>File đính kèm</Button>
                        </Upload>
                    </div>
                    {keHoachUpdate?._id && <div className='pb-3'>
                        <p className='bold'> Trang thái: </p>
                        <Radio.Group onChange={(e) => onChange("trangThai", e.target.value)}
                            value={keHoachUpdate?.trangThai}>
                            <Radio value={1}>Đang thực hiện</Radio>
                            <Radio value={2}>Đã kết thúc</Radio>
                        </Radio.Group>
                    </div>}

                    <div className='pb-3 flex justify-center' >
                        <Button key="submit" type="primary" className='mt-2 bg-info flex align-center justify-center' onClick={handleOk} disabled={sending}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>
                            {keHoachUpdate?._id ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                    {keHoachUpdate?._id &&
                        <>
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

                </>}
        </div >

    );
};

export default CapNhatKeHoachPage;
