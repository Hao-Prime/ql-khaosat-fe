
import { CircularProgress } from '@mui/material';
import FormatDate from 'app/common/FormatDate';
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, DatePicker, Input, Radio, Empty, Select, message, TreeSelect } from 'antd';
import Services from 'app/services';
import Loading from 'app/components/Loading';
import dayjs from 'dayjs';
const { TextArea } = Input;
const DonViPhuTreachModal = ({ open, setOpen, donViPTUp, setlistDonViSave, setlistDonVi, listDonViSave, listDonVi, khongDat, cuocKhaoSat }) => {
    const [donVIPT, setDonVIPT] = useState(donViPTUp);
    const [listDonVIPTTT, setListDonVIPTTT] = useState([]);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (open) {
            realoadListSelect()
        }
    }, [open]);
    async function realoadListSelect() {
        setLoading(true)
        setSending(false)
        setDonVIPT(donViPTUp)
        await new Promise(resolve => setTimeout(resolve, 50));
        console.log(donViPTUp);
        setLoading(false)
    }
    const onChange = (arr, value) => {
        setDonVIPT({ ...donVIPT, [arr]: value })
    }
    const onSubmit = () => {
        save(donVIPT?._id)
    }
    function saveChild(list, key, newData) {
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
        return list.map((item) => updateItem(item, key, newData));
    }
    const save = async (key) => {
        let row = {...donVIPT,ngayKTEdit: donVIPT.ngayKT}
        let listNewData = saveChild(listDonVi, key, row)
        setlistDonVi(listNewData);
        console.log(listNewData);
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
        setOpen(false)

    };

    return (
        <Modal title={donViPTUp?.tenDonVi} open={open} onOk={onSubmit} onCancel={() => setOpen(!open)} okText=""

            footer={[
                <span className='me-1 red'>{error}</span>,
                ...((donViPTUp?.trangThai == 3 && cuocKhaoSat?.donViPhuTrach?.trangThai == 2) ?
                    [<Button key="submit" type="primary" onClick={() => { khongDat(donViPTUp?._id); setOpen(false) }} disabled={sending}>
                        <span style={{ display: sending ? 'inherit' : 'none' }}>
                            <CircularProgress className="span-sender" />
                        </span>
                        Không đạt khảo sát lại
                    </Button>] : []),
                <Button key="submit" type="primary" onClick={onSubmit} disabled={sending}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    Lưu
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
                        <p className='bold'> Số phiếu *: </p>
                        <Input type='number' defaultValue={donViPTUp?.chiTieu} onChange={(e) => onChange("chiTieu", e?.target?.value)} placeholder="Nhập số phiếu" />
                    </div>

                    <div className='pb-3'>
                        <p className='bold'> Thời hạn: </p>
                        <DatePicker
                            onChange={(e) => onChange("ngayKT", FormatDate.setTimeZoneUTC7(dayjs(e).toDate())
                            )}
                            defaultValue={donViPTUp?.ngayKT ? dayjs(donViPTUp?.ngayKT) : null}
                            format="DD/MM/YYYY HH:mm"
                            showTime style={{ width: "100%" }}
                        />
                    </div>
                </div >
            }
        </Modal>

    );
};

export default DonViPhuTreachModal;
