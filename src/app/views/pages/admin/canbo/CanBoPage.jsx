
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import CanBoModal from './CanBoModal';
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
        key: '3',
        label: 'Reset mật khẩu',
    },
    {
        key: '2',
        label: 'Khóa tài khoản',
    },
    {
        key: '4',
        danger: true,
        label: 'Xóa',
    },
];
const CanBoPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listCanBo, setListCanBo] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [listCanBoMD, setListCanBoMD] = useState([]);
    const [canBoUp, setCanBoUp] = useState();
    const [openCanBoModal, setOpenCanBoModal] = useState(false);

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
        let dataRSLisstDv = await Services.getNguoiDungService().getCanBo("", "", page - 1, limit)
        if (dataRSLisstDv?.data) {
            setListCanBo(dataRSLisstDv?.data?.content)
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
                setOpenCanBoModal(true)
                setCanBoUp({ ...data, vaiTroTaiKhoanList: data?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => { return obj?.vaiTro?._id }) })
                console.log({ ...data, vaiTroTaiKhoanList: data?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => { return obj?.vaiTro?._id }) });
                break;
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa tài khoản này',
                    content: "",
                });
                console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
                    Services.getCanBoService().deleteByID(data?._id)?.then(
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
                let dataRSLisstDv = await Services.getCanBoService().getNguoiKhaoSat(e?.target?.value, "", 0, limit)
                if (dataRSLisstDv?.data?.length == 0) {
                    message.error("Không tìm thấy đơn vị")
                } else {
                    setListCanBo(dataRSLisstDv?.data?.content)
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
                <CanBoModal open={openCanBoModal} setOpen={setOpenCanBoModal} canBoUp={canBoUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenCanBoModal(true); setCanBoUp(); }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                            render: (data) => (<p>{`${data?.soDienThoai}/${data?.email}`}</p>),
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
                        {
                            title: "Đơn vị quản lý",
                            render: (data) => (<p>{data?.donVi?.tenDonVi + " - " + data?.donVi?.donViTrucThuoc?.tenDonVi} </p>),
                            width: 250,
                        },
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
                    dataSource={listCanBo}
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

export default CanBoPage;
