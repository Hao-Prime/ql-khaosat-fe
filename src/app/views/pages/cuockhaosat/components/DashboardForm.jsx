import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { Button, DatePicker, Divider, message, Modal, Space, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import Services from 'app/services';
import ReactApexChart from 'react-apexcharts';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PieChartIcon from '@mui/icons-material/PieChart';
import FormatDate from 'app/common/FormatDate';

import DanhSachNguoiKhaoSat from './DanhSachNguoiKhaoSat';
import PhanLoai from 'app/common/PhanLoai';
const { RangePicker } = DatePicker;

const DashboardForm = ({ cuocKhaoSat, reloadDetail }) => {
    const [thongKeChiTiet, setThongKeChiTiet] = useState([]);
    const [donVi, setDonVi] = useState();
    const [barChartValue2, setBarChartValue2] = useState();
    const [listThongKe, setListThongKe] = useState();
    const [defaultDateValue, setdefaultDateValue] = useState();
    const defaultValue = [dayjs('2024-01-01'), dayjs()];
    const [listDataRS, setListDataRS] = useState();
    const [tongSoLuongKetQua, settongSoLuongKetQua] = useState();
    const listTypeAccept = ["radio", "select", "columns", "selectboxes", "container", "tabs"]

    useEffect(() => {
        if (cuocKhaoSat?.thanhPhan) {

            if (defaultDateValue?.length > 0) {
                reloadList(defaultDateValue[0], defaultDateValue[1])
            } else {
                const [ngayBD, ngayKT] = findDates(cuocKhaoSat)

                setdefaultDateValue([ngayBD, ngayKT]);
            }
        }
    }, [cuocKhaoSat, defaultDateValue]);
    function reloadList(ngayBD, ngayKT) {


        Services.getCuocKhaoSatService().thongKeSoLuongKhaoSatKhaoSatTheoThoiGian(cuocKhaoSat?._id, ngayBD?.format()?.substring(0, 19) + "Z", ngayKT?.format()?.substring(0, 19) + "Z").then(
            (res) => {
                if (res?.data) {
                    settongSoLuongKetQua(res?.data?.find(e => e._id == "tongSL").soLuong)
                    let { resultDates, resultSoLuong } = extractDateRangeData(ngayBD, ngayKT, res?.data);
                    Services.getCuocKhaoSatService().thongKeKetQua(cuocKhaoSat?._id).then(
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
            setListDataRS(convertDTO(cuocKhaoSat?.thanhPhan));
        }
    }, [listThongKe]);
    function findDates(cuocKhaoSat) {
        let ngayBD = dayjs().startOf('day'); // Mặc định ngày bắt đầu là 00:00:00
        let ngayKT = dayjs();

        if (cuocKhaoSat?.ngayKT || cuocKhaoSat?.ngayBD) {
            if (cuocKhaoSat?.ngayKT && cuocKhaoSat?.ngayBD) {
                // Nếu cả hai ngày đều có giá trị
                ngayKT = dayjs(cuocKhaoSat.ngayKT);
                ngayBD = dayjs(cuocKhaoSat.ngayBD).startOf('day');
            } else if (cuocKhaoSat?.ngayKT) {
                // Nếu chỉ có ngày KT
                ngayKT = dayjs(cuocKhaoSat.ngayKT);
                ngayBD = ngayKT.subtract(15, 'day').startOf('day');
            } else {
                // Nếu chỉ có ngày BD
                ngayBD = dayjs(cuocKhaoSat.ngayBD).startOf('day');
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
                {defaultDateValue && <RangePicker valueFormat="YYYY-MM-DDTHH:mm:ss.SSSZ" defaultValue={defaultDateValue} format="DD/MM/YYYY" onChange={(dates, dateStrings) => { setdefaultDateValue([dayjs(dateStrings[0], 'DD/MM/YYYY'), dayjs(dateStrings[1], 'DD/MM/YYYY').endOf('day')]) }} />}
            </div>
            <div className="" >
                <p className='p-2 f-16'><b>Tần suất tham gia khảo sát</b></p>
            </div>
            {barChartValue2 && <Chart {...barChartValue2} height="360px" />}

            <div className=''>
                <div className='flex justify-center'>
                    <p className='text-center bold f-22'>KẾT QUẢ KHẢO SÁT ({tongSoLuongKetQua})</p>
                </div>



                <Divider />
                <div className='pt-2 pb-2'>
                    <p className=' bold f-16'>Danh sách đơn vị khảo sát:</p>
                    <DetailDonVi cuocKhaoSat={cuocKhaoSat} setDonVi={setDonVi} reloadDetail={reloadDetail} />
                </div>
                <Divider />
                <DanhSachNguoiKhaoSat cuocKhaoSat={cuocKhaoSat} donVi={donVi} reloadDetail={reloadDetail}></DanhSachNguoiKhaoSat>
                <Divider />
                <div className='flex justify-between'>
                    <p className='text-center bold f-16'>Biểu đồ</p>

                </div>
                <div className='form-dashboard-detail'>
                    {listDataRS?.map((e) =>
                        <DetailPhanTram object={e} level={0}></DetailPhanTram>

                    )}
                </div>
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
const DetailDonVi = ({ cuocKhaoSat, setDonVi, reloadDetail }) => {
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false)
    const [sendingUptaiKhoan, setSendingUptaiKhoan] = useState(false)
    const [listDonVi, setlistDonVi] = useState([]);
    const [listDonViSave, setlistDonViSave] = useState([]);
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [modal, contextHolder] = Modal.useModal();
    useEffect(() => {

        reloadData()
    }, []);
    async function reloadData(params) {

        setLoading(true)
        let resListAllDonVi = (await Services.getDonViService().getSelectToanBoDonViDuoi())?.data
        let resListDonViPhuTrach = (await Services.getCuocKhaoSatService().getListDonViPhuTrach(cuocKhaoSat?._id))?.data
        setlistDonVi(formatData(resListAllDonVi, resListDonViPhuTrach))
        setLoading(false)
    }
    const formatData = (listAll, listSave) => {
        let rs = []
        listAll?.forEach(element => {

            let dvnpt = listSave?.find(obj => element?._id == obj?.donVi?._id)

            if (dvnpt) {
                rs.push({
                    ...element,
                    chiTieu: dvnpt?.chiTieu,
                    chiTieuDaDat: dvnpt?.chiTieuDaDat,
                    trangThai: dvnpt?.trangThai,
                    ngayBD: dvnpt.ngayBD,
                    ngayTiepNhan: dvnpt.ngayTiepNhan,
                    ngayKTTT: dvnpt.ngayKTTT,
                    ngayKT: dvnpt?.ngayKT,
                    chiTieuBaoCao: dvnpt?.chiTieuBaoCao || 0,
                    soLuongTong: dvnpt.chiTieuDaDat || 0,
                    // ...getContChild(element?.children, dvnpt.chiTieuDaDat || 0, 0),
                    children: formatData(element?.children, listSave)
                })

            }


        });

        return rs?.length == 0 ? null : rs
    }
    const getContChild = (children, slParent) => {
        let rs = 0
        children?.forEach(element => {
            if (element?.children) {
                rs = rs + getContChild(element?.children, element.chiTieuDaDat || 0).soLuongTong
            } else {
                rs = rs + (element.chiTieuDaDat || 0)
            }
        });
        return { soLuongTong: rs + slParent }
    }
    const handleComplete = async (idDonVi) => {
        const confirmed = await modal.confirm({
            title: "Bạn có chắc muốn kết thúc khảo sát của đơn vị này",
            content: "Các kết quả sẽ chuyển lên đơn vị trên - Các đơn vị dưới đều sẽ kết thúc, ngời dùng không thể khảo sát cho đơn vi này nữa",


        });
        if (confirmed) {
            Services.getCuocKhaoSatService().hoanThanhKhaoSat(cuocKhaoSat?._id, idDonVi)?.then(
                (res) => {
                    setSending(false)
                    message.success("Lưu thành công")
                    reloadDetail()
                    reloadData()
                }
            )
        }
    }
    return (
        <>{contextHolder}

            <Table
                rowKey="_id"
                columns={[
                    // {
                    //     title: '',
                    //     width: '10px'
                    // },
                    {
                        title: 'Tên đơn vị',
                        render: (data) => (<p className=''>{data?.tenDonVi} </p>),
                        width: 280,
                        fixed: windowScreen ? 'left' : false
                    },

                    {
                        title: <p>Ngày bắt đầu <br /> Ngày kết thúc</p>,
                        render: (data) => (
                            <p>{data?.ngayBD ? dayjs(data?.ngayBD).format("DD/MM/YYYY HH:mm") : <>{dayjs(cuocKhaoSat?.ngayBD).format("DD/MM/YYYY HH:mm")}<br /></>}
                                 {data?.ngayBD && <br />}
                                {data?.ngayKT ? dayjs(data?.ngayKT).format("DD/MM/YYYY HH:mm") : "-"}
                            </p>),
                    },

                    {
                        title: <p>Ngày tiếp nhận <br /> Ngày hoàn thành</p>,
                        render: (data) => (
                            <p>

                                {data?.ngayTiepNhan ? dayjs(data?.ngayTiepNhan).format("DD/MM/YYYY HH:mm") : "-"}
                                {data?.ngayTiepNhan && <br />}
                                {data?.ngayKTTT ? dayjs(data?.ngayKTTT).format("DD/MM/YYYY HH:mm") : "-"}
                            </p>),
                    },
                    {
                        title: 'Trạng thái',
                        key: 'trangThai',
                        render: (data) => (
                            <>

                                {PhanLoai.getTimeStatus(data?.ngayBD, data?.ngayKT, data?.ngayTiepNhan, data?.ngayKTTT)}
                                <br />
                                <p className={data?.trangThai == 3 ? "green" : data?.trangThai == 2 ? "blue" : "black"}>
                                    {PhanLoai?.getPhanLoaiYeuCau(data?.trangThai)}
                                </p></>
                        ),
                        className: 'nowrap',
                        align: "center",
                    },
                    {
                        title: 'Số phiếu',
                        dataIndex: 'chiTieu',
                        className: 'nowrap',
                        align: "center",
                    },
                    {
                        title: <p>Số khảo sát<br /> đã tạo</p>,
                        dataIndex: 'soLuongTong',
                        align: "center",
                        className: 'nowrap',
                        render: (data, record) => (<p>{
                            record?.chiTieu > 0 ?
                                `${record?.chiTieuDaDat}(${Math.floor(record?.chiTieuDaDat * 100 / record?.chiTieu)}%)`
                                : "0(0%)"} </p>),
                    },
                    {
                        title: 'Đã báo cáo',

                        className: 'nowrap',
                        align: "center",
                        render: (data) => (<p className=''>
                            {data?.chiTieuBaoCao || 0}
                        </p>),
                    },
                    {
                        title: <p>Cập nhật <br /> hoàn thành</p>,

                        className: 'nowrap',
                        align: "center",
                        render: (data, record) => (
                            <div className='w-100pt'>
                                {(record?.trangThai < 3 && record?._id != cuocKhaoSat?.donViPhuTrach?.donVi?._id) &&
                                    <Tooltip placement="bottom" title={"Hoàn thành giúp đơn vị - khi đơn vị trực thuộc đã đạt số phiếu."} >
                                        <Button type="primary" className='mt-1  m-auto' onClick={(e) => { e.stopPropagation(); handleComplete(record?._id) }}>Hoàn thành</Button>
                                    </Tooltip>
                                }
                            </div>),
                    },

                ]}
                className='pointer mt-1 table-cus-antd'
                loading={loading}
                dataSource={listDonVi}
                pagination={false}
                scroll={{ x: 'max-content' }}
                tableLayout="fixed"
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setDonVi(record)
                        },
                    };
                }}
            />
        </>
    )
}