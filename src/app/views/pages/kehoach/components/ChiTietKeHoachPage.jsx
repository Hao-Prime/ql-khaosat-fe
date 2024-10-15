import { Button, DatePicker, Divider, Input, Modal, Radio, message, Upload, TreeSelect, Tooltip } from 'antd';
import Services from 'app/services';
import FormatDate from 'app/common/FormatDate';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import { CircularProgress, Grid } from '@mui/material';
import Loading from 'app/components/Loading';
import SunEditor from 'suneditor-react';
import { UploadOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import states from 'app/states/States';
import HelpIcon from '@mui/icons-material/Help';
import { useState, useEffect } from 'react';
import FormatString from 'app/common/FormatString';
const { TextArea } = Input;
const ChiTietKeHoachPage = ({ keHoach, reloadDetail, loading, }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [listFile, setListFile] = useState(keHoach?.listFile);
    useEffect(() => {
        if (keHoach?.listFile?.length > 0) {
            setListFile(keHoach?.listFile?.map((e) => {
                return {
                    ...e,
                    url: process.env.REACT_APP_URL_SERVER + e?.url,
                    name: `${e?.tenFile} (${FormatString.convertSize(e?.size)})`
                }
            }))
        }
    }, [keHoach]);
    return (

        <div className="div-setting-cus">
            {contextHolder}
            {loading ? <Loading></Loading> :
                <>
                    <div className='pb-3'>
                        <p className='bold'> Tiêu đề kế hoạch: </p>
                        <p>
                            {keHoach?.tieuDe}
                        </p>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Nội dung tóm tắt: </p>
                        <p>
                            {keHoach?.tomTat}
                        </p>
                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Nội dung: </p>
                        <div dangerouslySetInnerHTML={{ __html: keHoach?.noiDung }}></div>
                    </div>
                    <div className='pb-3'>
                        <p> <span className='bold'>Đơn vị tạo:</span> <span>{keHoach?.donViTao?.tenDonVi + " - " + keHoach?.nguoiTao?.hoTen + " (" + dayjs(keHoach?.ngayTao)?.format('DD/MM/YYYY HH:mm') + ")"}</span></p>


                    </div>
                    <div className='pb-3'>
                        <p className='bold'> Phạm vi thực hiện trong đơn vị:
                            <Tooltip title="Giới hạn phạm vi phân công thực hiện khảo sát">
                                <HelpIcon className='help' />
                            </Tooltip>
                        </p>
                        <div>
                            {keHoach?.phamViThucHien?.map((e) =>
                                <p key={e?._id}>- {e?.tenDonVi}
                                </p>)}
                        </div>

                    </div>
                    <Grid container className='w-100pt '>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2'>

                            <p className='bold'> Đơn vị chủ trì thực hiện:
                                <Tooltip title="Đơn vị có thể cập nhật, phân công phụ trách">
                                    <HelpIcon className='help' />
                                </Tooltip>
                            </p>
                            <div>
                                {keHoach?.donViThucHien?.map((e) =>
                                    <p key={e?._id}>- {e?.tenDonVi}
                                    </p>)}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2 ps-2'>
                            <p className='bold'>Đơn vị phối hợp:
                                <Tooltip title="Đơn vị có thể xem kế hoạch này">
                                    <HelpIcon className='help' />
                                </Tooltip>
                            </p>
                            {keHoach?.donViPhoiHop?.map((e) =>
                                <p key={e?._id}>- {e?.tenDonVi}
                                </p>)}
                        </Grid>
                    </Grid>
                    <Grid container className='w-100pt'>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2'>
                            <p><span className='bold'> Thời gian bắt đầu:</span> {keHoach?.ngayBD ? dayjs(keHoach?.ngayBD)?.format('DD/MM/YYYY') : ""} </p>


                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} className=' pb-2 ps-2'>
                            <p><span className='bold'>Kết thúc: </span>{keHoach?.ngayKT ? dayjs(keHoach?.ngayKT)?.format('DD/MM/YYYY') : ""} </p>

                        </Grid>
                    </Grid>
                    <div className='pb-3'>
                        <p className='bold'> File đính kèm: </p>
                        <Upload
                            // action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                            // onChange={handleChangeUploadYC}
                            beforeUpload={() => false}
                            // onRemove={(file) => {
                            //     if (file?._id && keHoach?._id) {
                            //         Services.getCuocKhaoSatService().xoaFileKeHoach(file?._id, keHoach?._id)
                            //     }
                            // }}
                            multiple={true}
                            fileList={listFile}
                            className='ms-1'>
                            {/* <Button icon={<UploadOutlined />}>File đính kèm</Button> */}
                        </Upload>
                    </div>



                </>}
        </div >

    );
};

export default ChiTietKeHoachPage;
