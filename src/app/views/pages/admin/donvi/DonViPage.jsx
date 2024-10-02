
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import DonViModal from './DonViModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from "lodash";
import SapXep from 'app/common/SapXep';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
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
const DonViPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listDonVi, setListDonVi] = useState([]);
    const [listDonViMD, setListDonViMD] = useState([]);
    const [donViUp, setDonViUp] = useState();
    const [openDonViModal, setOpenDonViModal] = useState(false);

    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reLoadList()
    }, []);
    useEffect(() => {
        if (listDonViMD?.length > 0) {
            let data = listDonViMD.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });
            setListDonVi(data);
        }

    }, [limit, page, listDonViMD]);
    async function reLoadList(params) {
        setLoading(true)

        let dataRSLisstDv = await Services.getDonViService().getAll("")
        if (dataRSLisstDv.data) {
            setListDonViMD(formatData(dataRSLisstDv?.data))
            if(dataRSLisstDv?.data?.length==0){
                setListDonVi([])
            }
            setPage(1)
        }
        setLoading(false)
    }
    function formatData(list) {
        let rs = []
        list?.forEach(element => {

            if (element?.children?.length == 0) {
                rs.push({ ...element, children: null })
            } else {
                rs.push({ ...element, children: formatData(element?.children) })
            }
        });
        return rs
    }
    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        setLimit(pageSize)
    };
    const onClick = async (key, data) => {
        console.log(key?.key);
        switch (key?.key) {
            case "1":
                setOpenDonViModal(true)
                setDonViUp({ ...data, donViTrucThuoc: data?.donViTrucThuoc ? { _id: data?.donViTrucThuoc } : null })
                break;
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa đơn vị này',
                    content: "",
                });
                console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
                    Services.getDonViService().deleteByID(data?._id)?.then(
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
            let dataRSLisstDv = await Services.getDonViService().getAll(e?.target?.value)

            if (dataRSLisstDv?.data?.length == 0) {
                message.error("Không tìm thấy đơn vị")
            } else {
                setListDonViMD(sapXepDeQuy(dataRSLisstDv?.data, "stt", 1))
                setPage(1)
            }

        }, 500),
        [],
    );
    function sapXepDeQuy(list, arr, loai) {
        if (!list) return [];
        let rs =[]
        list.forEach(e => {
            if (e?.children?.length > 0) {
                // Đệ quy gọi hàm sapXepDeQuy để xử lý danh sách children trước
                e.children = sapXepDeQuy(e.children, arr, loai);
            }
            rs.push(e)
        });
    
        // Sau khi xử lý hết các children, sắp xếp list hiện tại
        return SapXep.sapXepTheoObjectAtr(rs, arr, loai);
    }
    return (
        <>
            <div className='pb-2'>
                <Breadcrumb
                    items={[
                        {
                            title: <p className='bold f-16 c-575762'>Trang chủ </p>,
                        },
                        {
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Đơn vị quản lý</p>,
                            href: "/"
                        }

                    ]}
                /></div>

            <div className="page-new">
                <DonViModal open={openDonViModal} setOpen={setOpenDonViModal} donViUp={donViUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenDonViModal(true); setDonViUp() }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                            title: "Tên đơn vị",
                            dataIndex: "tenDonVi",
                            key: "tenDonVi",
                            width: 200,
                        },
                        {
                            title: "Mô tả",
                            dataIndex: "moTa",
                            key: "moTa",
                            width: 400,
                        },
                        {
                            title: "Thứ tự",
                            dataIndex: "stt",
                            key: "stt",
                            width: 30,
                        },
                        {
                            title: " ",
                            render: (data, record) => (
                                <div className='flex'>
                                    {/* <Dropdown
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
                                    </Dropdown> */}
                                    <Button onClick={() => { onClick({ key: "1" }, record) }} className='p-1'><EditIcon className='icon-btn blue f-16' /></Button>
                                    <Button onClick={() => { onClick({ key: "2" }, data) }} className='ms-1 p-1'><DeleteIcon className='icon-btn red f-16' /></Button>

                                </div>
                            ),
                            fixed: windowScreen ? 'right' : false,
                            width: "50px"
                        }

                    ]}
                    scroll={{ x: '100%', y: 415 }}
                    locale={{ emptyText: 'Không có dữ liệu' }}
                    style={{ minHeight: 415 }}
                    dataSource={listDonVi}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'
                    defaultExpandedRowKeys={["662a0be5303c0967895df41b"]}
                />

                <div className='div-flex justify-between'>
                    <div></div>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}

                        total={listDonVi?.length || 0}
                        defaultPageSize={30}
                    />
                </div>
            </div >
        </>
    );
};

export default DonViPage;
