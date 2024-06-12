
import { Button, Dropdown, Input, Modal, Pagination, Space, Table, message } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState } from 'react'
import Services from 'app/services';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
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
    const getColumnFromEditFormIO2 = (form) => {
        let rs = []
        form?.forEach(e => {
            if (e?.components?.length > 0) {
                rs = [...rs, ...getColumnFromEditFormIO2(e?.components)]
            } else if (e?.columns?.length > 0) {
                rs = [...rs, ...getColumnFromEditFormIO2(e?.columns)]
            } else if (!["content", "container", "column", "tab"]?.includes(e?.type)) {
                rs.push({
                    label: e?.label,
                    key: e?.key,
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
    const downloadExcel = async () => {
        let rs = []
        // console.log(searchKeyword);
        let dataRSLisstDv = await Services.getFormService().getAllResult(bieuMau?._id, 0, 30000)
        if (dataRSLisstDv?.data?.content) {
            dataRSLisstDv = dataRSLisstDv?.data?.content
            let listLabel = getColumnFromEditFormIO2(bieuMau?.thanhPhan)
            dataRSLisstDv.forEach((e, i) => {

                let x = {
                    "STT": i + 1,
                    "Ngày tạo": dayjs(e?.ngayTao)?.format('DD/MM/YYYY HH:mm'),
                    ...listLabel?.map((e2) => { return { [e2?.label]: getValueFromKey(e, e2?.key) } }).reduce((accumulator, currentValue) => {
                        return { ...accumulator, ...currentValue };
                    }, {}),
                }
                rs.push(x)
            });
            console.log(rs);
            const worksheet = XLSX.utils.json_to_sheet(rs);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, `Kết quả khảo sát biểu mẫu ${bieuMau?.maBieuMau}.xlsx`)
        }
    };
    return (
        <div >
            <div className='flex justify-between'>
                <p className='text-center bold f-22'>Danh sách khảo sát</p>
                <Button key="submit" title='Xuât chi tiết tất cả câu trả lời' type="primary" onClick={() => downloadExcel()}>
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

                    {
                        title: "Ngày tạo",
                        render: (data) => (<p>{dayjs(data?.ngayTao)?.format('DD/MM/YYYY HH:mm')} </p>),
                        width: 180,
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
