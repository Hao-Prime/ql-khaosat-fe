import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material';

import banner from "app/assets/images/intrenet-so-1-1900-620.png";

import Footer from 'app/components/home-component/Footer';
import NavbarMunuForm from '../mylistformpage/components/NavbarMunuForm';

import MyListFormPage from '../mylistformpage/MyListFormPage';
import HoDanPage from '../mylistformpage/HoDanPage';
import DonViTrucThuocPage from '../mylistformpage/DonViTrucThuocPage';
import Sidebar from 'app/components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import DangPhatTrienPage from '../admin/developer/DangPhatTrienPage';
import DonViPage from '../admin/donvi/DonViPage';
import NguoiDungPage from '../admin/nguoidung/NguoiDungPage';
import ProtectedRoute from 'app/common/ProtectedRoute';
import DashboardPage from '../dashboardpage/DashboardPage';
import FormDetailPage from '../mylistformpage/FormDetailPage';
import CuocKhaoSatPage from '../cuockhaosat/CuocKhaoSatPage';
import CuocKhaoSatDetailPage from '../cuockhaosat/CuocKhaoSatDetailPage';
import CanBoPage from '../admin/canbo/CanBoPage';
import CauHinhPage from '../admin/cauhinh/CauHinhPage';
import LogsHeThongPage from '../admin/logs/LogsHeThongPage';
import QuyenTruyCapPage from '../admin/quyentruycap/QuyenTruyCapPage';
import ThongKeTheoDonViPage from '../admin/thongke/ThongKeTheoDonViPage';
import KeHoachPage from '../kehoach/KeHoachPage';
import KeHoachDetailPage from '../kehoach/KeHoachDetailPage';
import DoiTuongPage from '../admin/doituong/DoiTuongPage';


const HomeMenuPage = ({ user }) => {
    const [hiddenSidebar, setHiddenSidebar] = useState(false);
    const [fillter, setFillter] = React.useState({ type: 0 });
    const handleChange = (arr, newValue) => {
        setFillter({ ...fillter, [arr]: newValue });
    };


    return (
        <div className="">

            <div className='banner-top'>
                {/* <img src={banner} style={{ width: "100%" }}></img> */}
            </div>

            <div className=''>
                <div className=' main-s'>
                    {hiddenSidebar?<></>:<Sidebar user={user}/>} 
                    <div className='body-main'>
                        <NavbarMunuForm  setHiddenSidebar={setHiddenSidebar} hiddenSidebar={hiddenSidebar}
                        // children={
                        //     <Tabs className='ms-2' value={fillter?.type} onChange={(e, value) => handleChange("type", value)} centered>
                        //         <Tab label="Biểu mẫu của tôi" />
                        //         <Tab label="Hộ dân đã khảo sát" />
                        //         <Tab label="Đơn vị trực thuộc" />
                        //     </Tabs>
                        // }
                        />
                        <Routes>
                            <Route path="/dashboard" element={<ProtectedRoute user={user} role="dashboard"> <DashboardPage /> </ProtectedRoute>} />

                            <Route path="/chi-tiet-bieu-mau" element={<ProtectedRoute user={user} role="bieumau"> <FormDetailPage /> </ProtectedRoute>} />
                            <Route path="/chi-tiet-khao-sat" element={<ProtectedRoute user={user} role="khaosat"> <CuocKhaoSatDetailPage /> </ProtectedRoute>} />
                            <Route path="/bieu-mau" element={<ProtectedRoute user={user} role="bieumau"> <MyListFormPage /> </ProtectedRoute>} />
                            <Route path="/khao-sat" element={<ProtectedRoute user={user} role="khaosat"> <CuocKhaoSatPage /> </ProtectedRoute>} />
                            <Route path="/ke-hoach" element={<ProtectedRoute user={user} role="kehoach"> <KeHoachPage /> </ProtectedRoute>} />
                            <Route path="/chi-tiet-ke-hoach" element={<ProtectedRoute user={user} role="kehoach"> <KeHoachDetailPage /> </ProtectedRoute>} />
                            
                            <Route path="/doi-tuong-khao-sat" element={<ProtectedRoute user={user} role="nguoikhaosat"> <DoiTuongPage /> </ProtectedRoute>} />
                            
                            <Route path="/donvi" element={<ProtectedRoute user={user} role="donvi"> <DonViPage /> </ProtectedRoute>} />
                            <Route path="/nguoi-dung" element={<ProtectedRoute user={user} role="nguoikhaosat"> <NguoiDungPage /> </ProtectedRoute>} />
                            <Route path="/can-bo" element={<ProtectedRoute user={user} role="canbo"> <CanBoPage /> </ProtectedRoute>} />

                            <Route path="/cau-hinh/role" element={<ProtectedRoute user={user} role="admin"> <QuyenTruyCapPage /> </ProtectedRoute>} />
                            <Route path="/cau-hinh/logs" element={<ProtectedRoute user={user} role="logs"> <LogsHeThongPage /> </ProtectedRoute>} />
                            <Route path="/cau-hinh/form" element={<ProtectedRoute user={user} role="admin"> <CauHinhPage /> </ProtectedRoute>} />

                            <Route path="/thong-ke/don-vi" element={<ProtectedRoute user={user} role="thongke.donvi"> <ThongKeTheoDonViPage /> </ProtectedRoute>} />



                        </Routes>
                        <Footer></Footer>


                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>

    );
};


export default HomeMenuPage;
