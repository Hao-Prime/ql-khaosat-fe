import { Autocomplete, CircularProgress, Grid, Tab, Tabs, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { debounce, forEach } from "lodash";
import { Divider, Input, QRCode, Table, Space, Switch, Button, Modal, message } from 'antd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import Services from 'app/services';
import { useSelector } from 'react-redux';
const ShareForm = ({ bieuMau }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="">
            {/* <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Link khảo sát" />
                <Tab label="Chia sẻ đơn vị" />
            </Tabs> */}
            <div className='mt-3'>

                {
                    value == 0 ? <LinkKhaoSat bieuMau={bieuMau} /> : <ShareQuyen bieuMau={bieuMau} />
                }

            </div>

        </div >

    );
};

export default ShareForm;
const LinkKhaoSat = ({ bieuMau }) => {
    const taiKhoan = useSelector(state => state.taiKhoan)
    return (
        <div className=''>
            <div>
                <p className='bold f-25'>Link chia sẻ mẫu khảo sát</p>
            </div>
            <Input value={process.env.REACT_APP_URL_CLIENT + "/khao-sat-bieu-mau?key=" + bieuMau?.maBieuMau + (bieuMau?.donVi?._id != taiKhoan?.donVi?._id ? "&iddv=" + taiKhoan?.donVi?._id : "")} />
            <div className='flex justify-evenly mt-3'>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/khao-sat-bieu-mau?key=" + bieuMau?.maBieuMau + (bieuMau?.donVi?._id != taiKhoan?.donVi?._id ? "&iddv=" + taiKhoan?.donVi?._id : "")}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>WEB</p>
                </div>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/khao-sat-bieu-mau?key=" + bieuMau?.maBieuMau + (bieuMau?.donVi?._id != taiKhoan?.donVi?._id ? "&iddv=" + taiKhoan?.donVi?._id : "")}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>ZALO APP</p>
                </div>
            </div>

        </div>
    )
}
const ShareQuyen = ({ bieuMau }) => {
    const [sending, setSending] = useState(false)

    const [selectedRowKeys, setSelectedRowKeys] = useState(bieuMau?.listIDDonViPhuTrach?.map(obj => obj));
    const rowSelection = {

        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
        },

    };
    const [listDonVi, setlistDonVi] = useState([]);
    const [checkStrictly, setCheckStrictly] = useState(false);
    const handleSearchChange = useCallback(
        debounce((keyword) => {

        }, 500),
        [],
    );
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        Services.getDonViService().getSelectToanBoDonViDuoi().then(
            (res) => {
                if (res.data) {
                    console.log(res.data?.map(setKeyForObject));
                    setlistDonVi(formatData(res.data?.map(setKeyForObject)))
                    setLoading(false)
                }
            }
        )
    }, []);
    const setKeyForObject = (obj, level = 0) => {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        const newObj = { ...obj, key: obj._id };

        // Thêm ký tự "-" vào tenDonVi dựa trên cấp độ hiện tại
        const prefix = '─'.repeat(level);
        newObj.tenDonVi = `${prefix} ${newObj.tenDonVi}`;

        if (Array.isArray(newObj.children)) {
            if (newObj.children.length === 0) {
                newObj.children = null;
            } else {
                newObj.children = newObj.children.map(child => setKeyForObject(child, level + 1));
            }
        }

        return newObj;
    };
    const handleSave = () => {
        setSending(true)
        Services.getFormService().capNhatQuyenBieuMau({ ...bieuMau, listIDDonViPhuTrach: selectedRowKeys, thanhPhan: "" }).then(
            (res) => {
                if (res.data) {
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        setSending(true)
                        message.success("Lưu thành công")
                    }
                }
            }
        )
    }
    const formatData = (list) => {
        let rs = []
        console.log(list);
        list?.forEach(element => {
            rs.push({
                ...element,
                ...getContChild(element?.children, element?.listKhaoSat?.filter(obj => obj != bieuMau?._id)?.length),
                children: formatData(element?.children)
            }

            )
        });

        return list == null ? null : rs
    }
    const getContChild = (children, slParent) => {
        let rs = 0
        children?.forEach(element => {

            if (element?.children) {
                rs = rs + getContChild(element?.children, element?.listKhaoSat?.filter(obj => obj != bieuMau?._id)?.length).soLuongTong
            } else {
                rs = rs + element?.listKhaoSat?.filter(obj => obj != bieuMau?._id)?.length
            }
        });
        return { soLuongTong: rs + slParent, soLuongRieng: slParent }
    }
    return (
        <div>
            <p className='bold f-25'>Phụ trách khảo sát <span className='red'> (LƯU Ý: MỖI ĐƠN VỊ SẼ CÓ MÃ QR KHÁC NHAU ĐỂ THỐNG KÊ SỐ LƯỢNG ĐƠN VỊ ĐI KHẢO SÁT)</span></p>

            <Grid container spacing={1} className='m-2'>
                <Table
                    key={"_id"}
                    columns={[
                        {
                            title: '',
                            dataIndex: 'x',
                            key: 'x',
                        },
                        // {
                        //     title: "STT",
                        //     width: 40,
                        //     align: "center",
                        //     render: (data, record, index) => (<p>{(index + 1)}</p>),
                        // },
                        {
                            title: 'Tên đơn vị',
                            dataIndex: 'tenDonVi',
                            key: 'tenDonVi',
                            width: 700,
                        },
                        {
                            title: 'Người phụ trách',
                            width: '30%',
                            render: (data) => (<p>{data?.listNguoiPhuTrach?.map(obj => obj.hoTen)?.join(', ')} </p>),
                            width: 400,
                        },
                        {
                            title: 'Tổng',
                            width: '30%',
                            key: 'soLuongTong',
                            dataIndex: 'soLuongTong',
                            width: 100,
                        },
                        {
                            title: 'Riêng đơn vị',
                            width: '30%',
                            key: 'soLuongRieng',
                            dataIndex: 'soLuongRieng',
                            width: 80,
                        },
                        // {
                        //     title: 'Số lượng đã khảo sát',
                        //     width: '30%',
                        //     render: (data) => (<p>{data?.listKhaoSat?.filter(obj => obj != bieuMau?._id)?.length} </p>),
                        //     width: 300,
                        // },
                    ]}
                    rowSelection={{
                        selectedRowKeys,
                        ...rowSelection,
                        checkStrictly,
                    }}
                    loading={loading}
                    dataSource={listDonVi}
                    pagination={false}
                />
                <div className='flex justify-center w-100pt mt-3' onClick={handleSave}>
                    <Button className='btn-success' type="primary" size="middle" disabled={sending}>
                        <span style={{ display: sending ? 'inline-block' : 'none' }}>
                            <CircularProgress className="span-sender" />
                        </span>
                        <SaveIcon className='f-22 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                        Lưu phụ trách
                    </Button>

                </div>
            </Grid>
        </div>
    )
}
const ListUser = ({ listUser }) => {
    return (
        <div className='form-list-user'>
            {
                listUser?.map((user, i) =>
                    <div className='flex justify-between hover-user' key={i}>
                        <p>{user?.email}</p>
                        <span className='icon-de-hover'><DeleteOutlineIcon className='red pointer'></DeleteOutlineIcon></span>

                    </div>
                )
            }
        </div>
    )
}


