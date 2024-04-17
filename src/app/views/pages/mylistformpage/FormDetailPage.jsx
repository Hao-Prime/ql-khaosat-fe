import React, { useState } from 'react'
import { Grid, Paper, Stack, } from '@mui/material';
import { styled } from '@mui/material/styles';

import banner from "app/assets/images/intrenet-so-1-1900-620.png";
import hoa01 from "app/assets/images/banner/hoa-1.jpg";
import hoa02 from "app/assets/images/banner/hoa-2.jpg";
import hoa03 from "app/assets/images/banner/hoa-3.jpg";
import hoa04 from "app/assets/images/banner/hoa-4.jpg";
import hoa05 from "app/assets/images/banner/hoa-5.jpg";
import HomeIcon from '@mui/icons-material/Home';
import { Button, Divider, Tabs } from 'antd';
import { Input } from 'antd';
import Footer from 'app/components/home-component/Footer';
import EditForm from './components/EditForm';
import HistoryForm from './components/HistoryForm';
import DashboardForm from './components/DashboardForm';
import ShareForm from './components/ShareForm';
import SettingForm from './components/SettingForm';
import NavbarMunuForm from './components/NavbarMunuForm';

const FormDetailPage = () => {
    const [value, setValue] = React.useState(0);

    const [form, setForm] = useState(

        {
            tieuDe: "Đánh giá Độ Hài Hòa Xã Hội",
            moTa: "Khảo sát này nhằm đánh giá mức độ hài hòa và công bằng trong xã hội từ quan điểm của người dân.",
            banner: hoa01
        });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="">
            <div className='banner-top'>
                <img src={banner} style={{ width: "100%" }}></img>
            </div>
            {/* <Divider></Divider> */}
            <NavbarMunuForm content={{ type: true, title: "Đánh Giá Hiệu Quả Dịch Vụ Công", history: "ĐƯỢC LƯU LÚC 11:26 THỨ HAI, 1 THÁNG 4, 2024" }} />
            <div className='w-lg-80pt'>

                <Tabs
                    className='tab-menu'
                    defaultActiveKey="1"
                    items={[
                        {
                            key: '1',
                            label: 'Thiết kế',
                            children: <EditForm />,
                        },
                        {
                            key: '2',
                            label: 'Lịch sử chỉnh sửa',
                            children: <HistoryForm />
                        },
                        {
                            key: '3',
                            label: 'Thống kê',
                            children: <DashboardForm />
                        },
                        {
                            key: '4',
                            label: 'Chia sẻ',
                            children: <ShareForm />,
                        },
                        {
                            key: '5',
                            label: 'Cài đặt',
                            children: <SettingForm />,
                        },
                    ]}
                // onChange={onChange}
                />



                <Divider></Divider>
            </div>

            <Footer></Footer>
        </div >

    );
};


export default FormDetailPage;
