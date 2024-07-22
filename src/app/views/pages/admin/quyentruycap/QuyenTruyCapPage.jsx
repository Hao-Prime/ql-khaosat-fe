
import { Breadcrumb, Button, Checkbox, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
// import VaiTroModal from './VaiTroModal';
import Services from 'app/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from "lodash";
import SapXep from 'app/common/SapXep';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';
import QuyenTruyCapModal from './QuyenTruyCapModal';
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
const QuyenTruyCapPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [listVaiTro, setListVaiTro] = useState([]);
    const [listVaiTroSave, setListVaiTroSave] = useState([]);
    const [columns, setColumns] = useState([]);
    const [vaiTroUp, setVaiTroUp] = useState();
    const [openVaiTroModal, setOpenVaiTroModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reLoadList()
    }, []);

    async function reLoadList(params) {
        setLoading(true)

        let listVaiTro = SapXep.sapXepTheoObjectAtr((await Services.getVaiTroService().getAll())?.data, "stt", 1)

        setListVaiTroSave(listVaiTro)

        let listDataRoles = [
            { key: "Dashboard", value: "dashboard" },
            { key: "Quản lý biểu mẫu", value: "bieumau" },
            {
                key: "Quản lý khảo sát", value: "khaosat",
                children: [
                    { key: "Tiếp nhận khảo sát", value: "khaosat.tiepnhan" },
                    { key: "Hoàn thành khảo sát", value: "khaosat.hoanthanh" },
                ]
            },
            { key: "Xem thống kê", value: "thongke.donvi" },
            {
                key: "Quản lý đơn vị", value: "donvi",
                children: [
                    { key: "Toàn đơn vị", value: "donvi.toanbo" },
                    { key: "Chỉ đơn vị dưới cấp", value: "donvi.capduoi" },
                ]
            },
            {
                key: "Quản lý cán bộ", value: "canbo",
                children: [
                    { key: "Toàn đơn vị", value: "canbo.toanbo" },
                    { key: "Chỉ đơn vị dưới cấp", value: "canbo.capduoi" },
                ]
            },
            { key: "Quản lý tệp người khảo sát", value: "nguoikhaosat" },
            { key: "Quản lý logs", value: "logs" },
            { key: "Quản lý cấu hình", value: "cauhinh" },
            { key: "Quản lý quyền", value: "roles" },
        ]
        let rs = listDataRoles
        let rsColumn = [{
            title: "",
            width: 300,
            render: (data, record) => (
                <p className='bold'>- {data?.key}</p>
            )
        }]
        listVaiTro?.forEach(vaiTro => {
            rs = formatData(rs, vaiTro)
            if (vaiTro?.phanLoai != -1) {
                rsColumn.push(
                    {
                        title: vaiTro?.moTa,
                        align: "center",
                        render: (data, record) => (
                            <Checkbox defaultChecked={data[vaiTro?._id]} onChange={(e) => checkRoles(e.target.checked, vaiTro?._id, data?.value)}></Checkbox>
                        ),
                        onHeaderCell: (record) => {
                            return {
                                onClick: () => { setVaiTroUp(vaiTro); setOpenVaiTroModal(true); },
                            };
                        }
                    }
                )
            }

        });

        setColumns(rsColumn)
        setListVaiTro(rs)
        setLoading(false)
    }
    function formatData(list, vaiTro) {
        let rs = []
        if (list) {
            list?.forEach(roles => {
                let dataRow = { ...roles, [vaiTro?._id]: vaiTro?.listRoles?.includes(roles?.value), children: formatData(roles?.children, vaiTro) }
                rs.push(dataRow)
            });
            return rs
        } else return null

    }
    function checkRoles(checked, vaiTroId, keyRoles) {
        setListVaiTroSave(prevListVaiTroSave => {
            return prevListVaiTroSave.map(vaiTro => {
                if (vaiTro?._id === vaiTroId) {
                    const listRoles = new Set(vaiTro.listRoles);
                    if (checked) {
                        listRoles.add(keyRoles);
                    } else {
                        listRoles.delete(keyRoles);
                    }
                    return { ...vaiTro, listRoles: Array.from(listRoles) };
                }
                return vaiTro;
            });
        });
    }
    function handleSave() {
        setSending(true)
        Services?.getVaiTroService().update(listVaiTroSave)?.then(
            (res) => {
                if (res?.data?.error) {
                    message?.danger(res?.data?.mesage)
                } else {
                    message.success("Lưu thành công")
                    reLoadList()
                }
                setSending(false)
            }
        )
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
                            title: <p className='bold f-16 c-blue2'><HomeIcon className='mb-1' /> Quyền truy cập</p>,
                            href: "/"
                        }

                    ]}
                /></div>

            <div className="page-new">
                <QuyenTruyCapModal open={openVaiTroModal} setOpen={setOpenVaiTroModal} vaiTroUp={vaiTroUp} setVaiTroUp={setVaiTroUp} reLoadList={reLoadList} />
                <div className='flex  ieoqwpesad'>
                    <div>
                        <Button onClick={() => { setVaiTroUp(); setOpenVaiTroModal(true) }} type="primary" className='btn-add  bold'><AddIcon className='icon-btn' />Thêm mới vai trò</Button>
                    </div>
                    <div>
                        {/* <Search placeholder="Tìm kiếm" style={{ width: 200, marginRight: "5px" }} onChange={handleSearch} /> */}
                    </div>
                </div>
                {contextHolder}
                <Table
                    rowKey="_id"
                    loading={loading}
                    columns={columns}
                    scroll={{ x: '100%', y: 415 }}
                    locale={{ emptyText: 'Không có dữ liệu' }}
                    style={{ minHeight: 415 }}
                    dataSource={listVaiTro}
                    pagination={false}
                    size='small'
                    className='pointer mt-1 table-cus-antd'

                />
                <div className='flex justify-center w-100pt mt-3' >
                    <Button className='btn-success' type="primary" size="middle" onClick={() => { handleSave() }} disabled={sending}>
                        <span style={{ display: sending ? 'inherit' : 'none' }}>
                            <CircularProgress className="span-sender" />
                        </span>
                        Lưu cấu hình
                    </Button>

                </div>

            </div >
        </>
    );
};

export default QuyenTruyCapPage;
