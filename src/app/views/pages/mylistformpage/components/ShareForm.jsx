import { Autocomplete, Grid, Tab, Tabs, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { debounce, forEach } from "lodash";
import { Divider, Input, QRCode } from 'antd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const ShareForm = ({ bieuMau }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="">
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Link khảo sát" />
                <Tab label="Chia sẻ đơn vị" />
            </Tabs>
            <div className='mt-3'>

                {
                    value == 0 ? <LinkKhaoSat bieuMau={bieuMau} /> : <ShareQuyen />
                }

            </div>

        </div >

    );
};

export default ShareForm;
const LinkKhaoSat = ({ bieuMau }) => {
    return (
        <div className=''>
            <div>
                <p className='bold f-25'>Link chia sẻ mẫu khảo sát</p>
            </div>
            <Input value={process.env.REACT_APP_URL_CLIENT + "/khao-sat-bieu-mau?key=" + bieuMau?.maBieuMau} />
            <div className='flex justify-evenly mt-3'>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/khao-sat-bieu-mau?key=" + bieuMau?.maBieuMau}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>WEB</p>
                </div>
                <div>
                    <QRCode
                        errorLevel="H"
                        value={process.env.REACT_APP_URL_CLIENT + "/khao-sat-bieu-mau?key=" + bieuMau?.maBieuMau}
                        icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                    />
                    <p className='text-center'>ZALO APP</p>
                </div>
            </div>

        </div>
    )
}
const ShareQuyen = () => {
    const [listLietSi, setlistLietSi] = useState([]);

    const handleSearchChange = useCallback(
        debounce((keyword) => {

        }, 500),
        [],
    );
    useEffect(() => {

    }, []);

    function handleSelectChange(arr, value) {

        // setLichViengTham({ ...lichViengTham, [arr]: value });
    }
    return (
        <div>
            <p className='bold f-25'>Chia sẻ quyền tương tác với biểu mẫu</p>

            <Grid container spacing={1} className='m-2'>
                <Grid item xs={12} md={6} >
                    <div className='p-1'>

                        <p className='bold mb-2'>Người chỉnh sửa</p>
                        <Autocomplete
                            className="form-item-cus"
                            options={listLietSi}
                            size="small"
                            getOptionLabel={(option) => option?.ho_va_ten || ""}
                            disableClearable
                            onChange={(event, newValue) => {
                                handleSelectChange("ncc_id", newValue?.id);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Nhập email tìm kiếm" onChange={(e) => handleSearchChange(e?.target?.value)}
                                />
                            )}
                        />

                        <ListUser listUser={[{ email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }]}></ListUser>
                    </div>


                </Grid>
                <Grid item xs={12} md={6} >
                    <div className='p-1'>
                        <p className='bold mb-2'>Người xem</p>
                        <Autocomplete
                            className="form-item-cus"
                            options={listLietSi}
                            size="small"
                            getOptionLabel={(option) => option?.ho_va_ten || ""}
                            disableClearable
                            onChange={(event, newValue) => {
                                handleSelectChange("ncc_id", newValue?.id);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Nhập email tìm kiếm" onChange={(e) => handleSearchChange(e?.target?.value)}
                                />
                            )}
                        />
                        <ListUser listUser={[{ email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }, { email: "0904456123@yahoo.com" }]}></ListUser>
                    </div>
                </Grid>
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


