import React, { useEffect, useState } from 'react'
import { Grid, Paper, Stack, } from '@mui/material';
import { styled } from '@mui/material/styles';

import banner from "app/assets/images/intrenet-so-1-1900-620.png";
import hoa01 from "app/assets/images/banner/hoa-1.jpg";
import hoa02 from "app/assets/images/banner/hoa-2.jpg";
import hoa03 from "app/assets/images/banner/hoa-3.jpg";
import hoa04 from "app/assets/images/banner/hoa-4.jpg";
import hoa05 from "app/assets/images/banner/hoa-5.jpg";
import HomeIcon from '@mui/icons-material/Home';
import { Button, Divider, Modal, Skeleton, Tabs, message } from 'antd';
import { Input } from 'antd';
import Footer from 'app/components/home-component/Footer';
import EditForm from './components/EditForm';
import HistoryForm from './components/HistoryForm';
import DashboardForm from './components/DashboardForm';
import ShareForm from './components/ShareForm';
import SettingForm from './components/SettingForm';
import NavbarMunuForm from './components/NavbarMunuForm';
import Loading from 'app/components/Loading';
import Services from 'app/services';
import 'dayjs/locale/vi'; // Import locale tiếng Việt
import dayjs from 'dayjs';
dayjs.locale('vi');

const FormDetailPage = () => {
    const [bieuMau, setBieuMau] = React.useState();
    const [tabValue, setTabValue] = React.useState("1");
    const idBieuMau = new URLSearchParams(window.location.search).get("id");
    const [loading, setLoading] = useState(false);
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList()

        return () => {
            isMounted = false;
        };
    }, [idBieuMau]);
    function reloadList() {
        setLoading(true)
        Services.getFormService().getFormDetail(idBieuMau).then(
            (res) => {

                if (res?.data) {
                    setBieuMau({ ...res?.data, thanhPhan: res?.data?.thanhPhan ? JSON?.parse(res?.data?.thanhPhan) : [] })
                    setLoading(false)
                    console.log(JSON?.parse(res?.data?.thanhPhan));
                } else {
                    // message.error();
                    Modal.error({
                        title: "Không tìm thấy biểu mẫu",
                    });
                }
            }
        )
    }
    const onChange = (e) => {
        setTabValue(e);
    }
    return (
        <div className="">
            <div className='banner-top'>
                <img src={banner} style={{ width: "100%" }}></img>
            </div>
            {loading ? <Skeleton /> : <>
                <NavbarMunuForm content={{ ...bieuMau, type: true, title: bieuMau?.tenBieuMau, history: "ĐƯỢC LƯU LÚC " + dayjs(bieuMau?.ngayLuuGanNhat)?.format('HH:mm dddd, D [THÁNG] M, YYYY') }} />
                <div className='w-lg-80pt'>
                    <Tabs
                        className='tab-menu'
                        defaultActiveKey="1"
                        items={[
                            {
                                key: '1',
                                label: 'Thiết kế',
                                children: <EditForm bieuMau={bieuMau} />,
                            },
                            {
                                key: '2',
                                label: 'Lịch sử chỉnh sửa',
                                children: <HistoryForm bieuMau={bieuMau} />
                            },
                            {
                                key: '3',
                                label: 'Thống kê',
                                children: <DashboardForm bieuMau={bieuMau} />
                            },
                            {
                                key: '4',
                                label: 'Chia sẻ',
                                children: <ShareForm bieuMau={bieuMau} />,
                            },
                            {
                                key: '5',
                                label: 'Cài đặt',
                                children: <SettingForm bieuMau={bieuMau} reloadList={reloadList} />,
                            },
                        ]}
                        onChange={onChange}
                    />
                    <Divider></Divider>
                </div>
            </>}
            <Footer></Footer>
        </div >

    );
};


export default FormDetailPage;
