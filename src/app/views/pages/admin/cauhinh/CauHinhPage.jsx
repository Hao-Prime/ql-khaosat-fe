
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import CauHinhModal from './CauHinhModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from "lodash";
import SapXep from 'app/common/SapXep';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
const CauHinhPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listCauHinh, setListCauHinh] = useState([]);
    const [listCauHinhMD, setListCauHinhMD] = useState([]);
    const [cauHinhUp, setCauHinhUp] = useState();
    const [openCauHinhModal, setOpenCauHinhModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reLoadList()
    }, []);
    useEffect(() => {
        if (listCauHinhMD?.length > 0) {
            let data = listCauHinhMD.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });
            setListCauHinh(data);
        }
    }, [limit, page, listCauHinhMD]);
    async function reLoadList(params) {
        setLoading(true)

        let dataRSLisstDv = (await Services.getCauHinhService().getAll("", "", ""))?.data
        setListCauHinhMD(SapXep.sapXepTheoObjectAtr(dataRSLisstDv, "_id", -1))
        if(dataRSLisstDv?.length==0){
            setListCauHinh([])
        }
        setLoading(false)
    }

    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        setLimit(pageSize)
    };
    const onClick = async (key, data) => {
        console.log(data);
        switch (key?.key) {
            case "1":

                setCauHinhUp(data)
                setOpenCauHinhModal(true)
                break;
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa cấu hình này',
                    content: "",
                });
                console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
                    Services.getCauHinhService().deleteByID(data?._id)?.then(
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
            let dataRSLisstDv = await Services.getCauHinhService().getAll("", "", e?.target?.value)

            if (dataRSLisstDv?.data?.length == 0) {
                message.error("Không tìm thấy đơn vị")
            } else {
                setListCauHinhMD(SapXep.sapXepTheoObjectAtr(dataRSLisstDv?.data, "_id", -1))
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
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Cấu hình giá trị</p>,
                            href: "/"
                        }

                    ]}
                /></div>

            <div className="page-new">
                <CauHinhModal open={openCauHinhModal} setOpen={setOpenCauHinhModal} cauHinhUp={cauHinhUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenCauHinhModal(true); setCauHinhUp() }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                            title: "Mã key",
                            dataIndex: "key",
                            key: "key",
                            width: 180,

                        },
                        {
                            title: "Giá trị",
                            dataIndex: "value",
                            key: "value",
                            width: 500,
                        },
                        {
                            title: " ",
                            render: (data, record) => (
                                <div className='flex'>
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
                    dataSource={listCauHinh}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'

                />

                <div className='div-flex justify-between'>
                    <div></div>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}

                        total={listCauHinh?.length || 0}
                        defaultPageSize={30}
                    />
                </div>
            </div >
        </>
    );
};

export default CauHinhPage;
