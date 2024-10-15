
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect, Switch, Form, Table, Popconfirm } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
const { TextArea } = Input;
const { Option } = Select;
const NoiDungKhaoSatModal = ({ open, setOpen, noiDungKhaoSatUp, reLoadList }) => {
    const [noiDungKhaoSat, setNoiDungKhaoSat] = useState(noiDungKhaoSatUp);
    const [listNoiDungKhaoSatTT, setListNoiDungKhaoSatTT] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listKQ, setListKQ] = useState([
        {
            key: '0',
            value: 'tot',
            label: 'Tốt',
        },
        {
            key: '1',
            label: 'Khá',
            value: 'kha'
        },
    ]);

    const [listNDT, setListNDT] = useState([]);
    const [loadingNDT, setLoadingNDT] = useState(false);
    useEffect(() => {
        if (open) {
            realoadListSelect()
        }
    }, [open]);
    async function realoadListSelect() {
        setLoading(true)
        setSending(false)
        setNoiDungKhaoSat(noiDungKhaoSatUp)
        setListKQ(noiDungKhaoSatUp?.giaTri || [])
        let res = await Services.getNhomDoiTuongService().getAll("")
        if (res.data) {
            setListNDT(res?.data)
        }
        // await new Promise(resolve => setTimeout(resolve, 50));
        console.log(noiDungKhaoSatUp);
        setLoading(false)
    }
    const onChange = (arr, value) => {
        setNoiDungKhaoSat({ ...noiDungKhaoSat, [arr]: value })
    }
    const onSubmit = () => {
        setSending(true);
        if (!noiDungKhaoSat?.nhomDoiTuong) {
            setError("Nhóm đối tượng không được để trống")
            setSending(false);
        } else if (!noiDungKhaoSat?.ten) {
            setError("Tên đối tượng không được để trống")
            setSending(false);
        } else {
            setError(true)
            if (!noiDungKhaoSatUp?._id) {
                Services?.getNoiDungKhaoSatService()?.save({ ...noiDungKhaoSat, giaTri: listKQ })?.then(
                    (res) => {

                        if (res?.data?.error) {
                            setError(res?.data?.mesage)
                        } else {
                            setOpen(false);
                            message.success("Lưu thành công")
                            reLoadList()
                        }
                        setSending(true)
                    }
                )
            } else {
                Services?.getNoiDungKhaoSatService()?.update({ ...noiDungKhaoSat, giaTri: listKQ })?.then(
                    (res) => {

                        if (res?.data?.error) {
                            setError(res?.data?.mesage)
                        } else {
                            setOpen(false);
                            message.success("Lưu thành công")
                            reLoadList()
                        }
                        setSending(true)
                    }
                )
            }
        }

    }
    const handleDropdownVisibleChangeNDT = async (open) => {
        if (open) {
            let res = await Services.getNhomDoiTuongService().getAll("")
            if (res.data) {
                setListNDT(res?.data)
            }
        }
    };
    return (
        <Modal title="NỘI DUNG/CÂU HỎI KHẢO SÁT" open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText="" maskClosable={false} width={900}

            footer={[
                <span className='me-1 red'>{error}</span>,

                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    {!noiDungKhaoSatUp?._id ? "Tạo mới" : "Cập nhật"}
                </Button>,
                <Button key="back" onClick={() => setOpen(!open)}>
                    Hủy
                </Button>
            ]}
        >
            {loading ? <Loading />
                :
                <div className="div-setting-cus">
                    <div className='pb-3'>
                        <p className='bold'> Nhóm đối tượng<span className='red'>*</span>: <i><a className='red f-12 pointer' href='/quan-tri/nhom-doi-tuong' target='_blank'> Tạo nhóm mới</a></i></p>
                        <Select
                            allowClear
                            onDropdownVisibleChange={handleDropdownVisibleChangeNDT}  // Gọi API khi dropdown mở
                            loading={loadingNDT}  // Hiển thị Spin nếu đang load dữ liệu
                            defaultValue={noiDungKhaoSatUp?.nhomDoiTuong?._id}
                            style={{ width: '100%' }}
                            showSearch
                            onChange={(value) => onChange("nhomDoiTuong", value ? { _id: value } : null)}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa/chữ thường
                            }
                            placeholder="Chọn nhóm đối tượng"
                        >
                            {loadingNDT ? (
                                <Option disabled key="loading">Loading...</Option>
                            ) : (
                                listNDT.map((item) => (
                                    <Option key={item._id} value={item?._id}>
                                        {item.ten}
                                    </Option>
                                ))
                            )}
                        </Select>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Nội dung/Câu hỏi khảo sát <span className='red'>*</span>: </p>
                        <TextArea
                            rows={3}
                            defaultValue={noiDungKhaoSatUp?.ten}
                            onChange={(e) => onChange("ten", e?.target?.value)}
                            placeholder="Xin Ông/Bà vui lòng cho biết đánh giá của mình về tính ..." />
                    </div>
                    {/* <div className='pb-3'>
                        <p className='bold'> Giá trị: </p>
                        <TextArea
                            rows={8}
                            defaultValue={noiDungKhaoSatUp?.value
                                ? JSON.stringify(noiDungKhaoSatUp.value, null, 2)
                                    .replace(/\\"/g, '"')
                                    .replace(/\\\\/g, '\\')
                                : ""
                            }
                            onChange={(e) => {
                                let inputValue = e.target.value;

                                inputValue = inputValue.replace(/:(\s*)"(.*?)"(,|\s*}|$)/g, (match, p1, p2, p3) => {
                                    return `:${p1}"${p2.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"${p3}`;
                                });
                                try {
                                    const parsedValue = JSON.parse(inputValue);
                                    onChange("value", parsedValue);
                                    setError("");
                                } catch (err) {
                                    setError("Dữ liệu không đúng định dạng JSON");
                                }
                            }}
                            placeholder={`Nhập value dạng JSON có dạng:\n[{\n   "label": "Tốt",\n   "value": "tot"\n}]`}
                        />
                    </div> */}
                    <div className='pb-3'>
                        <p className='bold'> Thứ tự: </p>
                        <Input defaultValue={noiDungKhaoSatUp?.stt} onChange={(e) => onChange("stt", e?.target?.value)} placeholder="Nhập stt " />
                    </div>
                    <div className='pb-3 div-flex justify-between'>
                        <p className='bold mb-1'> Trạng thái </p>
                        <Switch checkedChildren="Mở" unCheckedChildren="Khóa" defaultChecked={noiDungKhaoSatUp?.trangThai ? true : false} onChange={(e) => onChange("trangThai", e ? 1 : 0)} />
                    </div>
                    <div className='pb-3'>
                        <p className='bold'>Giá trị/ câu trả lời </p>

                        <AddListKQ dataSource={listKQ} setDataSource={setListKQ} />
                    </div>
                </div >
            }
        </Modal>

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
            [dataIndex]: record[dataIndex],
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
                        message: `${title} là bắt buộc.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingInlineEnd: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const AddListKQ = ({ dataSource, setDataSource }) => {

    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        console.log(key);
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [

        {
            title: 'Nhãn',
            dataIndex: 'label',
            editable: true,
            width: '60%',
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
            width: '30%',
            editable: true,
        },
        {
            title: '...',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Chắn chắn xóa?" onConfirm={() => handleDelete(record.key)}>
                        <a>Xóa</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: Math.floor(100000 + Math.random() * 900000).toString(),
            value: Math.floor(100000 + Math.random() * 900000).toString(),
            label: `Nhãn`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];

        // Kiểm tra xem value hoặc label có trùng với các hàng khác không
        const isDuplicateValue = newData.some(
            (data) => data.value === row.value && data.key !== row.key
        );
        const isDuplicateLabel = newData.some(
            (data) => data.label === row.label && data.key !== row.key
        );

        if (isDuplicateValue) {
            message.error("Giá trị '" + row?.value + "' đã tồn tại!");
            return;
        }

        if (isDuplicateLabel) {
            message.error("Giá trị '" + row?.label + "' đã tồn tại!");
            return;
        }

        // Nếu không trùng lặp, tiếp tục lưu trữ
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>

            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size='small'
                className='ant-table-not-height'
            />
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginTop: 16,
                }}
            >
                Thêm giá trị
            </Button>
        </div>
    );
};

export default NoiDungKhaoSatModal;
