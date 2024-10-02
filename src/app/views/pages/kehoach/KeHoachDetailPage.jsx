
import { Breadcrumb, Button, Divider, Dropdown, Input, Modal, Pagination, Skeleton, Space, Table, Tabs, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BackToTopButton from 'app/components/BackToTopButton';
import Services from 'app/services';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FormatString from 'app/common/FormatString';
import { useSelector } from 'react-redux';
import CapNhatKeHoachPage from './components/CapNhatKeHoachPage';
const KeHoachDetailPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [keHoach, setKeHoach] = React.useState();
    const [tabValue, setTabValue] = React.useState("1");
    const idKeHoach = new URLSearchParams(window.location.search).get("id");
    const [loading, setLoading] = useState(false);
    const taiKhoan = useSelector(state => state.taiKhoan)
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadDetail()

        return () => {
            isMounted = false;
        };
    }, [idKeHoach]);
    function reloadDetail(notLoading) {
        if (!idKeHoach) {
            setKeHoach({ quyenThaoTac: true })
            return
        } else {
            if (notLoading != true) {
                setLoading(true)
            }
        }

        Services.getCuocKhaoSatService().getKeHoach(idKeHoach, null).then(
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
                            res?.data?.donViThucHien?.forEach(element => {
                                if (element?.taiKhoan == taiKhoan?.taiKhoanId && (taiKhoan?.listVaiTro?.includes("admin") || taiKhoan?.listVaiTro?.includes("kehoach.xuly"))) {
                                    quyen = true;
                                }
                            });
                        }
                        setKeHoach({
                            ...res?.data,
                            quyenThaoTac: idKeHoach ? quyen : true
                        })
                        setLoading(false)
                    }


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
                <div className='rqiwriopqeqp'>
                    {contextHolder}
                    <Tabs
                        className='tab-menu'
                        defaultActiveKey="1"
                        accessKey={tabValue}
                        items={[
                            ...(!idKeHoach ? [
                                {
                                    key: '1',
                                    label: 'Thông tin kế hoạch',
                                    children: <CapNhatKeHoachPage
                                        keHoach={keHoach}
                                        reloadDetail={reloadDetail}
                                        loading={loading}
                                        setTabValue={setTabValue}
                                    ></CapNhatKeHoachPage>,
                                },
                            ] : [
                                {
                                    key: '1',
                                    label: 'Thông tin kế hoạch',
                                    children: <></>,
                                }
                            ]),
                            {
                                key: '2',
                                label: 'Xây dựng các cuộc khảo sát',
                                children: <></>,
                            },
                            {
                                key: '3',
                                label: 'Phân công khảo sát',// bảng tình hình thực hiện 
                                children: <></>,
                            },
                            {
                                key: '4',
                                label: 'Theo dõi thực hiện',
                                children: <></>,
                            },
                            {
                                key: '44',
                                label: 'Kết quả khảo sát', // Tình hình thực hiện
                                children: <></>,
                            },
                            ...(keHoach?.quyenThaoTac ? [
                                ...(idKeHoach ? [{
                                    key: '5',
                                    label: 'Lịch sử chỉnh sửa',
                                    children: <></>,
                                },
                                {
                                    key: '6',
                                    label: 'Cập nhật kế hoạch',
                                    children: <CapNhatKeHoachPage keHoach={keHoach} reloadDetail={reloadDetail}></CapNhatKeHoachPage>,

                                }

                                ] : []),

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

export default KeHoachDetailPage;
