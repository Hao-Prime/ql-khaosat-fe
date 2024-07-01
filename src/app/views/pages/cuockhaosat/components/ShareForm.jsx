import { Autocomplete, CircularProgress, Grid, Tab, Tabs, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { debounce, forEach } from "lodash";
import { Divider, Input, QRCode, Table, Space, Switch, Button, Modal, message, Select, Form, InputNumber, Popconfirm, Typography } from 'antd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import Services from 'app/services';
import { useSelector } from 'react-redux';
import PhanLoai from 'app/common/PhanLoai';
import FormatString from 'app/common/FormatString';
const ShareForm = ({ cuocKhaoSat, reloadDetail }) => {
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

                <LinkKhaoSat cuocKhaoSat={cuocKhaoSat} reloadDetail={reloadDetail} />


            </div>

        </div >

    );
};

export default ShareForm;
const LinkKhaoSat = ({ cuocKhaoSat, reloadDetail }) => {
    const [idTaiKhoan, setIdTaiKhoan] = useState(false)
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [listTaiKhoan, setListTaiKhoan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false)
    const [loc, setLoc] = useState(false)
    const [sendingUptaiKhoan, setSendingUptaiKhoan] = useState(false)
    const [listDonVi, setlistDonVi] = useState([]);
    const [listDonViSave, setlistDonViSave] = useState([]);
    const [dataDonVi, setDataDonVi] = useState({ donVi: 0, donViDaPhan: 0 });
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState(cuocKhaoSat?.listIDDonViPhuTrach?.map(obj => obj));
    const rowSelection = {

        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
        },

    };
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [listDonViPhuTrach, setlistDonViPhuTrach] = useState([]);
    const [listAllDonVi, setlistAllDonVi] = useState([]);
    const isEditing = (record) => record._id === editingKey;
    useEffect(() => {

        reloadData()
    }, []);
    useEffect(() => {
        if (listAllDonVi?.length > 0) {
            setlistDonVi(formatData(listAllDonVi, listDonViPhuTrach))
        }
    }, [loc]);
    async function reloadData(params) {

        setLoading(true)
        let resListAllDonVi = (await Services.getDonViService().getSelectToanBoDonViDuoi())?.data
        let resListDonViPhuTrach = (await Services.getCuocKhaoSatService().getListDonViPhuTrach(cuocKhaoSat?._id))?.data
        let tong = 0
        let daPhan = 0
        setlistAllDonVi(resListAllDonVi)
        setlistDonViPhuTrach(resListDonViPhuTrach)
        resListDonViPhuTrach.forEach(element => {
            if (element?.donVi?._id == taiKhoan?.donVi?._id) {
                tong = tong + element?.chiTieu
            } else if (element?.donVi?.donViTrucThuoc == taiKhoan?.donVi?._id) {
                daPhan = daPhan + element?.chiTieu
            }
        });
        setDataDonVi({ donVi: tong, donViDaPhan: daPhan })
        setlistDonVi(formatData(resListAllDonVi, resListDonViPhuTrach))
        setLoading(false)
    }
    function searchTaiKhoanTheoSDTHoacEmail() {
        // Services.getTaiKhoanService.getTaiKhoanSelectSearch(key).then(
        //     (res) => {
        //         if (res.data) {
        //             setListTaiKhoan(res?.data)
        //         }
        //     }
        // )
    }
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record._id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    function saveChild(list, key, newData) {
        // Helper function to update an item and its children recursively
        function updateItem(item, key, newData) {
            if (item._id === key) {
                return { ...item, ...newData };
            }
            if (item.children && item.children.length > 0) {
                return {
                    ...item,
                    children: item.children.map((child) => updateItem(child, key, newData)),
                };
            }
            return item;
        }

        // Iterate through the list to update items recursively
        return list.map((item) => updateItem(item, key, newData));
    }
    const save = async (key) => {

        const row = await form.validateFields();

        // const newData = [...listDonVi];

        // const index = newData.findIndex((item) => key == item._id);

        // if (index > -1) {
        //     const item = newData[index];
        //     newData.splice(index, 1, {
        //         ...item,
        //         ...row,
        //     });
        let listNewData = saveChild(listDonVi, key, row)
        setlistDonVi(listNewData);
        setEditingKey('');

        // xử lý các phần thêm
        let rsSave = []
        listDonViSave?.forEach(dvs => {
            if (dvs?.donVi == key) {
                rsSave.push({
                    donVi: { _id: key },
                    ...row
                })
            } else {
                rsSave.push(dvs)
            }
        });
        if (rsSave?.length == listDonViSave?.length) {
            rsSave.push({
                donVi: { _id: key },
                ...row
            })
        }
        setlistDonViSave(rsSave)

    };
    const columns = [

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
            title: 'Mã khảo sát',
            key: 'maKhaoSat',
            dataIndex: 'maKhaoSat',
            width: 140,
            align: "center",
        },
        {
            title: 'Trạng thái',
            key: 'trangThai',
            render: (data) => (<p className={data?.trangThai > 0 && "blue"}>{PhanLoai?.getPhanLoaiYeuCau(data?.trangThai)} </p>),
            width: 180,
            align: "center",
        },
        {
            title: 'Chỉ tiêu',
            key: 'chiTieu',
            dataIndex: 'chiTieu',
            width: 130,
            editable: true,
            align: "center",
        },
        {
            title: '',
            dataIndex: 'operation',
            width: 100,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record._id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Lưu
                        </Typography.Link>

                        <Popconfirm title="Bạn chắc muốn hủy?" onConfirm={cancel}>
                            <a>Hủy</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        {
                            record?._id != taiKhoan?.donVi?._id &&
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Chỉnh
                            </Typography.Link>
                        }
                    </>

                );
            },
        },

    ]
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'chiTieu' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const setKeyForObject = (obj, level = 0) => {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        const newObj = { ...obj, key: obj._id };

        // Thêm ký tự "-" vào tenDonVi dựa trên cấp độ hiện tại
        // const prefix = '─'.repeat(level);
        // newObj.tenDonVi = `${prefix} ${newObj.tenDonVi}`;

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
        setSending(false)
        Services.getCuocKhaoSatService().phanDonViPhuTrach(cuocKhaoSat?._id, listDonViSave).then(
            (res) => {
                if (res.data) {
                    setSending(false)
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        message.success("Lưu thành công")
                        reloadData()
                    }
                }
            }
        )
    }
    const formatData = (listAll, listSave) => {
        let rs = []
        listAll?.forEach(element => {
            let dvnpt = listSave?.find(obj => element?._id == obj?.donVi?._id)
            if (loc && dvnpt) {
                rs.push({
                    ...element,
                    chiTieu: dvnpt?.chiTieu,
                    trangThai: dvnpt?.trangThai,
                    maKhaoSat: dvnpt?.maKhaoSat,
                    // ...getContChild(element?.children, element?.listKhaoSat?.filter(obj => obj != cuocKhaoSat?._id)?.length),
                    children: formatData(element?.children, listSave)
                })
            } else if (!loc) {
                rs.push({
                    ...element,
                    chiTieu: dvnpt?.chiTieu,
                    trangThai: dvnpt?.trangThai,
                    maKhaoSat: dvnpt?.maKhaoSat,
                    // ...getContChild(element?.children, element?.listKhaoSat?.filter(obj => obj != cuocKhaoSat?._id)?.length),
                    children: formatData(element?.children, listSave)
                })
            }

        });

        return rs?.length == 0 ? null : rs
    }
    const getContChild = (children, slParent) => {
        let rs = 0
        children?.forEach(element => {

            if (element?.children) {
                rs = rs + getContChild(element?.children, element?.listKhaoSat?.filter(obj => obj != cuocKhaoSat?._id)?.length).soLuongTong
            } else {
                rs = rs + element?.listKhaoSat?.filter(obj => obj != cuocKhaoSat?._id)?.length
            }
        });
        return { soLuongTong: rs + slParent, soLuongRieng: slParent }
    }
    const handlSearch = useCallback(
        debounce((e) => {
            Services.getNguoiDungService().getSelect(e).then(
                (res) => {
                    if (res?.data) {
                        const options = res.data.map(item => ({
                            label: `${item?.hoTen}_${item?.soDienThoai}`,
                            value: item?._id,
                        }));
                        setListTaiKhoan(options);

                    }
                }
            )
        }, 500),
        []
    );
    const handleAddUser = () => {
        setSendingUptaiKhoan(true)
        Services.getCuocKhaoSatService().capNhatQuyenKhaoSat({ _id: idTaiKhoan, cuocKhaoSat: { _id: cuocKhaoSat?._id }, phanLoai: 2 }).then(
            (res) => {
                setSendingUptaiKhoan(false)
                if (res?.data?.error) {
                    message.error(res?.data?.message)
                } else {
                    setIdTaiKhoan();
                    reloadDetail()
                }
            }
        );
    }
    const handleDeleteUser = (id) => {
        setSendingUptaiKhoan(true)
        Services.getCuocKhaoSatService().capNhatQuyenKhaoSat({ _id: id, cuocKhaoSat: { _id: cuocKhaoSat?._id }, phanLoai: -1 }).then(
            (res) => {
                setSendingUptaiKhoan(false)
                if (res?.data?.error) {
                    message.error(res?.data?.message)
                } else {
                    setIdTaiKhoan();
                    reloadDetail()
                }
            }
        )
    }

    return (
        <div className=''>
            <div>
                <p className='bold f-16'>Link chia sẻ mẫu khảo sát</p>
            </div>
            <Input value={process.env.REACT_APP_URL_CLIENT + "/khao-sat?key=" + FormatString.getMaKhaoSatTheoDonVi(cuocKhaoSat, taiKhoan?.donVi?._id)} />
            <div className='flex justify-evenly mt-3'>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/khao-sat?key=" + FormatString.getMaKhaoSatTheoDonVi(cuocKhaoSat, taiKhoan?.donVi?._id)}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>WEB</p>
                </div>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/khao-sat?key=" + FormatString.getMaKhaoSatTheoDonVi(cuocKhaoSat, taiKhoan?.donVi?._id)}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>ZALO APP</p>
                </div>
            </div>
            <Divider />
            <Grid container className='w-100pt' spacing={2}>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className='p-1'>
                        <p className='bold f-16'>Danh sách tài khoản được cấp quyền</p>
                        <div className='div-flex justify-between'>
                            <Select
                                allowClear
                                style={{ width: '100%' }}
                                showSearch
                                // onChange={(value) => onChange("", value ? { _id: value } : null)}
                                options={listTaiKhoan}
                                // filterOption={(input, option) =>
                                //     searchTaiKhoanTheoSDTHoacEmail(input)
                                //     // (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                // }
                                filterOption={false}
                                onSearch={handlSearch}
                                value={idTaiKhoan}
                                onChange={(value) => setIdTaiKhoan(value)}
                                placeholder="Tìm theo email hoặc số điện thoại"
                            />

                            <Button type="primary" className='ms-1' onClick={() => handleAddUser()} disabled={!idTaiKhoan || sendingUptaiKhoan}>Thêm</Button>
                        </div>

                        <ListUser handleDeleteUser={handleDeleteUser} listUser={cuocKhaoSat?.listTaiKhoanChinhSua} cuocKhaoSat={cuocKhaoSat} />
                    </div>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <div className='p-1'>
                        <div className='div-flex justify-between wrap'>
                            <div>
                                <p className='bold f-16'>Danh sách đơn vị được phân công</p>
                                <p className='f-13'>Chỉ tiêu cần đạt: {dataDonVi?.donVi}</p>
                                <p className='f-13'>Chỉ đã phân đơn vị dưới trực tiếp: {dataDonVi?.donViDaPhan}</p>
                            </div>

                            <div>
                                Lọc đơn vị phụ trách
                                <Switch onChange={(e) => { setLoc(e) }} className='ms-1' />
                            </div>

                        </div>
                        <Form form={form} component={false}>
                            <Table
                                rowKey="_id"
                                columns={mergedColumns}
                                // rowSelection={{
                                //     selectedRowKeys,
                                //     ...rowSelection,
                                //     checkStrictly,
                                // }}
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                className='pointer mt-1 table-cus-antd'
                                loading={loading}
                                dataSource={listDonVi}
                                pagination={false}
                            />
                        </Form>
                        <div className='flex justify-center w-100pt mt-3' >
                            <Button className='btn-success' type="primary" size="middle" disabled={sending} onClick={handleSave}>
                                <span style={{ display: sending ? 'inline-block' : 'none' }}>
                                    <CircularProgress className="span-sender" />
                                </span>
                                <SaveIcon className='f-22 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                                Lưu phụ trách
                            </Button>

                        </div>
                    </div>
                </Grid>
            </Grid>

        </div >
    )
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Vui lòng chọn ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ListUser = ({ listUser, cuocKhaoSat, handleDeleteUser }) => {

    return (
        <div className='form-list-user mt-1'>
            {
                listUser?.map((user, i) =>
                    <div className='flex justify-between hover-user' key={i}>
                        <p>● {user?.hoTen}
                            {/* - {user?.email}- {user?.soDienThoai} */}
                        </p>
                        <span className='icon-de-hover'>
                            <Popconfirm title="Bạn chắc muốn xóa user này?" onConfirm={() => handleDeleteUser(user?._id)}>
                                <DeleteOutlineIcon className='red pointer'
                                ></DeleteOutlineIcon>
                            </Popconfirm>

                        </span>

                    </div >
                )
            }
        </div >
    )
}