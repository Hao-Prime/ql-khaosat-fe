
import { Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
// import NguoiDungModal from './NguoiDungModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce, size } from "lodash";
import dayjs from 'dayjs';
const { Search } = Input;
const items = [
    // {
    //     key: '1',
    //     label: "Cập nhật",
    // },


    // {
    //     key: '3',
    //     label: 'Reset mật khẩu',
    // },
    // {
    //     key: '2',
    //     label: 'Khóa tài khoản',
    // },
    // {
    //     key: '4',
    //     danger: true,
    //     label: 'Xóa',
    // },
];
const HoDanPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listNguoiDung, setListNguoiDung] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [listNguoiDungMD, setListNguoiDungMD] = useState([]);
    const [nguoiDungUp, setNguoiDungUp] = useState();
    // const [openNguoiDungModal, setOpenNguoiDungModal] = useState(false);

    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        reLoadList()
    }, [limit, page, searchValue]);
    async function reLoadList(params) {
        setLoading(true)
        let dataRSLisstDv = await Services.getFormService().getListNguoiDungTheoDonVICuaToi(searchValue, page - 1, limit)
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
                // setOpenNguoiDungModal(true)
                setNguoiDungUp(data)
                break;


        }
    };
    const handleSearch = useCallback(
        debounce(async (e) => {
            setLoading(false)

            if (page == 1) {
                setSearchValue(e?.target?.value)
                setPage(1)
            } else {
                let dataRSLisstDv = await Services.getFormService().getListNguoiDungTheoDonVICuaToi(e?.target?.value, 0, limit)
                if (dataRSLisstDv?.data?.length == 0) {
                    message.error("Không tìm thấy")
                } else {
                    setListNguoiDung(dataRSLisstDv?.data?.content)
                    setTotalPage(dataRSLisstDv?.data?.totalElements)
                }
                setLoading(false)
            }


        }, 500),
        [],
    );
    return (
        <div className="page-new">
            {/* <NguoiDungModal open={openNguoiDungModal} setOpen={setOpenNguoiDungModal} nguoiDungUp={nguoiDungUp} reLoadList={reLoadList} /> */}
            <div className='flex  ieoqwpesad'>
                <div>
                    {/* <Button onClick={() => setOpenNguoiDungModal(true)} type="primary" className='btn-add btn-gra-blue bold'><AddIcon className='icon-btn' />Thêm mới</Button> */}
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
                        title: "Số điện thoại",
                        render: (data) => (<p>{`${data?.soDienThoai}`}</p>),
                        width: 280,
                    },
                    {
                        title: "Email",
                        render: (data) => (<p>{`${data?.email}`}</p>),
                        width: 230,
                    },
                    {
                        title: "Đơn vị quản lý",
                        render: (data) => (<p>{data?.listDonViQuanLy?.map(obj => obj.donVi?.tenDonVi)?.join(', ')} </p>),
                        width: 230,
                    },
                    // {
                    //     title: "Ngày tham gia",
                    //     render: (data) => (<p>{dayjs(data?.taiKhoan?.lanChinhSuaGanNhat)?.format('DD/MM/YYYY HH:mm')} </p>),
                    //     width: 180,
                    // },

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

export default HoDanPage;
