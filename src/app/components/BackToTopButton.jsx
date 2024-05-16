import React, { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Hàm để kiểm tra vị trí cuộn
    const scrollTop = () => {
        if (window.scrollY > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Hàm để cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Thêm sự kiện cuộn
    useEffect(() => {
        window.addEventListener('scroll', scrollTop);

        // Loại bỏ sự kiện cuộn khi component unmount
        return () => {
            window.removeEventListener('scroll', scrollTop);
        };
    }, []);

    return (
        <button
            className={`backToTopBtn ${isVisible ? 'active' : ''}`}
            onClick={scrollToTop}
        >
            <KeyboardArrowUpIcon className="f-25 white mb-2"></KeyboardArrowUpIcon>
        </button>
    );
};

export default BackToTopButton;
