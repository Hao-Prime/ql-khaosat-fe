import { Timeline } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
const HistoryForm = ({ bieuMau }) => {

    const [listLichSu, setListLichSu] = useState([]);
    useEffect(() => {
        let rs = []
        console.log(bieuMau);
        bieuMau?.lichSuChinhSuaBieuMau?.reverse()?.forEach(ls => {
            rs.push({ label: dayjs(ls.ngayThaoTac).format("DD/MM/YYYY HH:mm "), children: ls.noiDung })
        });
        setListLichSu(rs)
    }, []);

    return (
        <div className="div-Timeline-cus">
            <Timeline
                mode={"left"}
                items={listLichSu}
            />

        </div >

    );
};

export default HistoryForm;
