import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material';

import banner from "app/assets/images/intrenet-so-1-1900-620.png";

import Footer from 'app/components/home-component/Footer';
import NavbarMunuForm from './components/NavbarMunuForm';

import MyListFormPage from './MyListFormPage';
import HoDanPage from './HoDanPage';
import DonViTrucThuocPage from './DonViTrucThuocPage';


const HomeMenuPage = () => {

    const [fillter, setFillter] = React.useState({ type: 0 });
    const handleChange = (arr, newValue) => {
        setFillter({ ...fillter, [arr]: newValue });
    };


    return (
        <div className="">

            <div className='banner-top'>
                <img src={banner} style={{ width: "100%" }}></img>
            </div>
            <NavbarMunuForm
                children={
                    <Tabs className='ms-2' value={fillter?.type} onChange={(e, value) => handleChange("type", value)} centered>
                        <Tab label="Biểu mẫu của tôi" />
                        <Tab label="Hộ dân đã khảo sát" />
                        <Tab label="Đơn vị trực thuộc" />
                    </Tabs>
                }
            />
            <div className='w-lg-80pt mt-3'>
                {fillter?.type == "0" ?
                    <>
                        <MyListFormPage />
                    </> :
                    fillter?.type == "1" ?
                        <>
                            <HoDanPage />
                        </> :
                        <>
                            <DonViTrucThuocPage />
                        </>
                }
            </div>

            <Footer />
        </div>

    );
};


export default HomeMenuPage;
