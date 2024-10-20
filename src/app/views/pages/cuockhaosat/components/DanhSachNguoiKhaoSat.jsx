
import { Button, Dropdown, Input, Modal, Pagination, Space, Table, message, Form, Tooltip } from 'antd';
import FormatDate from 'app/common/FormatDate';
import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import Services from 'app/services';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const DanhSachNguoiKhaoSat = ({ cuocKhaoSat, donVi, reloadDetail }) => {
    const [listKetQua, setListKetQua] = useState([]);
    const [listKetQuaChinhSua, setListKetQuaChinhSua] = useState([]);
    const [limit, setLimit] = useState(30);
    const [modal, contextHolder] = Modal.useModal();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const taiKhoan = useSelector(state => state.taiKhoan)
    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        setLimit(pageSize)
    };
    useEffect(() => {
        if (donVi && page == 1) {
            reLoadList()
        } else {
            setPage(1)
        }
    }, [donVi]);
    useEffect(() => {
        reLoadList()
    }, [limit, page]);
    async function reLoadList(params) {
        setLoading(true)
        let dataRSLisstDv = await Services.getCuocKhaoSatService().getAllResult(cuocKhaoSat?._id, donVi?._id || taiKhoan?.donVi?._id, page - 1, limit)
        if (dataRSLisstDv?.data?.content) {
            setListKetQua(dataRSLisstDv?.data?.content)
            dataRSLisstDv?.data?.content.forEach(element => {
                console.log(JSON.parse(element?.ketQuaFormIO));
            });
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
                    // dataIndex: e?.key,
                    render: (data, record, index) => (<p>{getValueFromKey(data, e?.key)}</p>),
                    editable: ["textfield", "phoneNumber", "email", "textarea"]?.includes(e?.type) && (!donVi?._id || donVi?._id == taiKhoan?.donVi?._id),
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
        let dataRSLisstDv = await Services.getCuocKhaoSatService().getAllResult(cuocKhaoSat?._id, taiKhoan?.donVi?._id, 0, 30000)
        if (dataRSLisstDv?.data?.content) {
            dataRSLisstDv = dataRSLisstDv?.data?.content
            let listLabel = getColumnFromEditFormIO2(cuocKhaoSat?.thanhPhan)
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
            XLSX.writeFile(workbook, `Kết quả khảo sát ${cuocKhaoSat?.maKhaoSat}.xlsx`)
        }
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const handleSave = (row) => {
        let rs = []
        let rsSave = []
        listKetQua.forEach(kq => {
            if (kq?._id == row?._id) {
                let ketQua = []
                row?.ketQua.forEach(element => {
                    if (row[element?.key]) {
                        ketQua.push({ ...element, value: row[element?.key] })
                    } else {
                        ketQua.push(element)
                    }
                });
                rs.push({ ...kq, ketQua: ketQua })
                rsSave.push({ ...kq, ketQua: ketQua })
            } else {
                rs.push(kq)
            }
        });
        setListKetQua(rs)
        setListKetQuaChinhSua(rsSave)
        // const newData = [...dataSource];
        // const index = newData.findIndex((item) => row.key === item.key);
        // const item = newData[index];
        // newData.splice(index, 1, {
        //   ...item,
        //   ...row,
        // });
        // setDataSource(newData);
    };
    const handleComplete = async () => {
        const confirmed = await modal.confirm({
            title: "Bạn muốn gửi và hoàn thành khảo sát",
            content: "Các kết quả sẽ chuyển lên đơn vị trên - Các đơn vị dưới đều sẽ kết thúc, ngời dùng không thể khảo sát cho đơn vi này nữa",

        });
        if (confirmed) {
            Services.getCuocKhaoSatService().hoanThanhKhaoSat(cuocKhaoSat?._id, taiKhoan?.donVi?._id)?.then(
                (res) => {
                    setSending(false)
                    message.success("Lưu thành công")
                    reloadDetail()
                }
            )
        }
    }
    const handleSaveResult = async () => {
        const confirmed = await modal.confirm({
            title: "Bạn muốn lưu kết quả chỉnh sữa này ",
            content: "",
        });
        if (confirmed) {
            setSending(true)
            Services.getCuocKhaoSatService().capNhatKetQuaKS(cuocKhaoSat?._id, listKetQuaChinhSua)?.then(
                (res) => {
                    setSending(false)
                    message.success("Lưu thành công")
                }
            )
        }
    }
    const handleXoaKetQua = async (idKetQua) => {
        const confirmed = await modal.confirm({
            title: "Bạn muốn xóa kết quả này",
            content: "",

        });
        if (confirmed) {
            setSending(true)
            Services.getCuocKhaoSatService().xoaKetQua(idKetQua, cuocKhaoSat?._id)?.then(
                (res) => {
                    setSending(false)
                    message.success("Lưu thành công")
                    reLoadList()
                }
            )
        }
    }
    return (
        <div >
            {contextHolder}
            <div className='flex justify-between'>
                <p className='text-center bold f-16'>Danh sách khảo sát <span className='red'>{donVi?.tenDonVi}</span>:{/*  */}</p>
                {/* <Button key="submit" title='Xuât chi tiết tất cả câu trả lời' type="primary" onClick={() => downloadExcel()}>
                    <span className='white'><DownloadIcon className='f-14 me-1' />Xuất toàn bộ</span>
                </Button> */}
            </div>
            <Table
                rowKey="id"
                bordered
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
                    ...getColumnFromEditFormIO(cuocKhaoSat?.thanhPhan),
                    ...((cuocKhaoSat?.donViPhuTrach?.trangThai == 2 && (donVi?._id == taiKhoan?.donVi?._id || !donVi)) ?
                        [{
                            title: "",
                            render: (data) => (<Tooltip title="Xóa kết quả này">

                                <DeleteOutlineIcon className='red' onClick={() => handleXoaKetQua(data?._id)} />
                            </Tooltip>),
                            align: "center",
                            width: 50,

                        }] : [])
                ].map((col) => {
                    if (!col.editable) {
                        return col;
                    }
                    return {
                        ...col,
                        onCell: (record) => ({
                            record,
                            editable: col.editable,
                            dataIndex: col.key,
                            title: col.title,
                            handleSave,
                        }),
                    };
                })}
                scroll={{ x: '100%', y: 415 }}
                locale={{ emptyText: 'Không có dữ liệu' }}
                style={{ minHeight: 200 }}
                components={components}
                dataSource={listKetQua}
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
            {(cuocKhaoSat?.donViPhuTrach?.trangThai == 2 && (donVi?._id == taiKhoan?.donVi?._id || !donVi)) &&

                <div className='flex justify-center w-100pt mt-3' >
                    <Button type="primary" size="middle" disabled={sending} onClick={handleSaveResult} className='me-1'>
                        <span style={{ display: sending ? 'inline-block' : 'none' }}>
                            <CircularProgress className="span-sender" />
                        </span>
                        <SaveIcon className='f-22 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                        Lưu kết quả
                    </Button>
                    <Button type="primary" size="middle" disabled={sending} onClick={handleComplete} >
                        <span style={{ display: sending ? 'inline-block' : 'none' }}>
                            <CircularProgress className="span-sender" />
                        </span>
                        <SaveIcon className='f-22 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                        Hoàn thành khảo sát
                    </Button>
                </div>
            }
        </div >

    );
};
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    key,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record.ketQua.find(item => item.key === dataIndex)?.value || '',
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
export default DanhSachNguoiKhaoSat;
