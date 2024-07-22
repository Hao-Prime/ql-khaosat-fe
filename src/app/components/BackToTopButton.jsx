import React, { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const BackToTopButton = ({ }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Hàm để kiểm tra vị trí cuộn
    const scrollTop = () => {
        if (window.scrollY > 1) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };


    // Thêm sự kiện cuộn
    useEffect(() => {

    }, []);

    return (
        <a
            className={`backToTopBtn div-flex active justify-around`}
            href='#topxssx'
        >
            <KeyboardArrowUpIcon className="f-25 white "></KeyboardArrowUpIcon>
        </a>
    );
};

export default BackToTopButton;
