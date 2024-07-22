
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import NguoiDungModal from './NguoiDungModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { debounce, size } from "lodash";
import HomeIcon from '@mui/icons-material/Home';
import dayjs from 'dayjs';
const { Search } = Input;
const items = [
    {
        key: '1',
        label: "Cập nhật",
    },

    {
        key: '2',
        label: 'Reset mật khẩu',
    },
    {
        key: '3',
        label: 'Khóa tài khoản',
    },
    {
        key: '4',
        danger: true,
        label: 'Xóa',
    },
];
const NguoiDungPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listNguoiDung, setListNguoiDung] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [listNguoiDungMD, setListNguoiDungMD] = useState([]);
    const [nguoiDungUp, setNguoiDungUp] = useState();
    const [openNguoiDungModal, setOpenNguoiDungModal] = useState(false);

    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        reLoadList()
    }, [limit, page]);
    async function reLoadList(params) {
        setLoading(true)
        let dataRSLisstDv = await Services.getNguoiDungService().getNguoiKhaoSat("", "", page - 1, limit)
        if (dataRSLisstDv?.data) {
            setListNguoiDung(dataRSLisstDv?.data?.content)
            setTotalPage(dataRSLisstDv?.data?.totalElements)
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
                setOpenNguoiDungModal(true)
                setNguoiDungUp(data)
                break;
            case "2"://reset 
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa tài khoản này',
                    content: "",
                });
                if (confirmed) {
                    setLoading(true);
                    Services.getNguoiDungService().resetNgKhaoSat(data)?.then(
                        (res) => {
                            setLoading(false);
                            if (res?.data?.error) {
                                alert(res?.data?.message)
                            } else {

                                reLoadList()
                            }
                        });
                }

                break;
            case "3"://khóa
                const confirmed2 = await modal.confirm({
                    title: 'Bạn có chắc thay đổi trạng thái tài khoản này',
                    content: "",
                });
                if (confirmed2) {
                    setLoading(true);
                    Services.getNguoiDungService().disableNgKhaoSat(data)?.then(
                        (res) => {
                            setLoading(false);
                            if (res?.data?.error) {
                                alert(res?.data?.message)
                            } else {
                                message.success("Lưu thành công")
                                reLoadList()
                            }
                        });
                }

                break;
            case "4"://xóa
                const confirmed4 = await modal.confirm({
                    title: 'Bạn có chắc xóa tài khoản này',
                    content: "",
                });
                if (confirmed4) {
                    setLoading(true);
                    setLoading(false);
                    Services.getNguoiDungService().deleteByID(data?._id)?.then(
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
            setLoading(false)
            console.log(e);

            if (page != 1) {
                setSearchValue(e?.target?.value)
                setPage(1)
            } else {
                let dataRSLisstDv = await Services.getNguoiDungService().getNguoiKhaoSat(e?.target?.value, "", 0, limit)
                if (dataRSLisstDv?.data?.length == 0) {
                    message.error("Không tìm thấy đơn vị")
                } else {
                    setListNguoiDung(dataRSLisstDv?.data?.content)
                    setTotalPage(dataRSLisstDv?.data?.totalElements)
                }
            }


        }, 500),
        [],
    );
    return (
        <>
            <div className='pb-2'>
                <Breadcrumb
                    items={[
                        {
                            title: <p className='bold f-16 c-575762'>Trang chủ </p>,
                        },
                        {
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Người dùng đã khảo sát</p>,
                            href: "/"
                        }

                    ]}
                /></div>

            <div className="page-new">
                <NguoiDungModal open={openNguoiDungModal} setOpen={setOpenNguoiDungModal} nguoiDungUp={nguoiDungUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenNguoiDungModal(true); setNguoiDungUp(); }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
                    </div>
                    <div>
                        <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} onChange={handleSearch} />
                    </div>
                </div>
                {contextHolder}
                <Table
                    rowKey="id"
                    loading={loading}
                    columns={[
                        {
                            title: "STT",
                            width: 40,
                            align: "center",
                            render: (data, record, index) => (<p>{(limit * (page - 1) + (index + 1))}</p>),
                        },
                        {
                            title: "Họ và tên",
                            render: (data) => (<p>{data?.hoTen}</p>),
                            width: 180,
                        },
                        {
                            title: "Số điện thoại/email",
                            render: (data) => (<p>{`${data?.soDienThoai}/${data?.email || "_"}`}</p>),
                            width: 280,
                        },
                        {
                            title: "Giới tính",
                            render: (data) => (<p>{data?.gioiTinh == 1 ? "Nam" : data?.gioiTinh == 0 ? "Nữ" : "-"}</p>),
                            width: 100,
                        },
                        {
                            title: "Ngày sinh",
                            render: (data) => (<p>{FormatDate.formatDateDDMMYYY(data?.ngaySinh)}</p>),
                            width: 120,
                        },
                        // {
                        //     title: "Đơn vị sử dụng",
                        //     render: (data) => (<p>{data?.donVi?.tenDonVi} </p>),
                        //     width: 200,
                        // },
                        // {
                        //     title: "Đơn vị quản lý",
                        //     render: (data) => (<p>{data?.listDonViQuanLy?.map(obj => obj.donVi?.tenDonVi)?.join(', ')} </p>),
                        //     width: 250,
                        // },
                        // {
                        //     title: "Loại dăng nhập",
                        //     render: (data) => (<p>{data?.taiKhoan?.provider} </p>),
                        //     width: 90,
                        // },

                        {
                            title: "Role",
                            render: (data) => (<p>{data?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => obj?.vaiTro?.tenVaiTro)?.join(', ')} </p>),
                            width: 180,
                        },
                        {
                            title: "Ngày cập nhật",
                            render: (data) => (<p>{dayjs(data?.taiKhoan?.lanChinhSuaGanNhat)?.format('DD/MM/YYYY HH:mm')} </p>),
                            width: 150,
                        },
                        {
                            title: "Trang thái",
                            render: (data) => (data?.taiKhoan?.trangThai != 1 ? <span className='box-red'>Khóa</span> : <span className='box-green'>Mở</span>),
                            width: 90,
                        },
                        {
                            title: " ",
                            render: (data) => (
                                <div >
                                    <Dropdown
                                        menu={{
                                            items,
                                            onClick: (e) => onClick(e, data)
                                        }}
                                    // onClick={(e) => }
                                    >
                                        <div className='yqwerqwe'>
                                            <Space>
                                                <MoreHorizIcon className='ms-2 f-13' />
                                            </Space>
                                        </div>
                                    </Dropdown>
                                </div>
                            ),
                            fixed: windowScreen ? 'right' : false,
                            width: "50px"
                        }

                    ]}
                    scroll={{ x: '100%', y: 415 }}
                    locale={{ emptyText: 'Không có dữ liệu' }}
                    style={{ minHeight: 415 }}
                    dataSource={listNguoiDung}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'

                />

                <div className='div-flex justify-between'>
                    <div></div>
                    <Pagination
                        showSizeChanger
                        onChange={onShowSizeChange}

                        total={totalPage}
                        defaultPageSize={limit}
                    />
                </div>
            </div >
        </>
    );
};

export default NguoiDungPage;
