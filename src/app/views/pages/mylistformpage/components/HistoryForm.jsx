import { Timeline } from 'antd';
import React, { useState } from 'react'
const HistoryForm = () => {


    return (
        <div className="div-Timeline-cus">
            <Timeline
                mode={"left"}
                items={[
                    {
                        label: '2024-04-01 14:12:11',
                        children: 'Anh Hào đã cập nhật biểu mẫu',
                    },
                    {
                        label: '2024-03-01 09:12:11',
                        children: 'Anh Hào đã chia sẻ biểu mẫu cho Trần Tuyền',
                    },
                    {
                        label: '2024-03-01 09:55:11',
                        children: 'Anh Hào đã cập nhật biểu mẫu',
                    },
                    {
                        label: '2024-03-01 09:12:11',
                        children: 'Biểu mẫu được Anh Hào  khởi tạo',
                    },
                ]}
            />

        </div >

    );
};

export default HistoryForm;
