import { Button, DatePicker, Input, Radio } from 'antd';
import React, { useState } from 'react'
import { Upload } from 'antd';
const SettingForm = () => {

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        // setValue(e.target.value);
    };
    const [fileList, setFileList] = useState([

    ]);
    const onChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    return (
        <div className="div-setting-cus">
            <div className='flex justify-between pb-3'>
                <p className='bold'> Trạng thái: <soan className="green">Đang hoạt động</soan></p>
                <Button type="primary" danger className='bg-red'>Vô hiệu hóa</Button>
            </div>
            <div className='pb-3'>
                <p className='bold'> Loại biểu mẫu: </p>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Cá nhân</Radio>
                    <Radio value={2}>Tổ chức</Radio>

                </Radio.Group>

            </div>
            <div className='pb-3'>
                <p className='bold'> Tên biểu mẫu: </p>
                <Input placeholder="Basic usage" value="Đánh Giá Hiệu Quả Dịch Vụ Công" />

            </div>
            <div className='pb-3'>
                <p className='bold'> Ảnh bìa: </p>

                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>

            </div>
            <div className='pb-3'>
                <p className='bold'> Giới hạn thời gian trả lời biểu mẫu: </p>
                <div className='flex justify-between'>
                    <DatePicker onChange={onChange} format="DD/MM/YYYY HH:mm" showTime style={{ width: "100%", marginRight: "10px" }} />
                    <DatePicker onChange={onChange} format="DD/MM/YYYY HH:mm" showTime style={{ width: "100%" }} />
                </div>


            </div>
        </div >

    );
};

export default SettingForm;
