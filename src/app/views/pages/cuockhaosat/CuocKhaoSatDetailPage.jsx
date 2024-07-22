
import { Breadcrumb, Button, Divider, Dropdown, Input, Modal, Pagination, Skeleton, Space, Table, Tabs, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BackToTopButton from 'app/components/BackToTopButton';
import Services from 'app/services';
import EditForm from './components/EditForm';
import HistoryForm from './components/HistoryForm';
import DashboardForm from './components/DashboardForm';
import ShareForm from './components/ShareForm';
import SettingForm from './components/SettingForm';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FormatString from 'app/common/FormatString';
import { useSelector } from 'react-redux';
const CuocKhaoSatDetailPage = () => {

    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [cuocKhaoSat, setCuocKhaoSat] = React.useState();
    const [tabValue, setTabValue] = React.useState("1");
    const idCuocKhaoSat = new URLSearchParams(window.location.search).get("id");
    const [loading, setLoading] = useState(false);
    const taiKhoan = useSelector(state => state.taiKhoan)
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList()

        return () => {
            isMounted = false;
        };
    }, [idCuocKhaoSat]);
    function reloadList() {

        setLoading(true)
        Services.getCuocKhaoSatService().getAll({ idKhaoSat: idCuocKhaoSat }).then(
            (res) => {
                if (res?.data?.error) {
                    Modal.error({
                        title: 'Lỗi',
                        content: res?.data?.message,
                    });
                } else {

                    if (!res?.data) {
                        Modal.error({
                            title: 'Lỗi',
                            content: "Không tìm thấy khảo sát",
                        });
                        setLoading(true)
                    } else {
                        let quyen = false;
                        if (res?.data?.nguoiTao == taiKhoan?._id) {
                            quyen = true;
                        } else {
                            res?.data?.listTaiKhoanChinhSua?.forEach(element => {
                                if (element?.taiKhoan == taiKhoan?.taiKhoanId) {
                                    quyen = true;
                                }
                            });
                        }
                        setCuocKhaoSat({
                            ...res?.data,
                            thanhPhan: res?.data?.thanhPhan ? JSON?.parse(res?.data?.thanhPhan) : [],
                            quyenThaoTac: quyen,
                            donViPhuTrach: res?.data?.listDonViPhuTrach?.find(obj => obj?.donVi?._id == taiKhoan?.donVi?._id)
                        })
                        setLoading(false)
                    }


                }


            }
        )
    }
    function reloadDetail() {
        Services.getCuocKhaoSatService().getAll({ idKhaoSat: idCuocKhaoSat }).then(
            (res) => {
                if (res?.data?.error) {
                    Modal.error({
                        title: 'Lỗi',
                        content: res?.data?.message,
                    });
                } else {
                    let quyen = false;
                    if (res?.data?.nguoiTao == taiKhoan?._id) {
                        quyen = true;
                    } else {
                        res?.data?.listTaiKhoanChinhSua?.forEach(element => {
                            if (element?.taiKhoan == taiKhoan?._id) {
                                quyen = true;
                            }
                        });
                    }
                    setCuocKhaoSat({
                        ...res?.data,
                        thanhPhan: res?.data?.thanhPhan ? JSON?.parse(res?.data?.thanhPhan) : [],
                        quyenThaoTac: quyen,
                        donViPhuTrach: res?.data?.listDonViPhuTrach?.find(obj => obj?.donVi?._id == taiKhoan?.donVi?._id)
                    })
                }


            }
        )
    }
    const onChange = (e) => {
        setTabValue(e);
    }
    return (
        <>   {loading ? <Skeleton /> : <>
            <div className='pb-2'>
                <Breadcrumb
                    items={[
                        { title: <p className='bold f-16 c-575762'>Trang chủ </p> },
                        { title: <p className='bold f-16 c-blue2' onClick={() => navigate(`/quan-tri/khao-sat?trangThai=0`)}><HomeIcon className='mb-1' /> Các cuộc khảo sát</p> }
                    ]}
                /></div>

            <div className="page-new" id="topxssx">
                <div className='div-flex justify-between'>
                    <div className='ps-1 div-flex'>
                        <ArrowBackIcon className='bold pointer me-1 f-22' onClick={() => navigate(`/quan-tri/khao-sat?trangThai=0`)} />
                        <p className='text-tieude-navx-1'><b>{FormatString.getMaKhaoSatTheoDonVi(cuocKhaoSat, taiKhoan?.donVi?._id) + "-" + cuocKhaoSat?.tieuDe}</b></p>
                    </div>
                    <div>
                        <p className='c-0042ff pointer nowrap' onClick={() => window.open(`/khao-sat?key=${FormatString.getMaKhaoSatTheoDonVi(cuocKhaoSat, taiKhoan?.donVi?._id)}`)}>Xem KQ thiết kế <KeyboardDoubleArrowRightIcon /></p>
                    </div>
                </div>
                <Divider className='mt-2 mb-1'></Divider>
                <div className='rqiwriopqeqp'>


                    {contextHolder}

                    <Tabs
                        className='tab-menu'
                        defaultActiveKey="1"
                        items={[
                            {
                                key: '1',
                                label: 'Thiết kế',
                                children: <EditForm cuocKhaoSat={cuocKhaoSat} />,
                            },
                            {
                                key: '4',
                                label: 'Phụ trách',
                                children: <ShareForm cuocKhaoSat={cuocKhaoSat} reloadDetail={reloadDetail} />,
                            },
                            {
                                key: '3',
                                label: 'Thống kê',
                                children: <DashboardForm cuocKhaoSat={cuocKhaoSat} reloadDetail={reloadDetail} />
                            },
                            ...(cuocKhaoSat?.quyenThaoTac ? [
                                {
                                    key: '2',
                                    label: 'Lịch sử chỉnh sửa',
                                    children: <HistoryForm cuocKhaoSat={cuocKhaoSat} />,
                                },
                                {
                                    key: '5',
                                    label: 'Cài đặt',
                                    children: <SettingForm cuocKhaoSat={cuocKhaoSat} reloadList={reloadList} />,
                                }
                            ] : [])
                            ,
                        ]}
                        onChange={onChange}
                    />

                    <BackToTopButton />
                </div>

            </div >
        </>}
        </>
    );
};

export default CuocKhaoSatDetailPage;
