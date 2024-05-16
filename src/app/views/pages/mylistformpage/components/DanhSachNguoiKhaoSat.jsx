
import { Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import Services from 'app/services';
import DownloadIcon from '@mui/icons-material/Download';
const DanhSachNguoiKhaoSat = ({ bieuMau }) => {
    const [listNguoiDung, setListNguoiDung] = useState([]);
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        setLimit(pageSize)
    };
    useEffect(() => {
        reLoadList()
    }, [limit, page]);
    async function reLoadList(params) {
        setLoading(true)
        let dataRSLisstDv = await Services.getFormService().getAllResult(bieuMau?._id, page - 1, limit)
        if (dataRSLisstDv?.data?.content) {
            setListNguoiDung(dataRSLisstDv?.data?.content)
            setTotalPage(dataRSLisstDv?.data?.totalElements)
        }
        setLoading(false)
    }
    const getColumnFromEditFormIO = (form) => {
        let rs = []
        form?.forEach(e => {
            if (e?.components?.length > 0) {
                rs = [...rs, ...getColumnFromEditFormIO(e?.components)]
            } else if (e?.columns?.length > 0) {
                rs = [...rs, ...getColumnFromEditFormIO(e?.columns)]
            } else if (!["content", "container", "column", "tab"]?.includes(e?.type)) {
                rs.push({
                    title: e?.label,
                    width: 180,
                    key: e?.key,
                    render: (data, record, index) => (<p>{getValueFromKey(data, e?.key)}</p>)
                })
            }
        });
        return rs;
    }
    function getValueFromKey(data, key) {
        let rs = ""
        data?.ketQua?.forEach(element => {
            if (element?.key?.includes(key) && (element?.valueCount || element?.value)) {
                rs = rs + (!rs ? "" : ", ") + (element?.value || element?.label)
            }
        });
        return rs || ""
    }
    return (
        <div >
            <div className='flex justify-between'>
                <p className='text-center bold f-22'>Danh sách khảo sát</p>
                <Button key="submit" title='Xuât chi tiết tất cả câu trả lời' type="primary">
                    <span className='white'><DownloadIcon className='f-14 me-1' />Xuất toàn bộ</span>
                </Button>
            </div>
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
                    ...getColumnFromEditFormIO(bieuMau?.thanhPhan),
                ]}
                scroll={{ x: '100%', y: 415 }}
                locale={{ emptyText: 'Không có dữ liệu' }}
                style={{ minHeight: 415 }}
                dataSource={listNguoiDung}
                pagination={false}
                size='small'
                className='pointer mt-1 table-cus-antd'

            />

            <div className='div-flex justify-between'>
                <div></div>
                <Pagination
                    showSizeChanger
                    onChange={onShowSizeChange}
                    total={totalPage}
                    defaultPageSize={limit}
                />
            </div>
        </div >

    );
};

export default DanhSachNguoiKhaoSat;
