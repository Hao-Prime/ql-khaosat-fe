import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import { DatePicker, Divider, Space } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const DashboardForm = () => {
    const [barChartValue2, setBarChartValue2] = useState();
    const defaultValue = [dayjs('2024-01-01'), dayjs()];
    const [listDataRS, setListDataRS] = useState([


        {
            label: "II. Hộ gia đình thuộc diện chính sách: ",
            count: 147,
            type: "label-v2",
            children: [
                { label: "Hộ nghèo ", value: 1, type: "value" },
                { label: "Hộ cận nghèo ", value: 3, type: "value" },
                { label: "Hộ Hộ neo đơn ", value: 5, type: "value" },
                { label: "Hộ chính sách ", value: 10, type: "value" },
                { label: "Khác (ghi rõ)", value: 138, type: "value" },
            ],

        },
        {
            label: "III. Kinh tế hộ gia đình",
            count: 147,
            type: "label-v1",
            children: [
                {
                    label: "Có thành lập doanh nghiệp, công ty",
                    count: 147,
                    type: "label-v1",
                    children: [
                        {
                            label: "Số lượng công nhân",
                            count: 147,
                            type: "label-v2",
                            children: [
                                { label: "Từ 1 đến 30", value: 94, type: "value" },
                                { label: "Từ 30 đến 60 ", value: 39, type: "value" },
                                { label: "Từ 60 đến 100 ", value: 28, type: "value" },
                                { label: "Trên 100", value: 10, type: "value" },
                            ],

                        },
                        {
                            label: "Mặt hàng sản xuất",
                            count: 147,
                            type: "label-v2",
                            children: [
                                { label: "May mặt", value: 41, type: "value" },
                                { label: "Xuất khẩu thanh long", value: 32, type: "value" },
                                { label: "Vật liệu xây dựng", value: 25, type: "value" },
                                { label: "Xây dựng", value: 19, type: "value" },
                                { label: "gara ô tô", value: 13, type: "value" },
                                { label: "Khác", value: 83, type: "value" },
                            ],

                        },
                    ],

                },
                {
                    label: "Cung cấp dịch vụ nhà trọ, khách sạn",
                    count: 127,
                    type: "label-v1",
                    children: [
                        {
                            label: "Số lượng phòng trọ",
                            count: 127,
                            type: "label-v2",
                            children: [
                                { label: "Từ 1 đến 30", value: 74, type: "value" },
                                { label: "Từ 30 đến 60 ", value: 39, type: "value" },
                                { label: "Từ 60 đến 100 ", value: 28, type: "value" },
                                { label: "Trên 100", value: 10, type: "value" },
                            ],

                        },
                        {
                            label: "Có sử dụng phần mềm khai báo khách trọ",
                            count: 127,
                            type: "label-v2",
                            children: [
                                { label: "Có", value: 22, type: "value" },
                                { label: "Không", value: 105, type: "value" },

                            ],

                        },
                        {
                            label: "Có sử dụng phần mềm quản lý",
                            count: 127,
                            type: "label-v2",
                            children: [
                                { label: "Có", value: 26, type: "value" },
                                { label: "Không", value: 101, type: "value" },

                            ],

                        },
                    ],

                },

            ],

        }
    ]);
    useEffect(() => {
        setBarChartValue2({
            series: [{
                name: 'Số lượng ',
                data: [
                    21, 11, 32, 6, 18, 55, 38, 2, 10, 45, 20, 32, 41, 28, 26, 17, 33, 10, 41
                ]
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
                labels: [
                    "2024-03-28", "2024-03-29", "2024-03-30", "2024-03-31", "2024-04-01",
                    "2024-04-02", "2024-04-03", "2024-04-04", "2024-04-05", "2024-04-06",
                    "2024-04-07", "2024-04-08", "2024-04-09", "2024-04-10", "2024-04-11",
                    "2024-04-12", "2024-04-13", "2024-04-14", "2024-04-15"
                ],

            }
        })
    }, []);
    return (
        <div className="pt-3">

            <div className='flex justify-center'>
                <RangePicker defaultValue={defaultValue} format="DD/MM/YYYY" />
            </div>
            <div className="" >
                <p className='p-2'><b>Thống kê theo thời gian</b></p>
            </div>
            {barChartValue2 && <Chart {...barChartValue2} height="400px" />}

            <div className='form-dashboard-detail'>
                <p className='text-center bold f-30'>KẾT QUẢ KHẢO SÁT</p>
                <Divider />
                {listDataRS?.map((e) =>
                    <DetailPhanTram object={e} level={0}></DetailPhanTram>

                )}



            </div>
        </div >

    );
};

export default DashboardForm;
const DetailPhanTram = ({ object, level }) => {

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

                <table>
                    <tbody>
                        <tr>
                            <td> <b> <span>{'-'.repeat(level)}</span>&ensp; {object?.label}</b>: {object?.count}</td>
                            <td className='t-value'>Số lượng</td>
                            <td className='t-value'>Phần trăm</td>
                        </tr>
                        {object?.children?.map((ch) =>
                            <DetailPhanTram object={{ ...ch, count: object?.count }} level={level + 1} />
                        )}


                    </tbody>
                </table>
            </> :

                object?.type == "value" ?
                    <DetailSoLuongTR object={{ ...object }} />
                    : <></>

        }

        </>
    )
}
const DetailSoLuongTR = ({ object }) => {

    return (
        <tr>
            <td className='t-label'> &emsp;• {object?.label}</td>
            <td className='text-center'>{object?.value}</td>
            <td className='text-right'>{parseFloat((object?.count !== 0 ? (object?.value / object?.count) * 100 : 0).toFixed(2))}%</td>
        </tr>
    )
}