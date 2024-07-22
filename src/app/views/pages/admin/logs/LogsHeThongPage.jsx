
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'

import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from "lodash";
import SapXep from 'app/common/SapXep';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
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
const LogsHeThongPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listLogs, setListLogs] = useState([]);
    const [donViUp, setCauHinhUp] = useState();


    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        reLoadList()
    }, [limit, page]);
    async function reLoadList(params) {
        setLoading(true)
        let dataRSLisstDv = await Services.getCauHinhService().getLogs("", page - 1, limit)
        if (dataRSLisstDv?.data) {
            setListLogs(dataRSLisstDv?.data?.content)
            setTotalPage(dataRSLisstDv?.data?.totalElements)
        }
        setLoading(false)
    }

    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        setLimit(pageSize)
        console.log(current);
        console.log(pageSize);
    };

    const handleSearch = useCallback(
        debounce(async (e) => {
            setLoading(false)
            if (page != 1) {

                setPage(1)
            } else {
                let dataRSLisstDv = await Services.getCauHinhService().getLogs(e?.target?.value, 0, limit)
                if (dataRSLisstDv?.data?.length == 0) {
                    message.error("Không tìm thấy đơn vị")
                } else {
                    setListLogs(dataRSLisstDv?.data?.content)
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
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Logs hệ thống</p>,
                            href: "/"
                        }

                    ]}
                /></div>

            <div className="page-new">
                <div className='flex  ieoqwpesad'>
                    <div>
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
                            title: "Ngày thao tác",
                            render: (data) => (<p>{dayjs(data?.createDate)?.format('DD/MM/YYYY HH:mm')}</p>),
                            width: 120,
                            align: "center",

                        },
                        {
                            title: "IP",
                            dataIndex: "ip",
                            key: "ip",
                            width: 100,

                        },
                        {
                            title: "Người thao tác",
                            dataIndex: "user",
                            key: "user",
                            width: 200,
                        },
                        {
                            title: "Thao tác",
                            dataIndex: "api",
                            key: "api",
                            width: 390,
                        },

                    ]}
                    scroll={{ x: '100%', y: 415 }}
                    locale={{ emptyText: 'Không có dữ liệu' }}
                    style={{ minHeight: 415 }}
                    dataSource={listLogs}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'

                />

                <div className='div-flex justify-between'>
                    <div></div>
                    <Pagination
                        showSizeChanger
                        onChange={onShowSizeChange}

                        total={totalPage || 0}
                        defaultPageSize={limit}
                    />
                </div>
            </div >
        </>
    );
};

export default LogsHeThongPage;
