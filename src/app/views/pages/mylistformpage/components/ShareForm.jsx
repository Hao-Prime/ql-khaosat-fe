import { Autocomplete, CircularProgress, Grid, Tab, Tabs, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { debounce, forEach } from "lodash";
import { Divider, Input, QRCode, Table, Space, Switch, Button, Modal, message, Select, Popconfirm } from 'antd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import Services from 'app/services';
import { useSelector } from 'react-redux';
const ShareForm = ({ bieuMau , reloadDetail}) => {
    const [idTaiKhoan, setIdTaiKhoan] = useState(false)
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [listTaiKhoan, setListTaiKhoan] = useState([]);
    const [loc, setLoc] = useState(false)
    const [sendingUptaiKhoan, setSendingUptaiKhoan] = useState(false)
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
        Services.getFormService().capNhatQuyenBieuMau({ _id: idTaiKhoan, bieuMau: { _id: bieuMau?._id }, phanLoai: 2 }).then(
            (res) => {
                setSendingUptaiKhoan(false)
                if (res?.data?.error) {
                    message.error(res?.data?.message)
                } else {
                    setIdTaiKhoan();
                    reloadDetail(false)
                }
            }
        );
    }
    const handleDeleteUser = (id) => {
        setSendingUptaiKhoan(true)
        Services.getFormService().capNhatQuyenBieuMau({ _id: id, bieuMau: { _id: bieuMau?._id }, phanLoai: -1 }).then(
            (res) => {
                setSendingUptaiKhoan(false)
                if (res?.data?.error) {
                    message.error(res?.data?.message)
                } else {
                    setIdTaiKhoan();
                    reloadDetail(false)
                }
            }
        )
    }
    return (
        <div className="">
            {/* <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Link khảo sát" />
                <Tab label="Chia sẻ đơn vị" />
            </Tabs> */}
            <div className='mt-3'>

                 <LinkKhaoSat bieuMau={bieuMau} /> 
                 <Grid item xs={12} sm={12} md={12} lg={12}>
  
                        <div className='p-1'>
                            <p className='bold f-16'>Danh sách tài khoản được cấp quyền</p>
                            <div className='div-flex justify-between'>
                                <Select
                                    allowClear
                                    style={{ width: '100%' }}
                                    showSearch
                                    options={listTaiKhoan}
                                    filterOption={false}
                                    onSearch={handlSearch}
                                    value={idTaiKhoan || null}
                                    onChange={(value) => setIdTaiKhoan(value)}
                                    placeholder="Tìm theo email hoặc số điện thoại"
                                />

                                <Button type="primary" className='ms-1' onClick={() => handleAddUser()} disabled={!idTaiKhoan || sendingUptaiKhoan}>Thêm</Button>
                            </div>

                            <ListUser handleDeleteUser={handleDeleteUser} listUser={bieuMau?.listTaiKhoanChinhSua} bieuMau={bieuMau} />
                        </div>
                    
                </Grid>
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
                <p className='bold f-25'>Link biểu mẫu</p>
            </div>
            <Input value={process.env.REACT_APP_URL_CLIENT + "/quan-tri/chi-tiet-bieu-mau?id=" + bieuMau?._id } />
            <div className='flex justify-evenly mt-3'>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/quan-tri/chi-tiet-bieu-mau?id=" + bieuMau?._id}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>WEB</p>
                </div>
            </div>

        </div>
    )
}
const ListUser = ({ listUser, bieuMau, handleDeleteUser }) => {

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


