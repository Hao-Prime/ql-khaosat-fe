
import { Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import NguoiDungModal from './NguoiDungModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce, size } from "lodash";
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
        let dataRSLisstDv = await Services.getNguoiDungService().getAll("", page - 1, limit)
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
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa tài khoản này',
                    content: "",
                });
                console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
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
                let dataRSLisstDv = await Services.getNguoiDungService().getAll(e?.target?.value, 1, limit)
                if (dataRSLisstDv?.data?.length == 0) {
                    message.error("Không tìm thấy đơn vị")
                } else {
                    setListNguoiDung(dataRSLisstDv?.data)
                }
            }


        }, 500),
        [],
    );
    return (
        <div className="page-new">
            <NguoiDungModal open={openNguoiDungModal} setOpen={setOpenNguoiDungModal} nguoiDungUp={nguoiDungUp} reLoadList={reLoadList} />
            <div className='flex  ieoqwpesad'>
                <div>
                    <Button onClick={() => setOpenNguoiDungModal(true)} type="primary" className='btn-add btn-gra-blue bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                        title: "Ngày cập nhật",
                        render: (data) => (<p>{dayjs(data?.taiKhoan?.lanChinhSuaGanNhat)?.format('DD/MM/YYYY HH:mm')} </p>),
                        width: 180,
                    },
                    {
                        title: "Đơn vị sử dụng",
                        render: (data) => (<p>{data?.donVi?.tenDonVi} </p>),
                        width: 250,
                    },
                    {
                        title: "Đơn vị quản lý",
                        render: (data) => (<p>{data?.listDonViQuanLy?.map(obj => obj.donVi?.tenDonVi)?.join(', ')} </p>),
                        width: 250,
                    },
                    {
                        title: "Loại dăng nhập",
                        render: (data) => (<p>{data?.taiKhoan?.provider} </p>),
                        width: 90,
                    },
                    {
                        title: "Trang thái",
                        render: (data) => (data?.taiKhoan?.trangThai != 1 ? <span className='box-red'>Khóa</span> : <span className='box-green'>Mở</span>),
                        width: 180,
                    },
                    {
                        title: "Role",
                        render: (data) => (<p>{data?.taiKhoan?.vaiTroTaiKhoanList?.map(obj => obj?.vaiTro?.tenVaiTro)?.join(', ')} </p>),
                        width: 180,
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
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <MoreVertIcon className='f-13' />
                                        </Space>
                                    </a>
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

    );
};

export default NguoiDungPage;
