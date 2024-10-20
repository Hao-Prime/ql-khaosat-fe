
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import CuocKhaoSatModal from './CuocKhaoSatModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from "lodash";
import SapXep from 'app/common/SapXep';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import FormatString from 'app/common/FormatString';
import { useSelector } from 'react-redux';
import PhanLoai from 'app/common/PhanLoai';
const { Search } = Input;
const items = [
    {
        key: '1',
        label: "Cập nhật",
    },
    {
        key: '2',
        danger: true,
        label: 'Xóa',
    },
];
const CuocKhaoSatPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [listCuocKhaoSat, setListCuocKhaoSat] = useState([]);
    const [listCuocKhaoSatMD, setListCuocKhaoSatMD] = useState([]);
    const [cuocKhaoKhatUp, setCuocKhaoSatUp] = useState();
    const [openCuocKhaoSatModal, setOpenCuocKhaoSatModal] = useState(false);
    // const [trangThai, setTrangThai] = useState(new URLSearchParams(window.location.search).get("trangThai");
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const trangThai = searchParams.get("trangThai");
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const taiKhoan = useSelector(state => state.taiKhoan)
    useEffect(() => {
        reLoadList()

    }, [trangThai]);
    useEffect(() => {
        if (listCuocKhaoSatMD) {
            let data = listCuocKhaoSatMD?.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });
            setListCuocKhaoSat(data);
        }

    }, [limit, page, listCuocKhaoSatMD]);
    async function reLoadList(params) {
        setLoading(true)

        let dataRSLisstDv = await Services.getCuocKhaoSatService().getAll({ isShare: 1, search: searchValue, trangThai: trangThai })
        if (dataRSLisstDv.data) {
            setListCuocKhaoSatMD(dataRSLisstDv?.data)
            setPage(1)
        } else {
            setListCuocKhaoSatMD([])
            setPage(1)
        }
        setLoading(false)
    }
    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        setLimit(pageSize)
    };
    const onClick = async (key, data) => {

        switch (key?.key) {
            case "1":
                setOpenCuocKhaoSatModal(true)
                setCuocKhaoSatUp(data)
                break;
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa đơn vị này',
                    content: "",
                });
                // console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
                    Services.getCuocKhaoSatService().deleteByID(data?._id)?.then(
                        (res) => {
                            if (res?.data?.error) {
                                alert(res?.data?.message)
                            } else {
                                reLoadList()
                            }
                        });
                }

                break;

        }
    };
    const handleSearch = useCallback(
        debounce(async (e) => {
            setSearchValue(e?.target?.value)
            // setLoading(false)
            // let dataRSLisstDv = await Services.getCuocKhaoSatService().getAll(e?.target?.value)

            // if (dataRSLisstDv?.data?.length == 0) {
            //     message.error("Không tìm thấy khảo sát")
            // } else {
            //     // setListCuocKhaoSatMD(SapXep.sapXepTheoObjectAtrVaAtr(dataRSLisstDv?.data, "cuocKhaoKhatTrucThuoc", "stt", -1, 1))
            //     setListCuocKhaoSatMD(dataRSLisstDv?.data)
            //     setPage(1)
            // }

        }, 500),
        [],
    );
    function getSoLuongDonViHoanThanh(listDonVi) {
        var count = 0
        listDonVi?.forEach(dv => {
            if (dv?.trangThai == 3) {
                count++;
            }
        });
        return count

    }
    function checkTrangThaiBieuMau(bieuMau) {
        if (bieuMau?.trangThai == 0) {
            return <p className="status-danger ">Đã vô hiệu</p>
        }
        let donvTHPT = bieuMau.listDonViPhuTrach?.find(obj => obj?.donVi?._id == taiKhoan?.donVi?._id)
        if (donvTHPT) {
            if (bieuMau?.donViPhuTrach?.trangThai == 3) {
                return <p className="status-cuccess ">Đã kết thúc</p>// Sắp diễn ra
            }
        }
        if (bieuMau?.donViPhuTrach == 3) {
            return <p className="status-cuccess ">Đã kết thúc</p>// Sắp diễn ra
        }
        if (bieuMau?.ngayBD) {
            if (dayjs(bieuMau?.ngayBD).isAfter(dayjs())) {
                return <p className="status-cyan ">Sắp diễn ra</p>// Sắp diễn ra
            }
        }
        if (bieuMau?.ngayKT) {
            if (dayjs(bieuMau?.ngayKT).isBefore(dayjs())) {
                return <p className="status-cuccess ">Đã kết thúc</p>// Đã kết thúc
            }
        }
        return <p className="status-cyan ">Đang diễn ra</p>;//Đâng diễn ra
    }
    async function tiepNhanKhaoSat(idDonVi, idKhaoSat) {
        const confirmed = await modal.confirm({
            title: 'Bạn muốn tiếp nhận khảo sát này',
            content: "",
        });

        if (confirmed) {
            setLoading(true)
            Services.getCuocKhaoSatService().tiepNhanKhaoSat(idDonVi, idKhaoSat).then(
                () => {
                    reLoadList()
                }
            )
        }
    }
    const TiepNhanComp = ({ record }) => {
        const idDV = FormatString.getTrangThaiKhaoSatTheoDonVi(record, taiKhoan?.donVi?._id)
        return (
            <> {idDV &&
                <div className='w-100pt'>
                    <Button type="primary" className='mt-1  m-auto' onClick={(e) => { e.stopPropagation(); tiepNhanKhaoSat(idDV, record?._id) }}>Tiếp nhận</Button>
                </div>
            }
            </>
        )
    }
    function getPhuTrac(cuocKhaoSat) {
        let rs
        if (cuocKhaoSat?.donVi?._id == taiKhoan?.donVi?._id) {
            return (
                <>
                    <p >
                        {cuocKhaoSat?.ngayBD ? dayjs(cuocKhaoSat?.ngayBD)?.format('DD/MM/YYYY HH:mm') : ""}
                        <br />
                        {cuocKhaoSat?.ngayKT ? dayjs(cuocKhaoSat?.ngayKT)?.format('DD/MM/YYYY HH:mm') : ""}
                    </p>
                </>
            );
        }
        cuocKhaoSat?.listDonViPhuTrach?.forEach(element => {
            if (element?.donVi?._id == taiKhoan?.donVi?._id) {
                rs = element
            }
        });
        if (rs) {
            return (
                <>
                    <p >
                        {rs?.ngayBD ? dayjs(rs?.ngayBD)?.format('DD/MM/YYYY HH:mm') : ""}
                        <br />
                        {rs?.thoiHan ? dayjs(rs?.thoiHan)?.format('DD/MM/YYYY HH:mm') : ""}
                    </p>
                </>
            );
        }

    }
    function getPhuTrac1(cuocKhaoSat) {
        let rs
        if (cuocKhaoSat?.donVi?._id == taiKhoan?.donVi?._id) {
            return (
                <>
                    <p >
                        <>{cuocKhaoSat?.ngayKT &&
                            PhanLoai.getTimeStatus(cuocKhaoSat?.ngayBD, cuocKhaoSat?.ngayKT, null, cuocKhaoSat?.ngayKTTT)}</>
                        <br />
                        {cuocKhaoSat?.ngayKTTT ? dayjs(cuocKhaoSat?.ngayKTTT)?.format('DD/MM/YYYY HH:mm') : ""}
                    </p>
                </>
            );
        }
        cuocKhaoSat?.listDonViPhuTrach?.forEach(element => {
            if (element?.donVi?._id == taiKhoan?.donVi?._id) {
                rs = element
            }
        });
        if (rs) {
            return (
                <>
                    <p >
                        <>{rs?.thoiHan &&
                            PhanLoai.getTimeStatus(rs?.ngayBD, rs?.ngayKT, null, rs?.ngayKTTT)}</>
                        <br />
                        {rs?.ngayKTTT ? dayjs(rs?.ngayKTTT)?.format('DD/MM/YYYY HH:mm') : ""}
                    </p>
                </>
            );
        }

    }
    return (
        <>
            <div className='pb-2'>
                <Breadcrumb
                    items={[
                        { title: <p className='bold f-16 c-575762' onClick={() => navigate("/")}>Trang chủ </p> },
                        { title: <p className='bold f-16 c-blue2' onClick={() => navigate(`/quan-tri/khao-sat?trangThai=0`)}><HomeIcon className='mb-1' />Mẫu khảo sát</p> }
                    ]}
                /></div>

            <div className="page-new">
                <CuocKhaoSatModal open={openCuocKhaoSatModal} setOpen={setOpenCuocKhaoSatModal} cuocKhaoKhatUp={cuocKhaoKhatUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        {/* <Button onClick={() => { setOpenCuocKhaoSatModal(true); setCuocKhaoSatUp() }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button> */}
                    </div>
                    <div>
                        <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} onChange={handleSearch} />
                    </div>
                </div>
                {contextHolder}
                <Table
                    rowKey="_id"
                    loading={loading}
                    bordered
                    columns={[
                        {
                            title: "STT",
                            width: 40,
                            align: "center",
                            render: (data, record, index) => (<p>{(limit * (page - 1) + (index + 1))}</p>),
                        },
                        {
                            title: "Mã",
                            align: "center",
                            render: (data, record) => (
                                <div>
                                    {/* <p className='bold '>{FormatString.getMaKhaoSatTheoDonVi(record, taiKhoan?.donVi?._id)}
                                    </p> */}
                                    <TiepNhanComp record={record} />


                                </div>
                            ),
                            width: 100,
                        },
                        {
                            title: "Tiêu đề",
                            render: (data) => (<p className='moTa-p'>{data?.tieuDe}</p>),
                            width: 220,
                        },

                        {
                            title: "Mô tả",

                            width: 300,
                            render: (data) => (<p className='moTa-p'>{data?.moTa}</p>),
                        },
                        {
                            title: "Đơn vị tạo",
                            width: 120,
                            render: (data) => (<p >{data?.donVi?.tenDonVi}</p>),
                        },
                        {
                            title: "Bắt đầu/thời hạn",
                            width: 120,
                            render: (data) => (
                                <>{getPhuTrac(data,taiKhoan?.donVi)}</>
                                // <p >{data?.ngayBD ? dayjs(data?.ngayBD)?.format('DD/MM/YYYY HH:mm') : ""}
                                //     <br />
                                //     {data?.ngayKT ? dayjs(data?.ngayKT)?.format('DD/MM/YYYY HH:mm') : ""}
                                // </p>
                            ),
                        },
                        {
                            title: "Ngày hoàn thành",
                            width: 120,
                            render: (data) => (
                                <>{getPhuTrac1(data,taiKhoan?.donVi)}</>
                                // <p >{data?.ngayBD ? dayjs(data?.ngayBD)?.format('DD/MM/YYYY HH:mm') : ""}
                                //     <br />
                                //     {data?.ngayKT ? dayjs(data?.ngayKT)?.format('DD/MM/YYYY HH:mm') : ""}
                                // </p>
                            ),
                        },
                        {
                            title: "Tiến độ",
                            render: (data) => (<p>
                                Số lượng: {(data?.chiTieuDaDat || "0") + "/" + (data?.chiTieu || "0")}<br />
                                Đơn vị: {getSoLuongDonViHoanThanh(data?.listDonViPhuTrach) + "/" + (data?.listDonViPhuTrach?.length || "0")}
                            </p>),
                            key: "chiTieu",
                            align: "center",
                            width: 120,
                        },
                        // {
                        //     title: "Trạng thái",
                        //     render: (data) => (<div>{checkTrangThaiBieuMau(data)}</div>),
                        //     key: "trangThai",
                        //     align: "center",
                        //     width: 120,
                        // },

                        // {
                        //     title: " ",
                        //     render: (data) => (
                        //         <div >
                        //             <Dropdown
                        //                 menu={{
                        //                     items,
                        //                     onClick: (e) => onClick(e, data)
                        //                 }}
                        //             // onClick={(e) => }
                        //             >
                        //                 <a onClick={(e) => e.preventDefault()}>
                        //                     <Space>
                        //                         <MoreVertIcon className='f-13' />
                        //                     </Space>
                        //                 </a>
                        //             </Dropdown>
                        //         </div>
                        //     ),
                        //     fixed: windowScreen ? 'right' : false,
                        //     width: "50px"
                        // }

                    ]}
                    scroll={{ x: '100%', y: 415 }}
                    locale={{ emptyText: 'Không có dữ liệu' }}
                    style={{ minHeight: 415 }}
                    dataSource={listCuocKhaoSat}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                navigate(`/quan-tri/chi-tiet-khao-sat?id=${record?.maKhaoSat}&showkh=0&burl=/quan-tri/khao-sat?trangThai=${trangThai}`)
                            },
                        };
                    }}

                />

                <div className='div-flex justify-between'>
                    <div ><p className='red'><i><b >Lưu ý:</b> Mỗi đơn vị phụ trách sẽ có mã khác nhau</i></p></div>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}

                        total={listCuocKhaoSat?.length || 1}
                        defaultPageSize={30}
                    />
                </div>
            </div >
        </>
    );
};

export default CuocKhaoSatPage;
