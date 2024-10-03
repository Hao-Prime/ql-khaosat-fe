
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import CuocKhaoSatModal from '../../cuockhaosat/CuocKhaoSatModal';
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
const KeHoachKhaoSatPage = ({keHoach, setTabValue, tabValue}) => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [listCuocKhaoSat, setListCuocKhaoSat] = useState([]);
    const [listCuocKhaoSatMD, setListCuocKhaoSatMD] = useState([]);
    const [cuocKhaoSatUp, setCuocKhaoSatUp] = useState();
    const [openCuocKhaoSatModal, setOpenCuocKhaoSatModal] = useState(false);
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
        console.log(tabValue);
        if (tabValue == "2") {
            if (!keHoach?._id) {
                setTabValue('1')
            } else {
                reLoadList()
            }
        }

    }, [tabValue]);
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

        let dataRSLisstDv = await Services.getCuocKhaoSatService().getAll({ idKeHoach: keHoach?._id })
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
    const handleSearch = useCallback(
        debounce(async (e) => {
            setSearchValue(e?.target?.value)
        }, 500),
        [],
    );
    return (
        <>
            <div className="">
                <CuocKhaoSatModal open={openCuocKhaoSatModal} setOpen={setOpenCuocKhaoSatModal} cuocKhaoSatUp={cuocKhaoSatUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenCuocKhaoSatModal(true); setCuocKhaoSatUp({keHoach:{_id: keHoach?._id}}) }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
                    </div>
                    <div>
                        <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} onChange={handleSearch} />
                    </div>
                </div>
                {contextHolder}
                <Table
                    rowKey="_id"
                    loading={loading}
                    columns={[
                        {
                            title: "STT",
                            width: 40,
                            align: "center",
                            render: (data, record, index) => (<p>{(limit * (page - 1) + (index + 1))}</p>),
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
                                <p >{data?.ngayBD ? dayjs(data?.ngayBD)?.format('DD/MM/YYYY HH:mm') : ""}
                                    <br />
                                    {data?.ngayKT ? dayjs(data?.ngayKT)?.format('DD/MM/YYYY HH:mm') : ""}
                                </p>
                            ),
                        }
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
                                navigate(`/quan-tri/chi-tiet-khao-sat?id=${record?.maKhaoSat}&burl=/quan-tri/chi-tiet-ke-hoach?id=${keHoach?._id}~!~tab=2`);
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

export default KeHoachKhaoSatPage;
