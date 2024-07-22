import React, { useCallback, useEffect, useState } from 'react'
import { CircularProgress, Grid, Paper, Stack, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from "lodash";
import banner from "app/assets/images/intrenet-so-1-1900-620.png";
import hoa01 from "app/assets/images/banner/hoa-1.jpg";
import hoa02 from "app/assets/images/banner/hoa-2.jpg";
import hoa03 from "app/assets/images/banner/hoa-3.jpg";
import hoa04 from "app/assets/images/banner/hoa-4.jpg";
import hoa05 from "app/assets/images/banner/hoa-5.jpg";
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Tooltip, Breadcrumb } from 'antd';
import { Upload } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import Contact from 'app/components/home-component/Contact';
import Footer from 'app/components/home-component/Footer';
import NavbarMunuForm from './components/NavbarMunuForm';
import Services from 'app/services';
import Loading from 'app/components/Loading';
import dayjs from 'dayjs';
import FormatDate from 'app/common/FormatDate';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StarPurple500Icon from '@mui/icons-material/Star';
// import StarIcon from '@mui/icons-material/Star';
import BackToTopButton from 'app/components/BackToTopButton';
import { useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
const { TextArea } = Input;

const MyListFormPage = () => {
    const navigate = useNavigate();
    const [listForm, setListForm] = useState(
        [

            // {
            //     tieuDe: "Đánh giá Độ Hài Hòa Xã Hội",
            //     moTa: "Khảo sát này nhằm đánh giá mức độ hài hòa và công bằng trong xã hội từ quan điểm của người dân.",
            //     banner: hoa01
            // },
            // {
            //     tieuDe: "Đánh Giá Hiệu Quả Dịch Vụ Công",
            //     moTa: "Khảo sát này tập trung vào việc đo lường và đánh giá hiệu quả của các dịch vụ công cung cấp bởi chính quyền địa phương.",
            //     banner: hoa02
            // },
            // {
            //     tieuDe: "Phản Hồi Cộng Đồng về Quyết Định Chính Sách",
            //     moTa: "Khảo sát này tập trung vào việc thu thập ý kiến và phản hồi từ cộng đồng về các quyết định chính sách cụ thể của chính quyền địa phương.",
            //     banner: hoa03
            // },
            // {
            //     tieuDe: "Đánh Giá Mức Độ Trong Trẻo của Hệ Thống Phản Ánh Dân Chủ",
            //     moTa: "Khảo sát này nhằm đánh giá mức độ mở và trong trẻo của hệ thống phản ánh dân chủ, bao gồm các cơ chế như hội thảo cộng đồng, cuộc họp dân cử, và các cơ quan truyền thông công cộng.",
            //     banner: hoa04
            // },
            // {
            //     tieuDe: "Đo Lường Sự Tham Gia Công Dân",
            //     moTa: "Khảo sát này nhằm đo lường mức độ tham gia và hoạt động của công dân trong các hoạt động cộng đồng và chính trị.",
            //     banner: hoa05
            // },
            // {
            //     tieuDe: "Đánh Giá Mức Độ Công Bằng và Trung Thực trong Bầu Cử",
            //     moTa: "Khảo sát này tập trung vào đánh giá mức độ công bằng và trung thực trong quá trình bầu cử và quản lý bầu cử.",
            //     banner: hoa03
            // },
            // {
            //     tieuDe: "Đo Lường Sự Tương Tác và Giao Tiếp Công Dân",
            //     moTa: "Khảo sát này tập trung vào việc đo lường mức độ tương tác và giao tiếp giữa chính quyền và công dân.",
            //     banner: hoa01
            // }



        ]
    );
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [openAddModal, setOpenAddModal] = useState(false);
    const [bieuMauUp, setBieuMauUp] = useState({ loaiBieuMau: 1 });
    const [loading, setLoading] = useState(false);


    const listAnhBia = [hoa01, hoa02, hoa03, hoa04, hoa05]
    var isMounted = true;

    useEffect(() => {
        isMounted = true;
        reloadList()
        return () => {
            isMounted = false;
        };
    }, []);
    function reloadList() {
        setLoading(true)
        Services.getFormService().getMyListForm().then(
            (res) => {
                if (res?.data && isMounted) {
                    setListForm(res?.data)
                    setLoading(false)
                }
            }
        )
    }
    const handleSearch = useCallback(
        debounce((e) => {
            setLoading(false)
            Services.getFormService().getMyListForm({ search: e?.target?.value }).then(
                (res) => {
                    if (res?.data && isMounted) {
                        setListForm(res?.data)
                        setLoading(false)
                    }
                }
            )
        }, 500),
        [],
    );
    function convertIdToNumber(id) {
        return Math.abs(id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 5 + 1;
    }

    function taoMoiBieuMauSaoChep(idBieuMauSaoChep) {
        setOpenAddModal(true)
        setBieuMauUp({ loaiBieuMau: 1, idBieuMauSaoChep: idBieuMauSaoChep })
    }

    return (


        <>
            <AddFormModal open={openAddModal} setOpen={setOpenAddModal} bieuMauUp={bieuMauUp} reloadList={reloadList} />
            <div className='pb-2'>
                <Breadcrumb
                    items={[
                        { title: <p className='bold f-16 c-575762'>Trang chủ </p> },
                        { title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Biểu mẫu</p>, href: "/" }
                    ]}
                /></div>
            <div className='tab-menu-list'>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                    className='sadqwqeqweq1'
                >

                    <div>
                        <Button onClick={() => setOpenAddModal(true)} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>


                    </div>
                    <div>
                        <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} onChange={handleSearch} />

                    </div>
                </Stack>
            </div>
            <div>
                {loading ? <Loading /> :
                    <Grid container spacing={5} className='w-100pt'>

                        {listForm?.length > 0 ?
                            <>
                                {
                                    listForm?.map((form, i) =>
                                        <Grid key={i} item xs={12} sm={6} md={4} lg={3} className=" box-list-riqopwr d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-2">
                                            <div className="pos-relative  sadqwqeqweq">


                                                <div className="tpn_card" data-aos-delay={i * 200}>
                                                    <div onClick={() => navigate(`/quan-tri/chi-tiet-bieu-mau?id=${form?._id}`)}>
                                                        <img src={form?.anhBia?._id ? `${process.env.REACT_APP_URL_SERVER}/be-form/public/show-file?stringID=${form?.anhBia?._id}` : listAnhBia[convertIdToNumber(form?._id)]} className="w-100 mb-4 pointer" />
                                                        <p className='gray m-0 f-13'><i>{dayjs(form?.ngayTao).format('DD/MM/YYYY')}</i></p>
                                                        <h5 className='bold pointer tieude-p' title={form?.tenBieuMau}>{form?.tenBieuMau}</h5>
                                                    </div>
                                                    <p className='moTa-p' title={form?.moTa}>{form?.moTa}</p>
                                                    {/* <div className='flex justify-between  pt-3'>
                                                        <p ><strong className='me-2'>Mã: {form?.maBieuMau}</strong></p>
                                                        {form?.trangThai ?
                                                            <>{checkTrangThaiBieuMau(form)} </>
                                                            :
                                                            <p className="status-danger ">Đã vô hiệu hóa</p>
                                                        }
                                                    </div> */}
                                                </div>
                                                {form?.donVi != taiKhoan?.donVi?._id &&
                                                    <Tooltip placement="bottomLeft" title={"Biểu mẫu được chia sẽ"}>
                                                        <div className='type-phutro'>
                                                            <StarPurple500Icon className='yellow f-18' />
                                                        </div>
                                                    </Tooltip>
                                                }
                                                <Button type="primary" onClick={() => taoMoiBieuMauSaoChep(form?._id)} className='btn-nhanban-css'><ContentCopyIcon className='me-1 f-14'></ContentCopyIcon>Nhân bản</Button>
                                            </div>
                                        </Grid>
                                    )
                                }
                            </> :
                            <div className='mt-5 mb-5 pt-3 div-flex justify-center w-100pt'>
                                <Empty className="mt-5 mb-5 " description={
                                    <span>
                                        Không có biểu mẫu nào
                                    </span>
                                }
                                />
                            </div>
                        }







                    </Grid>
                }

            </div>


            <Divider></Divider>
        </>


    );
};

const AddFormModal = ({ open, setOpen, reloadList, bieuMauUp }) => {
    const [newForm, setNewForm] = useState(bieuMauUp);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [anhBia, setAnhBia] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const [loading2, setLoading2] = useState(false);
    useEffect(() => {
        if (open) {
            setImageUrl()
            setAnhBia()
            setLoading2(false)
            setNewForm(bieuMauUp)
        }
    }, [open]);
    const handleOk = () => {
        setSending(true);
        setError("")
        if (checkBieuMau()) {
            Services.getFormService().taoMoiBieuMau(newForm).then(
                async (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        setError(res?.data?.message)
                    } else {
                        if (anhBia) {
                            let formData = new FormData();
                            formData.append('file', anhBia);
                            formData.append("id", res?.data);
                            await Services.getFormService().luuAnhBia(formData, res?.data)
                        }
                        setOpen(false)
                        reloadList()

                    }
                }
            )
        } else {
            setSending(false);
        }

    };
    const onChange = (arr, value) => {
        setError("")
        setNewForm({ ...newForm, [arr]: value })
    };


    const checkBieuMau = () => {
        if (!newForm?.tenBieuMau) {
            setError("Tên biểu mẫu không được để trống")
            return false;
        } else if (!newForm?.loaiBieuMau) {
            setError("Cần chọn loại biểu mẫu")
            return false;
        } else if (newForm?.ngayBD && newForm?.ngayKT) {
            const ngayBD = dayjs(newForm.ngayBD);
            const ngayKT = dayjs(newForm.ngayKT);
            // Kiểm tra nếu ngày bắt đầu trước ngày kết thúc
            if (!ngayBD.isBefore(ngayKT)) {
                setError("Ngày bắt đầu không trước ngày kết thúc.");
                return false;
            }

        }
        return true;
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
        <Modal title="TẠO MỚI BIỂU MẪU" open={open} onOk={handleOk} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,
                <Button key="back" onClick={() => setOpen(!open)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    Tạo mới
                </Button>,

            ]}
        >
            <div className="div-setting-cus">
                <div className='pb-3'>
                    <p className='bold'> Tên biểu mẫu *: </p>
                    <Input onChange={(e) => onChange("tenBieuMau", e?.target?.value)} placeholder="Nhập tên biểu mẫu" />
                </div>
                <div className='pb-3'>
                    <p className='bold'> Mô tả: </p>
                    <TextArea onChange={(e) => onChange("moTa", e?.target?.value)} placeholder="Nhập tên biểu mẫu" />
                </div>
                <div className='pb-3'>
                    <p className='bold'> Loại đối tượng khảo sát *: </p>
                    <Radio.Group onChange={(e) => onChange("loaiBieuMau", e?.target?.value)} >
                        <Radio value={1} defaultChecked>Cá nhân</Radio>
                        <Radio value={2}>Tổ chức</Radio>
                    </Radio.Group>
                </div>
                <div className='pb-3'>
                    <p className='bold'> Ảnh bìa: </p>
                    {/* <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChangeUpload}
                        onPreview={onPreview}
                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload> */}
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
                    <p className='bold'> Giới hạn thời gian trả lời biểu mẫu: </p>
                    <div className='flex justify-between'>
                        <DatePicker onChange={(e) => onChange("ngayBD", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))} format="DD/MM/YYYY HH:mm" showTime style={{ width: "100%", marginRight: "10px" }} />
                        <DatePicker onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate()))} format="DD/MM/YYYY HH:mm" showTime style={{ width: "100%" }} />
                    </div>


                </div> */}
                {/* <div className='pb-3'>
                    <p className='bold'> Thứ tự: </p>
                    <Input onChange={(e) => onChange("thuTu", e?.target?.value)} placeholder="Nhập thứ tự hiển thị" />
                </div> */}
            </div >
        </Modal>
    )
}
export default MyListFormPage;
