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


const HomeMenuPage = ({ user }) => {

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
                    <Sidebar />
                    <div className='body-main'>
                        <NavbarMunuForm
                        // children={
                        //     <Tabs className='ms-2' value={fillter?.type} onChange={(e, value) => handleChange("type", value)} centered>
                        //         <Tab label="Biểu mẫu của tôi" />
                        //         <Tab label="Hộ dân đã khảo sát" />
                        //         <Tab label="Đơn vị trực thuộc" />
                        //     </Tabs>
                        // }
                        />
                        <Routes>
                            <Route path="/dashboard" element={<ProtectedRoute user={user} role="user"> <DashboardPage /> </ProtectedRoute>} />
                            <Route path="/chi-tiet-bieu-mau" element={<ProtectedRoute user={user} role="user"> <FormDetailPage /> </ProtectedRoute>} />
                            <Route path="/chi-tiet-khao-sat" element={<ProtectedRoute user={user} role="user"> <CuocKhaoSatDetailPage /> </ProtectedRoute>} />
                            <Route path="/bieu-mau" element={<ProtectedRoute user={user} role="user"> <MyListFormPage /> </ProtectedRoute>} />
                            <Route path="/khao-sat" element={<ProtectedRoute user={user} role="user"> <CuocKhaoSatPage /> </ProtectedRoute>} />
                            <Route path="/logs" element={<ProtectedRoute user={user} role="admin"> <DangPhatTrienPage /> </ProtectedRoute>} />
                            <Route path="/donvi" element={<ProtectedRoute user={user} role="admin"> <DonViPage /> </ProtectedRoute>} />
                            <Route path="/nguoi-dung" element={<ProtectedRoute user={user} role="admin"> <NguoiDungPage /> </ProtectedRoute>} />
                            <Route path="/can-bo" element={<ProtectedRoute user={user} role="admin"> <CanBoPage /> </ProtectedRoute>} />
                            <Route path="/cauhinh/form" element={<ProtectedRoute user={user} role="admin"> <DangPhatTrienPage /> </ProtectedRoute>} />
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
