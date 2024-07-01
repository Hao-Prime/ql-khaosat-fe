import { Grid } from '@mui/material';
import { Breadcrumb } from 'antd';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import HomeIcon from '@mui/icons-material/Home';


const DashboardPage = () => {
    const [state3, setState3] = useState({

        series: [
            {
                name: 'Actual',
                data: [
                    {
                        x: 'Thị trấn Tân Hưng',
                        y: 12,
                        goals: [
                            {
                                name: 'Expected',
                                value: 14,
                                strokeWidth: 2,
                                strokeDashArray: 2,
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Vĩnh Thạnh',
                        y: 44,
                        goals: [
                            {
                                name: 'Expected',
                                value: 54,
                                strokeWidth: 5,
                                strokeHeight: 10,
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Hưng Thạnh',
                        y: 54,
                        goals: [
                            {
                                name: 'Expected',
                                value: 52,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Thạnh Hưng',
                        y: 66,
                        goals: [
                            {
                                name: 'Expected',
                                value: 61,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Hưng Điền',
                        y: 81,
                        goals: [
                            {
                                name: 'Expected',
                                value: 66,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Hưng Điền B',
                        y: 67,
                        goals: [
                            {
                                name: 'Expected',
                                value: 70,
                                strokeWidth: 5,
                                strokeHeight: 10,
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Vĩnh Châu B',
                        y: 12,
                        goals: [
                            {
                                name: 'Expected',
                                value: 14,
                                strokeWidth: 2,
                                strokeDashArray: 2,
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Vĩnh Lợi',
                        y: 44,
                        goals: [
                            {
                                name: 'Expected',
                                value: 54,
                                strokeWidth: 5,
                                strokeHeight: 10,
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Vĩnh Đại',
                        y: 54,
                        goals: [
                            {
                                name: 'Expected',
                                value: 52,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Vĩnh Bửu',
                        y: 66,
                        goals: [
                            {
                                name: 'Expected',
                                value: 61,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Hưng Hà',
                        y: 81,
                        goals: [
                            {
                                name: 'Expected',
                                value: 66,
                                strokeWidth: 10,
                                strokeHeight: 0,
                                strokeLineCap: 'round',
                                strokeColor: '#775DD0'
                            }
                        ]
                    },
                    {
                        x: 'Xã Vĩnh Châu A',
                        y: 67,
                        goals: [
                            {
                                name: 'Expected',
                                value: 70,
                                strokeWidth: 5,
                                strokeHeight: 10,
                                strokeColor: '#775DD0'
                            }
                        ]
                    }
                ]
            }
        ],
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
                customLegendItems: ['Actual', 'Expected'],
                markers: {
                    fillColors: ['#00E396', '#775DD0']
                }
            }
        },


    }
    );
    const [state2, setState2] = useState({

        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
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
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Tài khoản tạo mới',
            data: [11, 32, 45, 32, 34, 52, 41]
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
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },


    });


    return (
        <>
            <div className='pb-2'>
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
                /></div>

            <Grid container className='w-100pt'>

                <Grid item xs={12} sm={12} md={7} lg={8} >
                    <div className='flex'>
                        <div className='box-sld me-2'>
                            <p className='tt-d'>
                                <span className='eqwqrqrqw'>   Hoàn thành khảo sát</span>
                                <span className='rqwttyqrwq'>25.22%</span></p>
                            <p className='tt-sl-d'>2/8</p>
                            <p className='tt-sl-sub'>Đơn vị hoàn thành</p>
                        </div>
                        <div className='box-sld'>
                            <p className='tt-d'>
                                <span className='eqwqrqrqw'>  Số lượng chỉ tiêu cần đạt</span>
                                <span className='rqwttyqrwq'>34.21%</span>

                            </p>
                            <p className='tt-sl-d'> 37/125</p>
                            <p className='tt-sl-sub'>Toàn chi tiêu</p>
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
                            <p className='tt-dx'>Chỉ tiêu từng đơn vị</p>
                            <ReactApexChart options={state3.options} series={state3.series} type="bar" height={350} />
                        </div>

                    </div>
                </Grid>
            </Grid>
        </>

    );
};

export default DashboardPage;
