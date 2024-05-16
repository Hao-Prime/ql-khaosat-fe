import { CircularProgress, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { debounce, forEach } from "lodash";
import { Table, Button, Modal, message } from 'antd';
import SaveIcon from '@mui/icons-material/Save';
import Services from 'app/services';


const DonViTrucThuocPage = () => {

    const [listDonVi, setlistDonVi] = useState([]);
    const handleSearchChange = useCallback(
        debounce((keyword) => {

        }, 500),
        [],
    );
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        Services.getFormService().getListDonVi().then(
            (res) => {
                if (res.data) {

                    setlistDonVi(res.data?.map(setKeyForObject))
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
    const expandedRowRender = (record) => {
        if (!record.children || record.children.length === 0) {
            return null;
        }
    }
    return (
        <div>

            <Grid container spacing={1} className='m-2'>
                <Table
                    key={"_id"}
                    expandable={{
                        defaultExpandAllRows: true,
                    }}
                    columns={[


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
                            title: 'Số lượng đã khảo sát',

                            width: '30%',
                            render: (data) => (<p>{data?.listKhaoSat?.length} </p>),
                            width: 300,
                        },
                    ]}
                    // rowSelection={{
                    //     selectedRowKeys,
                    //     ...rowSelection,
                    //     checkStrictly,
                    // }}
                    loading={loading}
                    dataSource={listDonVi}
                    pagination={false}
                />

            </Grid>
        </div>
    )
};

export default DonViTrucThuocPage;
