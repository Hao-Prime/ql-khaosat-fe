
import { Breadcrumb, Button, DatePicker, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
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
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

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
const ThongKeTheoDonViPage = () => {
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
            dataRSLisstDv?.data?.forEach(element => {

            });
            setListDonViMD(formatData(dataRSLisstDv?.data))
            setPage(1)
        }
        setLoading(false)
    }
    function formatData(list) {
        let rs = []
        list?.forEach(element => {
            let dataTesst = { v1: 0, v12: 0, v13: 0, v14: 0, v15: 0, v16: 0, v17: 0 }
            if (["662a0be5303c0967895df41b"].includes(element?._id)) {
                dataTesst = { v1: 3, v12: 0, v13: 2, v14: 1, v15: 422, v16: 12, v17: 12 }
            } else if (["6641d1652e02ca6d70259da9"].includes(element?._id)) {
                dataTesst = { v1: 3, v12: 0, v13: 2, v14: 1, v15: 214, v16: 11, v17: 11 }
            } else if (["66441a5b12a4bc65fd562457"].includes(element?._id)) {
                dataTesst = { v1: 3, v12: 0, v13: 2, v14: 1, v15: 82, v16: 8, v17: 8 }
            }
            if (element?.children?.length == 0) {

                rs.push({ ...element, children: null, ...dataTesst })
            } else {
                rs.push({ ...element, ...dataTesst, children: formatData(element?.children) })
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
                setListDonViMD(SapXep.sapXepTheoObjectAtrVaAtr(dataRSLisstDv?.data, "donViTrucThuoc", "stt", -1, 1))
                setPage(1)
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
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Đơn vị quản lý</p>,
                            href: "/"
                        }

                    ]}
                /></div>

            <div className="page-new">
                <DonViModal open={openDonViModal} setOpen={setOpenDonViModal} donViUp={donViUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        {/* <Button onClick={() => { setOpenDonViModal(true); setDonViUp() }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button> */}
                    </div>
                    <div className='div-flex warp'>
                        <RangePicker format="DD/MM/YYYY" defaultValue={[dayjs().startOf('year'), dayjs().endOf('year')]} className="me-1" />
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
                            title: "Tổng phụ trách",
                            dataIndex: "v1",
                            key: "v1",
                            align: "center",
                        },
                        {
                            title: "Chưa tiếp nhận",
                            dataIndex: "v12",
                            key: "v12",
                            align: "center",
                        },
                        {
                            title: "Đang thực hiện",
                            dataIndex: "v13",
                            key: "v13",
                            align: "center",
                        },
                        {
                            title: "Đã hoàn thành",
                            dataIndex: "v14",
                            key: "v14",
                            align: "center",
                        },

                        {
                            title: "Số Chỉ tiêu",
                            dataIndex: "v15",
                            key: "v15",
                            align: "center",
                        },
                        {
                            title: "Số khảo đã báo cáo",
                            dataIndex: "v16",
                            key: "v16",
                            align: "center",
                        },
                        {
                            title: "Số người dùng mới",
                            dataIndex: "v17",
                            key: "v17",
                            align: "center",/*  */
                        },

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

                {/* <div className='div-flex justify-between'>
                    <div></div>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}

                        total={listDonVi?.length || 0}
                        defaultPageSize={30}
                    />
                </div> */}
            </div >
        </>
    );
};

export default ThongKeTheoDonViPage;
