import React, { useState } from 'react'
import { Grid, Paper, Stack, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

import banner from "app/assets/images/intrenet-so-1-1900-620.png";
import hoa01 from "app/assets/images/banner/hoa-1.jpg";
import hoa02 from "app/assets/images/banner/hoa-2.jpg";
import hoa03 from "app/assets/images/banner/hoa-3.jpg";
import hoa04 from "app/assets/images/banner/hoa-4.jpg";
import hoa05 from "app/assets/images/banner/hoa-5.jpg";
import { Button, Divider } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import { Input } from 'antd';
import Contact from 'app/components/home-component/Contact';
import Footer from 'app/components/home-component/Footer';
import NavbarMunuForm from './components/NavbarMunuForm';
const { Search } = Input;
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const MyListFormPage = () => {
    const [listForm, setListForm] = useState([

        {
            tieuDe: "Đánh giá Độ Hài Hòa Xã Hội",
            moTa: "Khảo sát này nhằm đánh giá mức độ hài hòa và công bằng trong xã hội từ quan điểm của người dân.",
            banner: hoa01
        },
        {
            tieuDe: "Đánh Giá Hiệu Quả Dịch Vụ Công",
            moTa: "Khảo sát này tập trung vào việc đo lường và đánh giá hiệu quả của các dịch vụ công cung cấp bởi chính quyền địa phương.",
            banner: hoa02
        },
        {
            tieuDe: "Phản Hồi Cộng Đồng về Quyết Định Chính Sách",
            moTa: "Khảo sát này tập trung vào việc thu thập ý kiến và phản hồi từ cộng đồng về các quyết định chính sách cụ thể của chính quyền địa phương.",
            banner: hoa03
        },
        {
            tieuDe: "Đánh Giá Mức Độ Trong Trẻo của Hệ Thống Phản Ánh Dân Chủ",
            moTa: "Khảo sát này nhằm đánh giá mức độ mở và trong trẻo của hệ thống phản ánh dân chủ, bao gồm các cơ chế như hội thảo cộng đồng, cuộc họp dân cử, và các cơ quan truyền thông công cộng.",
            banner: hoa04
        },
        {
            tieuDe: "Đo Lường Sự Tham Gia Công Dân",
            moTa: "Khảo sát này nhằm đo lường mức độ tham gia và hoạt động của công dân trong các hoạt động cộng đồng và chính trị.",
            banner: hoa05
        },
        {
            tieuDe: "Đánh Giá Mức Độ Công Bằng và Trung Thực trong Bầu Cử",
            moTa: "Khảo sát này tập trung vào đánh giá mức độ công bằng và trung thực trong quá trình bầu cử và quản lý bầu cử.",
            banner: hoa03
        },
        {
            tieuDe: "Đo Lường Sự Tương Tác và Giao Tiếp Công Dân",
            moTa: "Khảo sát này tập trung vào việc đo lường mức độ tương tác và giao tiếp giữa chính quyền và công dân.",
            banner: hoa01
        }



    ]);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="">
            <div className='banner-top'>
                <img src={banner} style={{ width: "100%" }}></img>
            </div>
            {/* <Divider></Divider> */}
            <NavbarMunuForm />
            <div className='w-lg-80pt mt-3'>
                <div className='tab-menu-list'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        <div>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab label="Biểu mẫu của tôi" />
                                <Tab label="Biểu mẫu được chia sẻ" />
                            </Tabs>
                        </div>
                        <div>
                            <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} />
                            <Button type="primary" className='btn-add btn-gra-blue bold'><AddIcon className='icon-btn' />Thêm mới</Button>

                        </div>
                    </Stack>
                </div>
                <div>
                    <Grid container spacing={5}>
                        {
                            listForm?.map((form, i) =>


                                <Grid key={i} item xs={12} md={3} className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-5">

                                    <div className="tpn_card" onClick={() => window.location.href = "/chi-tiet-bieu-mau"}>
                                        <div>

                                        </div>
                                        <img src={form?.banner} className="w-100 mb-4 pointer" />
                                        <h5 className='bold pointer'>{form?.tieuDe}</h5>
                                        <p className='moTa-p'>{form?.moTa}</p>
                                        <a className="btn tpn_btn pointer">Xem chi tiết</a>
                                    </div>


                                </Grid>


                            )
                        }



                    </Grid>
                </div>
                <Divider></Divider>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default MyListFormPage;
