import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Divider, message, Modal, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Services from 'app/services';

import PhanLoai from 'app/common/PhanLoai';
const TinhHinhThucHien = ({ cuocKhaoSat, reloadDetail }) => {
    return (
        <div className="pt-3">
            <div className=''>
                <Divider />
                <div className='pt-2 pb-2'>
                    <p className=' bold f-16'>Danh sách đơn vị khảo sát:</p>
                    <DetailDonVi cuocKhaoSat={cuocKhaoSat} reloadDetail={reloadDetail} />
                </div>
                
            </div>
        </div >

    );
};

export default TinhHinhThucHien;
const DetailDonVi = ({ cuocKhaoSat, setDonVi, reloadDetail }) => {
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false)
    const [listDonVi, setlistDonVi] = useState([]);
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
                        title: <p>Số phiếu<br /> đã tạo</p>,
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
                
            />
        </>
    )
}