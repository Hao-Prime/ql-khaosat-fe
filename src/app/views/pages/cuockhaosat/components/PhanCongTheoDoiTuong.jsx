import { Button, message, QRCode, Table, Tooltip, Typography } from 'antd';
import SapXep from 'app/common/SapXep';
import Services from 'app/services';
import SaveIcon from '@mui/icons-material/Save';
import { CircularProgress } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import React, { useEffect, useState } from 'react'
import SoLuongDoiTuongModal from './SoLuongDoiTuongModal';
const PhanCongTheoDoiTuong = ({ donVi, keHoach, donViTHKS, cuocKhaoSat,reloadDetail }) => {
    const [listDoiTuongKhaoSat, setListDoiTuongKhaoSat] = useState([]);
    const [doiTuongUp, setDoiTuongUp] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [windowScreen, setWindowScreen] = useState(window.screen.width > 1000);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false)
    useEffect(() => {
        reLoadList()
    }, [donViTHKS]);

    async function reLoadList(params) {
        setLoading(true)
        let dataRSLisstDv = (await Services.getDoiTuongKhaoSatService().getAll("", "", keHoach?._id))?.data
        let dataRS = SapXep.sapXepTheoObject2Atr(SapXep.sapXepTheoObjectAtr(dataRSLisstDv, "stt", 1), "nhomDoiTuong", "stt", 1)
        let rs=[]
        dataRS?.forEach(e1 => {
            let exist = false
            donViTHKS?.listPhuTrachDoiTuong?.forEach(e2 => {
                if(e1?._id == e2?._id){
                    rs?.push({...e1, ...e2})
                    exist = true
                }
            });
            if(!exist){
                rs?.push(e1)
            }

        });
        console.log(rs);
        
        setListDoiTuongKhaoSat(rs)

        setLoading(false)
    }
    const handleSave = () => {
        console.log(donViTHKS);
        let rs = []
        listDoiTuongKhaoSat.forEach(element => {
            if (element?.soLuong > 0) {
                rs.push({
                    _id: element?._id,
                    maKhaoSat: donViTHKS?.maKhaoSat + "_" + element?.ma,
                    soLuong: element?.soLuong,
                    soLuongDatDat: element?.soLuongDatDat || 0,
                    ghiChu: element?.ghiChu
                })
            }

        });
        // if (rs?.length > 0) {
            // setSending(true)
            Services.getCuocKhaoSatService().phanPhuTrachDoiTuong({ _id:donViTHKS?._id,cuocKhaoSat:{_id: cuocKhaoSat?._id}, listPhuTrachDoiTuong: rs })?.then(
                (res)=>{
                    if (res?.data?.error) {
                        alert(res?.data?.mesage)
                    } else {
                        message.success("Lưu thành công")
                        window.location.reload()
                    }
                    setSending(false)
                }
            )
        // }

    }

    return (
        <>
            <SoLuongDoiTuongModal
                open={openModal}
                setOpen={setOpenModal}
                doiTuongUp={doiTuongUp}
                listDoiTuongKhaoSat={listDoiTuongKhaoSat}
                setListDoiTuongKhaoSat={setListDoiTuongKhaoSat} />

            <Table
                rowKey="_id"
                loading={loading}
                bordered
                columns={[
                    {
                        title: "STT",
                        width: 40,
                        align: "center",
                        render: (data, record, index) => (<p>{index + 1}</p>),
                    },
                    {
                        title: "Tên nhóm đối tượng",
                        render: (data, record, index) => (<p>{data?.nhomDoiTuong?.ten}</p>),
                        width: 100,


                    },
                    {
                        title: "Tên đối tượng",
                        dataIndex: "ten",
                        key: "ten",
                        width: 120,

                    },

                    {
                        title: "Mã khảo sát",
                        align: "center",
                        width: 80,
                        render: (data) => (
                            <> {data?.maKhaoSat &&
                                <>
                                    <p>
                                        <span onClick={() => { window.open(process.env.REACT_APP_URL_CLIENT + "/khao-sat?key=" + data?.maKhaoSat) }}>
                                            {data?.maKhaoSat}
                                        </span>
                                    </p>
                                    <Tooltip title={
                                        <div className='bg-white bsaeqw' >
                                            <QRCode
                                                errorLevel="H"
                                                className='qr-siz'
                                                value={process.env.REACT_APP_URL_CLIENT + "/khao-sat?key=" + data?.maKhaoSat}
                                            // icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcNYo0rQo34HEXqfOLMhBm8hdlYEM2U7XgkY8eyi3Fg&s"
                                            />
                                        </div>
                                    }>
                                        <p className='nowrap'><span className='brqwiopirqpw mt-1'><QrCodeScannerIcon className='icon-qr f-15' /> QR Code</span></p> </Tooltip>
                                </>
                            }
                            </>
                        ),
                    },
                    {
                        title: <p>Số phiếu <br />cần thực hiện</p>,
                        dataIndex: "soLuong",
                        key: "soLuong",
                        width: 80,
                        align: "center",
                    },
                    {
                        title: "Mô tả",
                        dataIndex: "ghiChu",
                        key: "ghiChu",
                        width: 100,

                    },
                    {
                        title: " ",
                        render: (data, record) => (
                            <Typography.Link onClick={() => {
                                setOpenModal(true);
                                setDoiTuongUp(record)
                            }}
                            >
                                Chỉnh số lượng
                            </Typography.Link>
                        ),
                        fixed: windowScreen ? 'right' : false,
                        width: "70px"
                    }

                ]}
                scroll={{ x: '100%', y: 415 }}
                locale={{ emptyText: 'Không có dữ liệu' }}
                style={{ minHeight: 415 }}
                dataSource={listDoiTuongKhaoSat}
                pagination={false}
                size='small'
                className='pointer mt-1 table-cus-antd'

            />
            {(cuocKhaoSat?.donViPhuTrach?.trangThai == 2) &&

                <div className='flex justify-center w-100pt mt-3 mb-3' >
                    <Button className='btn-success' type="primary" size="middle" disabled={sending} onClick={handleSave}>
                        <span style={{ display: sending ? 'inline-block' : 'none' }}>
                            <CircularProgress className="span-sender" />
                        </span>
                        <SaveIcon className='f-22 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                        Lưu
                    </Button>

                </div>
            }

        </>

    );
};

export default PhanCongTheoDoiTuong;
