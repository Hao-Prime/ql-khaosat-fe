
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
const KeHoachKhaoSatPage = (keHoach,setTabValue) => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [listCuocKhaoSat, setListCuocKhaoSat] = useState([]);
    const [listCuocKhaoSatMD, setListCuocKhaoSatMD] = useState([]);
    const [cuocKhaoKhatUp, setCuocKhaoSatUp] = useState();
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
        reLoadList()
    }, []);
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

        let dataRSLisstDv = await Services.getCuocKhaoSatService().getAll({ isShare: 1, search: searchValue, trangThai: 0 })
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
                    title: 'Bạn có chắc muốn xóa cuộc khảo sát này',
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
        }, 500),
        [],
    );


    return (
        <>
            <div className="">
                <CuocKhaoSatModal open={openCuocKhaoSatModal} setOpen={setOpenCuocKhaoSatModal} cuocKhaoKhatUp={cuocKhaoKhatUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenCuocKhaoSatModal(true); setCuocKhaoSatUp() }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                                navigate(`/quan-tri/chi-tiet-khao-sat?id=${record?.maKhaoSat}`)
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
