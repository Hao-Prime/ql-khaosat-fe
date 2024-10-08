import { Grid } from '@mui/material';
import { Breadcrumb, Tooltip, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { DatePicker, Space } from 'antd';
import HomeIcon from '@mui/icons-material/Home';
import dayjs from 'dayjs';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportIcon from '@mui/icons-material/Report';
import { useSelector } from 'react-redux';
import Services from 'app/services';
const { RangePicker } = DatePicker;
const DashboardPage = () => {
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [donVi, setDonVi] = useState([]);
    const [listDonViTT, setListDonViTT] = useState([]);
    const [soLuong, setSoLuong] = useState({
        soLuongKSSapHetHan: 0,
        soLuongChiTieuSapHetHan: 0,
        soLuongKSHetHan: 0,
        soLuongChiTieuHetHan: 0,
        soLuongKhaoSatDTH: 0,
        soLuongKhaoSat: 0,
        soLuongChiTieuDaDat: 0,
        soLuongChiTieu: 0,
        soLuongKhaoSatDTH1: 0,
        soLuongKhaoSat1: 0,
        soLuongChiTieuDaDat1: 0,
        soLuongChiTieu1: 0,
        soLuongChiTieuDeHoanThanh: 0,
        soLuongChiTieuDeHoanThanh1: 0,
    });
    const [filter, setFilter] = useState({
        donVi: null,
        ngayBD: dayjs().startOf('year'),
        ngayKT: dayjs().endOf('year').endOf('day')
    });
    const [state3, setState3] = useState({
        series: [],
        options: {
            chart: {
                height: 350,
                type: 'bar'
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            colors: ['#00E396'],
            dataLabels: {
                formatter: function (val, opt) {
                    const goals =
                        opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                            .goals

                    if (goals && goals.length) {
                        return `${val} / ${goals[0].value}`
                    }
                    return val
                }
            },
            legend: {
                show: true,
                showForSingleSeries: true,
                customLegendItems: ['Đã đạt', 'Số phiếu'],
                markers: {
                    fillColors: ['#00E396', '#775DD0']
                }
            }
        },


    }
    );
    const [state2, setState2] = useState({
        series: [],
        options: {
            chart: {
                type: 'donut',
            },
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    const [state, setState] = useState({
        series: [{
            name: 'Truy cập',
            data: []
        }, {
            name: 'Tài khoản tạo mới',
            data: []
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    "2024-06-19T00:00:00.000Z",
                    "2024-06-20T00:00:00.000Z",
                    "2024-06-21T00:00:00.000Z",
                    "2024-06-22T00:00:00.000Z",
                    "2024-06-23T00:00:00.000Z",
                    "2024-06-24T00:00:00.000Z",
                    "2024-06-25T00:00:00.000Z",
                    "2024-06-26T00:00:00.000Z",
                    "2024-06-27T00:00:00.000Z",
                    "2024-06-28T00:00:00.000Z",
                    "2024-06-29T00:00:00.000Z",
                    "2024-06-30T00:00:00.000Z",
                    "2024-07-01T00:00:00.000Z",
                    "2024-07-02T00:00:00.000Z"
                ],
                labels: {
                    format: 'dd/MM/yyyy',
                    formatter: function (value, timestamp) {
                        return new Date(timestamp).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    }
                }
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy'
                },
            },
            yaxis: [
                {
                    title: {
                        text: 'Số truy cập',
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: 'Tài khoản tạo mới',
                    },
                },
            ],
        },
    });
    useEffect(() => {
        realoadListSelect()
    }, []);
    useEffect(() => {
        reLoadData()
    }, [filter]);

    function reLoadData() {
        Services.getDashboardService().getSLHetHan(filter?.donVi?._id || taiKhoan?.donVi?._id)?.then(
            (res) => {
                if (res?.data) {
                    setSoLuong(soLuong => ({
                        ...soLuong,
                        soLuongKSSapHetHan: res?.data[0]?.soLuongKhaoSat || 0,
                        soLuongChiTieuSapHetHan: res?.data[0]?.soLuongCanDat || 0,
                        soLuongKSHetHan: res?.data[1]?.soLuongKhaoSat || 0,
                        soLuongChiTieuHetHan: res?.data[1]?.soLuongCanDat || 0,
                    }));
                }

            })
        Services.getDashboardService().chiTieuTungDonVi(filter?.donVi?._id || taiKhoan?.donVi?._id, filter?.ngayBD, filter?.ngayKT)?.then(
            (res) => {
                if (res?.data) {
                    let rsState3 = [
                        {
                            name: 'Số phiếu',
                            data: [

                            ]
                        }
                    ]
                    let rsState_Value2 = []
                    let rsState_Label2 = []
                    res?.data?.forEach(donVi => {
                        if (donVi?.donVi) {
                            rsState_Label2.push(donVi?.donVi?.tenDonVi)
                            rsState_Value2.push(donVi?.soLuongChiTieu)
                            let item = {
                                x: donVi?.donVi?.tenDonVi,
                                y: (donVi?.soLuongChiTieu || 0),
                                goals: [
                                    {
                                        name: 'Đã đạt',
                                        value: (donVi?.soLuongDaDat || 0),
                                        strokeWidth: 2,
                                        strokeDashArray: 2,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            }
                            rsState3[0].data?.push(item)
                        }

                    });
                    setFormatState2(rsState_Label2, rsState_Value2)
                    setFormatState3(rsState3)
                    // console.log(listDonViTT);
                    // console.log();
                    // console.log(rsState3);
                }

            })
        Services.getDashboardService().getSoLuongPhuTrach(filter?.donVi?._id || taiKhoan?.donVi?._id, filter?.ngayBD, filter?.ngayKT)?.then(
            (res) => {
                if (res?.data) {
                    setSoLuong(soLuong => ({
                        ...soLuong,

                        soLuongKhaoSatDTH: res?.data[1]?.soLuongKhaoSat || 0,
                        soLuongChiTieuDeHoanThanh: res?.data[1]?.soLuongCanDat || 0,
                        soLuongChiTieuDaDat: res?.data[0]?.soLuongDaDat || 0,

                        soLuongKhaoSat: res?.data[0]?.soLuongKhaoSat || 0,
                        soLuongChiTieu: res?.data[0]?.soLuongChiTieu || 0,

                        soLuongKhaoSatDTH1: res?.data[3]?.soLuongKhaoSat || 0,
                        soLuongChiTieuDaDat1: res?.data[2]?.soLuongDaDat || 0,

                        soLuongKhaoSat1: res?.data[2]?.soLuongKhaoSat || 0,
                        soLuongChiTieu1: res?.data[2]?.soLuongChiTieu || 0,
                        soLuongChiTieuDeHoanThanh1: res?.data[3]?.soLuongCanDat || 0,

                    }));
                }

            })

        const homQua = dayjs().add(1, 'day').endOf('day').toISOString();
        const muoiNgayTruoc = dayjs().subtract(11, 'day').startOf('day').toISOString();
        let listKhoang = [];
        let listKhoang1 = [];
        for (let i = 0; i <= 11; i++) {
            listKhoang.push(dayjs().subtract(11 - i, 'day').startOf('day').format("DD-MM-YYYY"));
        }
        for (let i = 0; i <= 11; i++) {
            listKhoang1.push(dayjs().subtract(11 - i, 'day').startOf('day').toISOString());
        }
        Services.getDashboardService().thongTinTruyCap(muoiNgayTruoc, homQua, filter?.donVi?._id || taiKhoan?.donVi?._id)?.then(
            (res) => {
                if (res?.data) {
                    let soLuongTaoMoi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    let soLuongTruyCap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    listKhoang?.forEach((tg, index) => {
                        res?.data?.forEach(element => {
                            if (tg == element?._id) {
                                if (element?.soLuongTruyCap) {
                                    soLuongTruyCap[index] = element?.soLuongTruyCap
                                }
                                if (element?.soLuongTaoMoi) {
                                    soLuongTaoMoi[index] = element?.soLuongTaoMoi
                                }
                            }
                        })
                    });
                    console.log(listKhoang);
                    console.log(soLuongTruyCap);
                    console.log(soLuongTaoMoi);
                    setFormatState1(listKhoang1, soLuongTruyCap, soLuongTaoMoi)


                }
            });


    }

    async function realoadListSelect() {
        let dataRSLisstDv = await Services.getDonViService().getSelectDonViThuocTrucTiep()
        if (dataRSLisstDv.data) {
            setListDonViTT(dataRSLisstDv?.data?.map(obj => {
                return { value: obj._id, label: obj.tenDonVi, children: formatSelect(obj.children) };
            }))
        }

    }
    function formatSelect(children) {
        return (children?.map(obj => {
            return { value: obj._id, label: obj.tenDonVi, children: formatSelect(obj.children) };
        }))

    }
    function setFormatState1(label, vale1, vale2) {
        setState({
            series: [{
                name: 'Truy cập',
                data: vale1
            }, {
                name: 'Tài khoản tạo mới',
                data: vale2
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: label,
                    labels: {
                        format: 'dd/MM/yyyy',
                        formatter: function (value, timestamp) {
                            return new Date(timestamp).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                        }
                    }
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yyyy'
                    },
                },
                yaxis: [
                    {
                        title: {
                            text: 'Số truy cập',
                        },
                    },
                    {
                        opposite: true,
                        title: {
                            text: 'Tài khoản tạo mới',
                        },
                    },
                ],
            },
        })
    }
    function setFormatState2(label, series) {
        setState2(
            {
                series: series,
                options: {
                    chart: {
                        type: 'donut',
                    },
                    labels: label,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            }
        )
    }
    function setFormatState3(series) {
        setState3({
            series: series,
            options: {
                chart: {
                    height: 350,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                colors: ['#00E396'],
                dataLabels: {
                    formatter: function (val, opt) {
                        const goals =
                            opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                                .goals

                        if (goals && goals.length) {
                            return `${goals[0].value} / ${val} `
                        }
                        return val
                    }
                },
                legend: {
                    show: true,
                    showForSingleSeries: true,
                    customLegendItems: ['Số phiếu', 'Đã đạt'],
                    markers: {
                        fillColors: ['#00E396', '#775DD0']
                    }
                }
            }
        })
    }

    return (
        <>
            <div className='pb-2 div-flex justify-between wrap'>
                <Breadcrumb
                    items={[
                        {
                            title: <p className='bold f-16 c-575762'>Trang chủ </p>,
                        },
                        {
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Dashboard</p>,
                            href: "/"
                        }

                    ]}
                />
                <div className='div-flex wrap'>
                    {taiKhoan && <div className='div-flex me-2' >
                        <p className='nowrap me-2 bold'>Đơn vị </p>
                        <TreeSelect
                            showSearch
                            style={{ width: '100%', minWidth: "190px" }}
                            dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                            allowClear
                            treeDefaultExpandAll
                            treeData={listDonViTT}
                            // defaultValue={taiKhoan?.donVi?._id}
                            placeholder={taiKhoan?.donVi?.tenDonVi}
                            onChange={(value, label) => {
                                console.log(label);
                                if (value) {
                                    setFilter({ ...filter, "donVi": { _id: value, tenDonVi: label } })
                                } else {
                                    setFilter({ ...filter, "donVi": null })
                                }

                            }}
                        />
                    </div>}
                    <RangePicker
                        format="DD/MM/YYYY"
                        defaultValue={[filter.ngayBD, filter.ngayKT]}
                        onChange={(value) => {

                            setFilter({
                                ...filter,
                                ngayBD: dayjs(value[0]),
                                ngayKT: dayjs(value[1]).endOf('day')
                            })

                        }

                        }
                    />
                </div>

            </div>

            <Grid container className='w-100pt'>

                <Grid item xs={12} sm={12} md={7} lg={8} >
                    <div className='flex'>
                        <div className='box-sld me-2'>
                            <p className='tt-d'>
                                <Tooltip placement="bottom" title="" >
                                    <span className='eqwqrqrqw'><WarningAmberIcon className='yellow2 f-40' /> Sắp hết hạn</span>
                                </Tooltip>
                                <span className='rqwttyqrwq'></span></p>
                            <p className='tt-sl-d'><span className='ipowqrqrwq f-30'> {soLuong?.soLuongKSSapHetHan}</span> <span className='tt-sl-sub'>khảo sát </span></p>
                            <p className='tt-sl-sub'>Chưa hoàn thành: {soLuong?.soLuongChiTieuSapHetHan} </p>
                        </div>
                        <div className='box-sld'>
                            <p className='tt-d'>
                                <Tooltip placement="bottom" title="" >

                                    <span className='eqwqrqrqw'> <ReportIcon className='red f-40' />Đã quá hạn</span>
                                </Tooltip>
                                <span className='rqwttyqrwq'></span>

                            </p>
                            <p className='tt-sl-d'> <span className='qtyqyqyqt f-30'>{soLuong?.soLuongKSHetHan} </span>  <span className='tt-sl-sub'>khảo sát </span></p>
                            <p className='tt-sl-sub'>- Chưa hoàn thành: {soLuong?.soLuongChiTieuHetHan} </p>
                        </div>
                    </div>
                    <div className='flex mt-2'>
                        <div className='box-sld me-2'>
                            <p className='tt-d'>
                                <Tooltip placement="bottom" title="Tổng phân công khảo sát cho đơn vị hiện tại và đơn vị dưới" >
                                    <span className='eqwqrqrqw'>Đã giao các đơn vị</span>
                                </Tooltip>

                                <Tooltip placement="bottom" title={"Riêng đơn vị " + (filter?.donVi?.tenDonVi || taiKhoan?.donVi?.tenDonVi) + " cần đạt " + soLuong?.soLuongChiTieuDeHoanThanh1 + " để hoàn thành hết khảo sát"} >
                                    <span className='rqwttyqrwq'>
                                        Riêng đơn vị: {soLuong?.soLuongKhaoSatDTH1}/{soLuong?.soLuongKhaoSat1}
                                    </span>
                                </Tooltip>
                            </p>
                            <Tooltip placement="bottom" title={"Đang thực hiện / Tổng "}>
                                <p className='tt-sl-d'>{soLuong?.soLuongKhaoSatDTH} /{soLuong?.soLuongKhaoSat}
                                    <span className='ipowqrqrwq1'>- Còn {soLuong?.soLuongChiTieuDeHoanThanh} số phiếu để hoàn thành</span></p>
                            </Tooltip>
                            <p className='tt-sl-sub'>Đang thực hiện/tổng</p>
                        </div>
                        <div className='box-sld'>
                            <p className='tt-d'>
                                <span className='eqwqrqrqw'> Tổng số phiếu giao đã đạt</span>
                                <Tooltip placement="bottom"
                                    title={"Riêng đơn vị " + (filter?.donVi?.tenDonVi || taiKhoan?.donVi?.tenDonVi)}
                                >

                                    <span className='rqwttyqrwq'>Riêng đơn vị: {soLuong?.soLuongChiTieuDaDat1}/{soLuong?.soLuongChiTieu1}</span>
                                </Tooltip>
                            </p>
                            <Tooltip placement="bottom" title={"Đã đạt / Tổng số phiếu"}>
                                <p className='tt-sl-d'> {soLuong?.soLuongChiTieuDaDat} /{soLuong?.soLuongChiTieu}</p>
                            </Tooltip>
                            <p className='tt-sl-sub'>Trong các cuộc khảo sát </p>
                        </div>
                    </div>
                    <div className='box-apxechaerr1'>
                        <p className='tt-dx'>Tổng lượng truy cập</p>
                        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
                    </div>

                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={4} >
                    <div className='uyqwoirxxx'>
                        <div className='box-apxechaerr2'>
                            <p className='tt-dx'>Phần trăm khảo sát của đơn vị</p>
                            <ReactApexChart options={state2.options} series={state2.series} type="donut" />
                        </div>
                        <div className='box-apxechaerr1'>
                            <p className='tt-dx'>Số phiếu từng đơn vị</p>
                            <ReactApexChart options={state3.options} series={state3.series} type="bar" height={350} />
                        </div>

                    </div>
                </Grid>
            </Grid>
        </>

    );
};


export default DashboardPage;
