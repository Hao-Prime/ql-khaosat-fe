
import { Breadcrumb, Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import NoiDungKhaoSatModal from './NoiDungKhaoSatModal';
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
const NoiDungKhaoSatPage = ({keHoach,showBreadcrumb}) => {
    const [modal, contextHolder] = Modal.useModal();
    const [listNoiDungKhaoSat, setListNoiDungKhaoSat] = useState([]);
    const [listNoiDungKhaoSatMD, setListNoiDungKhaoSatMD] = useState([]);
    const [noiDungKhaoSatUp, setNoiDungKhaoSatUp] = useState();
    const [openNoiDungKhaoSatModal, setOpenNoiDungKhaoSatModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        reLoadList()
    }, []);
    useEffect(() => {
        if (listNoiDungKhaoSatMD?.length > 0) {
            let data = listNoiDungKhaoSatMD.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });
            setListNoiDungKhaoSat(data);
        }
    }, [limit, page, listNoiDungKhaoSatMD]);
    async function reLoadList(params) {
        setLoading(true)

        let dataRSLisstDv = (await Services.getNoiDungKhaoSatService().getAll("",keHoach?._id))?.data
        setListNoiDungKhaoSatMD(SapXep.sapXepTheoObject2Atr(SapXep.sapXepTheoObjectAtr(dataRSLisstDv, "stt", 1),"nhomDoiTuong", "stt", 1))
        if(dataRSLisstDv?.length==0){
            setListNoiDungKhaoSat([])
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

                setNoiDungKhaoSatUp(data)
                setOpenNoiDungKhaoSatModal(true)
                break;
            case "2":
                const confirmed = await modal.confirm({
                    title: 'Bạn có chắc muốn xóa đối tượng này',
                    content: "",
                });
                console.log(confirmed);
                if (confirmed) {
                    setLoading(true);
                    Services.getNoiDungKhaoSatService().deleteByID(data?._id)?.then(
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
            let key = e?.target?.value
            setLoading(true)
            let dataRSLisstDv = []
            if (key) {
                listNoiDungKhaoSatMD.forEach((phuTrach) => {
                    if (phuTrach?.ten?.toUpperCase().includes(key.toUpperCase()) ||
                        phuTrach?.nhomDoiTuong?.ten?.toUpperCase().includes(key.toUpperCase()) ||
                        phuTrach?.moTa?.toUpperCase().includes(key.toUpperCase())) {
                        dataRSLisstDv.push(phuTrach)
                    }
                })
                if (dataRSLisstDv?.length == 0) {
                    message.error("Không tìm thấy")
                } else {
                    setListNoiDungKhaoSatMD(dataRSLisstDv)
                }
                setLoading(false)
            } else {
                reLoadList()
            }
        }, 500),
        [],
    );

    return (
        <>
            <div className='pb-2'>
            {showBreadcrumb == false ? <></> :<Breadcrumb
                    items={[
                        {
                            title: <p className='bold f-16 c-575762'>Trang chủ </p>,
                        },
                        {
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' />Đối tượng khảo sát</p>,
                            href: "/"
                        }

                    ]}
                />}
                </div>

            <div className="page-new">
                <NoiDungKhaoSatModal keHoach={keHoach} open={openNoiDungKhaoSatModal} setOpen={setOpenNoiDungKhaoSatModal} noiDungKhaoSatUp={noiDungKhaoSatUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setOpenNoiDungKhaoSatModal(true); setNoiDungKhaoSatUp({trangThai:1}) }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới</Button>
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
                        // {
                        //     title: "Tên nhóm",
                        //     render: (data, record, index) => (<p>{data?.nhomDoiTuong?.ten}</p>),
                        //     width: 90,

                        // },
                        {
                            title: "Nội dung",
                            dataIndex: "ten",
                            key: "ten",
                            width: 400,
                            className: 'header-align-center'
                        },
                        // {
                        //     title: "Giá trị",
                        //     dataIndex: "gaiTri",
                        //     key: "giaTrij",
                        //     render: (value) => {
                        //         try {
                        //           // Kiểm tra nếu 'value' là đối tượng, chuyển thành JSON định dạng đẹp
                        //           const formattedJson = JSON.stringify(value, null, 2);
                        //           return (
                        //             <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>
                        //               {formattedJson}
                        //             </pre>
                        //           );
                        //         } catch {
                        //           // Nếu không phải đối tượng, trả về giá trị thô
                        //           return <pre>{value}</pre>;
                        //         }
                        //       },
                        //     width: 500,
                        // },
                        
                        {
                            title: "Thứ tự",
                            dataIndex: "stt",
                            align: "center",
                            key: "stt",
                            width: 50,
                        },
                        {
                            title: "TT",
                            align: "center",
                            render: (data) => (data?.trangThai != 1 ? <span className='box-red'>Khóa</span> : <span className='box-green'>Mở</span>),
                            width: 50,
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
                    dataSource={listNoiDungKhaoSat}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'

                />

                <div className='div-flex justify-between'>
                    <div></div>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}

                        total={listNoiDungKhaoSat?.length || 0}
                        defaultPageSize={30}
                    />
                </div>
            </div >
        </>
    );
};

export default NoiDungKhaoSatPage;
