import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { Button, DatePicker, Divider, Space } from 'antd';
import dayjs from 'dayjs';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import Services from 'app/services';
import ReactApexChart from 'react-apexcharts';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PieChartIcon from '@mui/icons-material/PieChart';
import FormatDate from 'app/common/FormatDate';
import DownloadIcon from '@mui/icons-material/Download';
const { RangePicker } = DatePicker;

const DashboardForm = ({ bieuMau }) => {
    const [thongKeChiTiet, setThongKeChiTiet] = useState([]);
    const [barChartValue2, setBarChartValue2] = useState();
    const [listThongKe, setListThongKe] = useState();
    const [defaultDateValue, setdefaultDateValue] = useState();
    const defaultValue = [dayjs('2024-01-01'), dayjs()];
    const [listDataRS, setListDataRS] = useState();
    const [tongSoLuongKetQua, settongSoLuongKetQua] = useState();
    const listTypeAccept = ["radio", "select", "columns", "selectboxes", "container", "tabs"]
    useEffect(() => {
        if (bieuMau?.thanhPhan) {
            if (defaultDateValue?.length > 0) {
                reloadList(defaultDateValue[0], defaultDateValue[1])
            } else {
                const [ngayBD, ngayKT] = findDates(bieuMau)
                console.log(ngayBD);
                setdefaultDateValue([ngayBD, ngayKT]);
            }
        }
    }, [bieuMau, defaultDateValue]);
    function reloadList(ngayBD, ngayKT) {


        Services.getFormService().thongKeSoLuongKhaoSatBieuMauTheoThoiGian(bieuMau?._id, ngayBD?.format()?.substring(0, 19) + "Z", ngayKT?.format()?.substring(0, 19) + "Z").then(
            (res) => {
                if (res?.data) {
                    settongSoLuongKetQua(res?.data?.find(e => e._id == "tongSL").soLuong)
                    let { resultDates, resultSoLuong } = extractDateRangeData(ngayBD, ngayKT, res?.data);
                    Services.getFormService().thongKeKetQua(bieuMau?._id).then(
                        (res) => {
                            if (res?.data) {
                                setListThongKe(res?.data)
                            }
                        }
                    )
                    setBarChartValue2({
                        series: [{
                            name: 'Số lượng ',
                            data: resultSoLuong
                        }]
                        , type: "area",

                        options: {
                            chart: {
                                height: 350,
                                type: 'area'

                            },
                            stroke: {
                                width: 1

                            },
                            dataLabels: {
                                enabled: false,

                            },
                            labels: resultDates,

                        }
                    })
                }
            }
        )
    }
    useEffect(() => {
        if (listThongKe) {
            setListDataRS(convertDTO(bieuMau?.thanhPhan));
        }
    }, [listThongKe]);
    function findDates(bieuMau) {
        let ngayBD = dayjs().startOf('day'); // Mặc định ngày bắt đầu là 00:00:00
        let ngayKT = dayjs();

        if (bieuMau?.ngayKT || bieuMau?.ngayBD) {
            if (bieuMau?.ngayKT && bieuMau?.ngayBD) {
                // Nếu cả hai ngày đều có giá trị
                ngayKT = dayjs(bieuMau.ngayKT);
                ngayBD = dayjs(bieuMau.ngayBD).startOf('day');
            } else if (bieuMau?.ngayKT) {
                // Nếu chỉ có ngày KT
                ngayKT = dayjs(bieuMau.ngayKT);
                ngayBD = ngayKT.subtract(15, 'day').startOf('day');
            } else {
                // Nếu chỉ có ngày BD
                ngayBD = dayjs(bieuMau.ngayBD).startOf('day');
                ngayKT = ngayBD.add(15, 'day').subtract(1, 'minute').endOf('day');

                // So sánh ngày kết thúc với ngày hiện tại
                ngayKT = ngayKT.isAfter(dayjs()) ? dayjs().endOf('day') : ngayKT;
                // Kiểm tra nếu ngày KT cách ngày BD quá 15 ngày
                if (ngayKT.diff(ngayBD, 'day') > 15) {
                    ngayKT = ngayBD.add(15, 'day').endOf('day');
                }
            }
        } else {
            // Nếu cả hai ngày đều không có giá trị
            ngayKT = dayjs();
            ngayBD = ngayKT.subtract(15, 'day').startOf('day');
        }

        return [ngayBD, ngayKT];
    }
    function extractDateRangeData(ngayBD, ngayKT, dataList) {
        let currentDate = dayjs(ngayBD);
        let resultDates = [];
        let resultSoLuong = [];

        // Duyệt qua mỗi ngày từ ngày bắt đầu đến ngày kết thúc
        while (currentDate.isBefore(ngayKT, 'day') || currentDate.isSame(ngayKT, 'day')) {
            // Format ngày hiện tại thành chuỗi định dạng 'YYYY-MM-DD'
            let formattedDate = currentDate.format('YYYY-MM-DD');

            // Tìm kiếm trong dataList để lấy số lượng tương ứng với ngày hiện tại
            let soLuong = 0;
            for (let data of dataList) {
                if (data._id === formattedDate) {
                    soLuong = data.soLuong;
                    break;
                }
            }

            // Thêm ngày và số lượng tương ứng vào các mảng kết quả
            resultDates.push(dayjs(formattedDate).format('DD-MM-YYYY'));
            resultSoLuong.push(soLuong);

            // Tăng ngày hiện tại lên 1 ngày
            currentDate = currentDate.add(1, 'day');
        }
        return { resultDates, resultSoLuong };
    }

    const convertDTO = (list, typeP) => {
        let rs = []

        list?.forEach(element => {
            if (listTypeAccept?.includes(element?.type) || element?.type == undefined) {
                if (element?.type == "columns") {
                    rs = [...rs, ...convertDTO(element?.columns)]
                } else if (element?.type == undefined && typeP != "tabs") {
                    rs = [...rs, ...convertDTO(element?.components)]
                } else if (element?.type == "tabs") {
                    rs.push(
                        {
                            label: element?.label,
                            key: element?.key,
                            type: "label-v1",
                            typeComponent: element?.type,
                            children: convertDTO(element?.components, "tabs"),
                        })
                } else if (element?.type == "container" || typeP == "tabs") {
                    rs.push(
                        {
                            label: element?.label,
                            key: element?.key,
                            type: "label-v1",
                            typeComponent: element?.type,
                            children: convertDTO(element?.components),
                        })
                } else {

                    rs.push(
                        {
                            label: element?.label,
                            key: element?.key,
                            count: (element?.type == "select" || element?.type == "selectboxes") ? tongSoLuongKetQua : searchGroupKey(element?.key),
                            type: "label-v2",
                            typeComponent: element?.type,
                            children: convertValueDTO(element?.values || element?.data?.values, element?.key),
                        })
                }

            }
        });

        return rs
    }
    const convertValueDTO = (listValue, keyParent) => {
        let rs = []
        listValue?.forEach(element => {
            rs.push({ label: element?.label, value: searchValueKey(keyParent + "_" + element?.value), type: "value", typeComponent: element?.type, key: keyParent + "_" + element?.value })
        })
        return rs;
    }
    const searchValueKey = (key) => {

        return listThongKe.find(element => element?._id == key)?.count || 0;;
    }
    const searchGroupKey = (key) => {
        const sum = listThongKe.reduce((total, element) => {
            if (element?._id?.includes(key)) {
                return total + element.count;
            } else {
                return total;
            }
        }, 0);

        return sum || 0;
    }
    return (
        <div className="pt-3">

            <div className='flex justify-center'>
                {defaultDateValue && <RangePicker valueFormat="YYYY-MM-DDTHH:mm:ss.SSSZ" defaultValue={defaultDateValue} format="DD/MM/YYYY" onChange={(dates, dateStrings) => { console.log(dateStrings[1]); setdefaultDateValue([dayjs(dateStrings[0], 'DD/MM/YYYY'), dayjs(dateStrings[1], 'DD/MM/YYYY').endOf('day')]) }} />}
            </div>
            <div className="" >
                <p className='p-2'><b>Thống kê theo thời gian</b></p>
            </div>
            {barChartValue2 && <Chart {...barChartValue2} height="360px" />}

            <div className='form-dashboard-detail'>
                <div className='flex justify-between'>
                    <p className='text-center bold f-30'>KẾT QUẢ KHẢO SÁT ({tongSoLuongKetQua})</p>
                    <Button key="submit" title='Xuât chi tiết tất cả câu trả lời' type="primary">
                        <span className='white'><DownloadIcon className='f-14 me-1' />Xuất chi tiết</span>
                    </Button>


                </div>

                <Divider />
                {listDataRS?.map((e) =>
                    <DetailPhanTram object={e} level={0}></DetailPhanTram>

                )}



            </div>
        </div >

    );
};

export default DashboardForm;
const DetailPhanTram = ({ object, level, typeParrent }) => {
    const [typeView, settypeView] = useState(1);
    useEffect(() => {
        if (typeParrent) {
            settypeView(typeParrent)
        }
    }, [typeParrent]);
    const [statepie, setstatepie] = useState({
        series: [],
        options: {
            chart: {
                width: 380,
                type: 'pie',
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
        }

    });
    const [statebar, setstatebar] = useState({

        series: [{
            data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                    }
                }
            },
            // colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    ['John', 'Doe'],
                    ['Joe', 'Smith'],
                    ['Jake', 'Williams'],
                    'Amber',
                    ['Peter', 'Brown'],
                    ['Mary', 'Evans'],
                    ['David', 'Wilson'],
                    ['Lily', 'Roberts'],
                ],
                labels: {
                    style: {
                        // colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        },

    });
    useEffect(() => {
        if (object?.type == "label-v2") {
            let newpie = { ...statepie }
            let newbar = { ...statebar }
            let data = []
            let label = []
            object?.children?.forEach(element => {
                newpie?.series?.push(element?.value)
                data?.push(element?.value)
                label.push([element?.label])
                newpie?.options?.labels?.push(element?.label)
            });
            setstatepie(newpie)
            setstatebar({

                series: [{
                    data: data
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'bar',
                        events: {
                            click: function (chart, w, e) {

                            }
                        }
                    },
                    // colors: colors,
                    plotOptions: {
                        bar: {
                            columnWidth: '45%',
                            distributed: true,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        categories: label,
                        labels: {
                            style: {
                                // colors: colors,
                                fontSize: '12px'
                            }
                        }
                    }
                },

            })

        }
    }, [object]);
    return (
        <>{object?.type == "label-v1" ?
            <>
                <b><span>{'-'.repeat(level)}</span>&ensp;{object?.label}</b>: {object?.count}
                <div className='ps-2'>

                    {object?.children?.map((ch) =>
                        <DetailPhanTram object={ch} level={level + 1} />
                    )}
                </div>
            </> :
            object?.type == "label-v2" ? <>
                {typeView == 1 ?
                    <table>
                        <tbody>
                            <tr>
                                <td> <b> <span>{'-'.repeat(level)}</span>&ensp; {object?.label}</b>: {object?.count}</td>
                                <td className='t-value'>Số lượng</td>
                                <td className='t-value'>Phần trăm</td>
                                <td className='p-1'>

                                    <PieChartIcon className='f-15 pointer' onClick={() => { settypeView(2) }}></PieChartIcon>
                                </td>
                            </tr>
                            {object?.children?.map((ch) =>
                                <DetailPhanTram object={{ ...ch, count: object?.count }} level={level + 1} typeParrent={typeView} />
                            )}
                        </tbody>
                    </table> :
                    typeView == 2 ?
                        <table>
                            <tbody>
                                <tr>
                                    <td> <b> <span>{'-'.repeat(level)}</span>&ensp; {object?.label}</b>: {object?.count}</td>

                                    <td className='p-1'>
                                        {typeView == 2 && (object?.typeComponent == "selectboxes" || object?.typeComponent == "select") ? <BarChartIcon className='f-15 pointer' onClick={() => { settypeView(3) }}></BarChartIcon> :
                                            <BackupTableIcon className='f-15 pointer' onClick={() => { settypeView(1) }}></BackupTableIcon>}

                                    </td>
                                </tr>
                                <tr>

                                    <td className='flex justify-center'>
                                        <ReactApexChart options={statepie.options} series={statepie.series} type="pie" width={320} />
                                    </td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table> :

                        <table>
                            <tbody>
                                <tr>
                                    <td> <b> <span>{'-'.repeat(level)}</span>&ensp; {object?.label}</b>: {object?.count}</td>

                                    <td className='p-1'><BackupTableIcon className='f-15 pointer' onClick={() => { settypeView(1) }}></BackupTableIcon></td>
                                </tr>
                                <tr>

                                    <td className='flex justify-center'>
                                        <ReactApexChart options={statebar.options} series={statebar.series} type="bar" width={550} height={230} />
                                    </td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                }

            </> :

                object?.type == "value" ?
                    <DetailSoLuongTR object={{ ...object }} typeParrent={typeView} />
                    : <></>

        }

        </>
    )
}
const DetailSoLuongTR = ({ object, typeParrent }) => {
    const [typeView, settypeView] = useState(1);
    useEffect(() => {
        if (typeParrent) {
            settypeView(typeParrent)
        }

    }, [typeParrent]);
    return (
        <>
            {typeView == 1 ?

                <tr>
                    <td className='t-label'> &emsp;• {object?.label}</td>
                    <td className='text-center'>{object?.value}</td>
                    <td className='text-right'>{parseFloat((object?.count !== 0 ? (object?.value / object?.count) * 100 : 0).toFixed(2))}%</td>
                    <td></td>
                </tr>
                :
                <tr>
                    <td className='t-label'> </td>
                    <td >

                    </td>
                    <td></td>
                </tr>
            }
        </>

    )
}