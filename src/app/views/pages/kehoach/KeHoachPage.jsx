
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
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
const KeHoachPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const [listKeHoach, setListKeHoach] = useState([]);
    const [listKeHoachMD, setListKeHoachMD] = useState([]);
    const [cuocKhaoKhatUp, setKeHoachUp] = useState();
    const [openKeHoachModal, setOpenKeHoachModal] = useState(false);
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
        if (listKeHoachMD) {
            let data = listKeHoachMD?.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });
            setListKeHoach(data);
        }
    }, [limit, page, listKeHoachMD]);
    async function reLoadList(params) {
        setLoading(true)

        let dataRSLisstDv = await Services.getCuocKhaoSatService().getKeHoach("", trangThai)
        if (dataRSLisstDv.data) {
            setListKeHoachMD(dataRSLisstDv?.data)
            setPage(1)
        } else {
            setListKeHoachMD([])
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
                setOpenKeHoachModal(true)
                setKeHoachUp(data)
                break;
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa kế hoạch này',
                    content: "",
                });
                // console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
                    Services.getKeHoachService().deleteByID(data?._id)?.then(
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
            <div className='pb-2'>
                <Breadcrumb
                    items={[
                        { title: <p className='bold f-16 c-575762' onClick={() => navigate("/")}>Trang chủ </p> },
                        { title: <p className='bold f-16 c-blue2' onClick={() => navigate(`/quan-tri/ke-hoach?trangThai=1`)}><HomeIcon className='mb-1' />Kế hoạch khỏa sát</p> }
                    ]}
                /></div>

            <div className="page-new">
                <div className='flex  ieoqwpesad'>
                    <div>
                        {/* <Button onClick={() => { setOpenKeHoachModal(true); setKeHoachUp() }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button> */}
                    </div>
                    <div>
                        <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} onChange={handleSearch} />
                    </div>
                </div>
                {contextHolder}
                <Table
                    bordered
                    rowKey="_id"
                    loading={loading}
                    columns={[
                        {
                            title: "STT",
                            width: 40,
                            align: "center",
                            render: (data, record, index) => (<p className='text-center'>{(limit * (page - 1) + (index + 1))}</p>),
                        },
                        {
                            title: "Tiêu đề",
                            render: (data) => (<p className='moTa-p'>{data?.tieuDe}</p>),
                            width: 180,
                        },
                        {
                            title: "Tóm tắt",
                            width: 220,
                            render: (data) => (<p className='moTa-p'>{data?.tomTat}</p>),
                        },
                        {
                            title: "Người tạo/Ngày tạo",
                            width: 140,
                            render: (data) => (<div>
                                <p>{data?.donViTao?.tenDonVi}</p>
                                <p>{data?.nguoiTao?.hoTen}</p>
                                <p>{dayjs(data?.ngayTao)?.format('DD/MM/YYYY  HH:mm')}</p>
                            </div>),
                        },
                        {
                            title: "Đơn vị Thực hiện",
                            width: 140,
                            render: (data) => (
                                <div>
                                    {data?.donViThucHien?.map((e) =>
                                        <p key={e?._id}>{e?.tenDonVi}
                                        </p>)}
                                </div>
                            ),
                        },
                        {
                            title: "Đơn vị Phối hợp",
                            width: 140,
                            render: (data) => (
                                <div>
                                    {data?.donViThucHien?.map((e) =>
                                       <p key={e?._id}>{e?.tenDonVi}
                                        </p>)}
                                </div>
                            ),
                        },
                        {
                            title: "Bắt đầu/kết thúc",
                            width: 120,
                            render: (data) => (
                                <p >{data?.ngayBD ? dayjs(data?.ngayBD)?.format('DD/MM/YYYY') : ""}
                                    <br />
                                    {data?.ngayKT ? dayjs(data?.ngayKT)?.format('DD/MM/YYYY') : ""}
                                </p>
                            ),
                        },
                        // {
                        //     title: "Trạng thái",
                        //     width: 120,
                        //     render: (data) => (<p >{data?.trangThai}</p>),
                        // },


                    ]}
                    scroll={{ x: '100%', y: 415 }}
                    locale={{ emptyText: 'Không có dữ liệu' }}
                    style={{ minHeight: 415 }}
                    dataSource={listKeHoach}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                navigate(`/quan-tri/chi-tiet-ke-hoach?id=${record?._id}`)
                            },
                        };
                    }}

                />

                <div className='div-flex justify-between'>
                    <div >
                        {/* <p className='red'><i><b >Lưu ý:</b> Mỗi đơn vị phụ trách sẽ có mã khác nhau</i></p> */}
                        </div>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}

                        total={listKeHoach?.length || 1}
                        defaultPageSize={30}
                    />
                </div>
            </div >
        </>
    );
};

export default KeHoachPage;
