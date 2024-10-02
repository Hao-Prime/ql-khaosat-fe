
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
import KeHoachKhaoSatPage from './components/KeHoachKhaoSatPage';
import ChiTietKeHoachPage from './components/ChiTietKeHoachPage';
const KeHoachDetailPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [keHoach, setKeHoach] = useState();
    const [tabValue, setTabValue] = useState("1");
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
    function reloadDetail(notLoading, idKeHoachSave) {
        setTabValue("1")
        if (!idKeHoach) {
            setKeHoach({ quyenThaoTac: true })
            return
        } else {
            if (notLoading != true) {
                setLoading(true)
            }
        }
        Services.getCuocKhaoSatService().getKeHoach(idKeHoach, 1).then(
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
                        if (res?.data?.nguoiTao?._id == taiKhoan?._id) {
                            quyen = true;
                        } else {
                            res?.data?.donViThucHien?.forEach(element => {
                                if (taiKhoan?.listVaiTro?.includes("admin") ||
                                    (element?._id == taiKhoan?.donVi?._id && (taiKhoan?.listVaiTro?.includes("kehoach.xuly")))) {
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
                        activeKey={tabValue}
                        onChange={(e) => setTabValue(e)}
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
                                    children: <ChiTietKeHoachPage
                                        keHoach={keHoach}
                                        loading={loading}
                                    ></ChiTietKeHoachPage>,
                                }
                            ]),
                            {
                                key: '2',
                                label: 'Xây dựng các cuộc khảo sát',
                                children: <KeHoachKhaoSatPage
                                    keHoach={keHoach}
                                    loading={loading}
                                    tabValue={tabValue}
                                    setTabValue={setTabValue}
                                ></KeHoachKhaoSatPage>,
                            },
                            // {
                            //     key: '3',
                            //     label: 'Phân công khảo sát',// bảng tình hình thực hiện 
                            //     children: <></>,
                            // },
                            // {
                            //     key: '4',
                            //     label: 'Theo dõi thực hiện',
                            //     children: <></>,
                            // },
                            // {
                            //     key: '44',
                            //     label: 'Kết quả khảo sát', // Tình hình thực hiện
                            //     children: <></>,
                            // },
                            ...(keHoach?.quyenThaoTac ? [
                                ...(idKeHoach ? [
                                    {
                                        key: '6',
                                        label: 'Cập nhật kế hoạch',
                                        children: <CapNhatKeHoachPage
                                            keHoach={keHoach}
                                            reloadDetail={reloadDetail}
                                            loading={loading}
                                            setTabValue={setTabValue}
                                        ></CapNhatKeHoachPage>,
                                    }

                                ] : []),

                            ] : [])
                            ,
                        ]}

                    />

                    <BackToTopButton />
                </div>

            </div >
        </>}
        </>
    );
};

export default KeHoachDetailPage;
