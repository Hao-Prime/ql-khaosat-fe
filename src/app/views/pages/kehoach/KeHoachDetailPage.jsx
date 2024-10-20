
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
import NoiDungKhaoSatPage from '../admin/noidungkhaosat/NoiDungKhaoSatPage';
import NoiDungDungChungPage from './components/NoiDungDungChungPage';
import DangPhatTrienPage from '../admin/developer/DangPhatTrienPage';
const KeHoachDetailPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [keHoach, setKeHoach] = useState();
    const [tabValue, setTabValue] = useState("1");
    const idKeHoach = new URLSearchParams(window.location.search).get("id");
    const tab = new URLSearchParams(window.location.search).get("tab");
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
    useEffect(() => {
        isMounted = true;
        if (tab) {
            setTabValue(tab)
        }
        return () => {
            isMounted = false;
        };
    }, [tab]);
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
                        { title: <p className='bold f-16 c-blue2' onClick={() => navigate(`/quan-tri/ke-hoach?trangThai=1`)}><HomeIcon className='mb-1' /> Kế hoạch khảo sát</p> }
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
                                    label: 'Điền thông tin kế hoạch',
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
                                },
                                {
                                    key: '2.2',
                                    label: 'Nội dung khảo sát',
                                    children: <NoiDungDungChungPage
                                        keHoach={keHoach}
                                        loading={loading}
                                        tabValue={tabValue}
                                        setTabValue={setTabValue}
                                    ></NoiDungDungChungPage>,
                                },
                                {
                                    key: '2',
                                    label: 'Mẫu khảo sát',
                                    children: <KeHoachKhaoSatPage
                                        keHoach={keHoach}
                                        loading={loading}
                                        tabValue={tabValue}
                                        setTabValue={setTabValue}
                                    ></KeHoachKhaoSatPage>,
                                },
                                {
                                    key: '4',
                                    label: 'Thống kê tổng hợp',
                                    children: <DangPhatTrienPage
                                    ></DangPhatTrienPage>,
                                },
                            ]),


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
