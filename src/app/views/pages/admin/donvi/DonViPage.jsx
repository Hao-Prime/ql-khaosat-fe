
import { Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import DonViModal from './DonViModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from "lodash";
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
            setListDonViMD(dataRSLisstDv?.data)
            setPage(1)
        }
        setLoading(false)
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
                setDonViUp(data)
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
                setListDonViMD(dataRSLisstDv?.data)
                setPage(1)
            }

        }, 500),
        [],
    );
    return (
        <div className="page-new">
            <DonViModal open={openDonViModal} setOpen={setOpenDonViModal} donViUp={donViUp} reLoadList={reLoadList} />
            <div className='flex  ieoqwpesad'>
                <div>
                    <Button onClick={() => setOpenDonViModal(true)} type="primary" className='btn-add btn-gra-blue bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                        title: "Đơn vị trực thuộc",
                        render: (data) => (<p>{data?.donViTrucThuoc?.tenDonVi}</p>),
                        width: 180,
                    },
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
                        width: 250,
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
                dataSource={listDonVi}
                pagination={false}
                size='small'
                className='pointer mt-1 table-cus-antd'

            />

            <div className='div-flex justify-between'>
                <div></div>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}

                    total={listDonVi?.length}
                    defaultPageSize={30}
                />
            </div>
        </div >

    );
};

export default DonViPage;
