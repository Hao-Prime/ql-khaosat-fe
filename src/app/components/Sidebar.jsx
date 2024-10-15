import React, { useState } from 'react'
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu as MenuNav, Typography } from 'antd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import logoVnpt from "app/assets/images/vnptlogo-white.png"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useSelector } from 'react-redux';

const { SubMenu } = MenuNav;
const Sidebar = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
    const items = [
        {
            key: '/quan-tri/dashboard',
            icon: <DashboardIcon />,
            label: 'Dashboard',
            roles: ["admin", "dashboard"],
        },
       
        {
            key: 'sub111zx1',
            icon: <EditCalendarIcon />,
            label: 'Kế hoạch Khảo sát',
            roles: ["admin", "kehoach", "khaosat"],
            children: [
                {
                    key: '/quan-tri/chi-tiet-ke-hoach',
                    label: 'Lập kế hoạch',
                    roles: ["admin", "kehoach:xuly",],
                },
                {
                    key: '/quan-tri/ke-hoach?trangThai=1',
                    label: 'Đang diễn ra',
                    roles: ["admin", "kehoach"],
                },
                {
                    key: '/quan-tri/ke-hoach?trangThai=2',
                    label: 'Đã kết thúc',
                    roles: ["admin", "kehoach"],
                },

            ],

        },
        {
            key: 'sub11a',
            icon: <EditCalendarIcon />,
            label: 'Thực hiện Khảo sát',
            roles: ["admin", "khaosat"],
            children: [
                
                {
                    key: '/quan-tri/khao-sat?trangThai=1',
                    label: 'Chưa tiếp nhận',
                    roles: ["admin", "khaosat:tiepnhan"],
                },
                {
                    key: '/quan-tri/khao-sat?trangThai=2',
                    label: 'Đang thực hiện',
                    roles: ["admin", "khaosat"],
                },
                {
                    key: '/quan-tri/khao-sat?trangThai=3',
                    label: 'Đã hoàn thành',
                    roles: ["admin", "khaosat"],
                },
                
            ],

        },
        {
            key: 'qqeqwqqq',
            icon: <EventAvailableIcon />,
            label: 'Quản lý Biểu mẫu',
            roles: ["admin", "bieumau"],
            children: [
                {
                    key: '/quan-tri/bieu-mau?isShare=1',
                    label: 'Biểu mẫu của tôi',
                    roles: ["admin", "bieumau"],
                },
                {
                    key: '/quan-tri/bieu-mau?isShare=2',
                    label: 'Biểu mẫu được chia sẻ',
                    roles: ["admin", "bieumau"],
                },
            ]
        },
        {
            key: 'sub11x',
            label: 'Quản lý danh mục',
            icon: <AccountBalanceWalletIcon />,
            roles: ["admin", "doituongkhaosat","nguoikhaosat"],
            children: [
                {
                    key: '/quan-tri/nhom-doi-tuong',
                    label: 'Nhóm đối tượng',
                    roles: ["admin", "nhomdoituong"],
                },
                // {
                //     key: '/quan-tri/noi-dung', // nằm trong kế hoạch
                //     label: 'Nội dung/Câu hỏi',
                //     roles: ["admin", "noidung"],
                // },
                {
                    key: '/quan-tri/doi-tuong-khao-sat',
                    label: 'Đối tượng được KS',
                    roles: ["admin", 'doituongkhaosat'],
                },
                {
                    key: '/quan-tri/doi-tuong-lam-khao-sat',
                    label: 'Đối tượng thực hiện KS',
                    roles: ["admin", "doituongthkhaosat"],
                },
                // {
                //     key: 'qqqqqqêe',
                //     label: 'Thiết kế biểu mẫu',
                //     roles: ["admin", "noidung"],
                //     children: [
                        
                //     ]
                // },
                
                {
                    key: '/quan-tri/nguoi-dung',
                    label: 'Người đã khảo sát',
                    roles: ["admin", 'nguoikhaosat'],
                },

            ],
        },
        {
            key: 'sub1',
            label: 'Quản trị hệ thống',
            icon: <AccountBalanceWalletIcon />,
            roles: ["admin", "donvi", "nguoidung"],
            children: [
               
                {
                    key: '/quan-tri/donvi',
                    label: 'Đơn vị',
                    roles: ["admin", "donvi"],
                },
                {
                    key: '/quan-tri/can-bo',
                    label: 'Cán bộ, nhân viên',
                    roles: ["admin", "canbo"],
                },
 

            ],
        },
        // {
        //     key: 'sub12',
        //     icon: <EditCalendarIcon />,
        //     label: 'Thống kê',
        //     roles: ["admin", "thongke.donvi"],
        //     children: [
        //         {
        //             key: '/quan-tri/thong-ke/don-vi',
        //             label: 'Số phiếu theo đơn vị',
        //             roles: ["admin", "thongke.donvi"],
        //         },
        //         // {
        //         //     key: '/quan-tri/thong-ke/khoa-sat',
        //         //     label: 'Khảo sát trong tháng',
        //         //     roles: ["admin"],
        //         // },
        //         // {
        //         //     key: '/quan-tri/thong-ke/ng-dung',
        //         //     label: 'Người dùng tham gia',
        //         //     roles: ["admin"],
        //         // }

        //     ],

        // },
        {
            key: 'sub2',
            label: 'Quản lý cấu hình',
            icon: <AccountBalanceWalletIcon />,
            roles: ["admin", "logs", "form", "role"],
            children: [
                {
                    key: '/quan-tri/cau-hinh/form',
                    label: 'Cấu hình form',
                    roles: ["admin", "form"],
                },
                {
                    key: '/quan-tri/cau-hinh/logs',
                    label: 'Log hệ thống',
                    roles: ["admin", "logs"],
                },
                {
                    key: '/quan-tri/cau-hinh/role',
                    label: 'Quyền truy cập',
                    roles: ["admin", "role"],
                }
            ],
        },
    ];
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        // Lấy đường dẫn của URL hiện tại
        const path = location.pathname;
        // console.log(location.pathname, location.pathname + location?.search);
        setDefaultSelectedKeys([location.pathname, location.pathname + location?.search])
        // Xác định defaultOpenKeys và defaultSelectedKeys dựa trên đường dẫn URL
        let selectKey = []
        let openKey = []
        items?.forEach(element => {

        });


    }, [location]);
    const getDefaultOpenKeys = (path, list, keyP) => {
        let openKeyList = []
        let keyopen = ""
        list?.forEach(element => {
            if (path?.includes(element?.key)) {
                keyopen = keyP
            } else {
                openKeyList = [...openKeyList, ...getDefaultOpenKeys(path, element?.children, element?.key)]
            }
        });
        if (keyopen) {
            openKeyList = [...openKeyList, keyopen]
        }
        return openKeyList;
    }
    const handleMenuItemClick = (key) => {

        navigate(`${key}`);
    };
    const filterMenuItems = (items, roles) => {
        return items
            .filter(item => item.roles.some(role => roles.includes(role)))
            .map(item => {
                const filteredItem = { ...item };
                if (filteredItem.children) {
                    filteredItem.children = filterMenuItems(filteredItem.children, roles);
                }
                return filteredItem;
            });
    };
    const filteredMenuItems = filterMenuItems(items, taiKhoan?.listVaiTro);
    // console.log(filterMenuItems(items, taiKhoan?.listVaiTro));
    const renderMenuItems = (items, level) => {
        return items.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} icon={item?.icon} title={item?.label}>
                        {renderMenuItems(item.children)}
                    </SubMenu>
                );
            }
            return <MenuNav.Item key={item.key} icon={item.icon}>{item.label}</MenuNav.Item>;
        });
    };
    return (

        <div
            className='nav-bar-cus'
            style={{
                width: !collapsed ? "256px" : "60px",
            }}
        >
            {collapsed ?
                <div className=' eqwrttqwecq pointer' onClick={toggleCollapsed} >
                    <MenuOpenIcon />
                </div>
                : <div className='div-flex eqwrttqweq pointer' >
                    <MenuIcon onClick={toggleCollapsed}></MenuIcon>
                    <img src={logoVnpt} className='logo-nav' onClick={() => navigate("/")} />
                </div>
            }

            <MenuNav
                defaultSelectedKeys={[location.pathname, location.pathname + location?.search]}
                defaultOpenKeys={getDefaultOpenKeys([location.pathname, location.pathname + location?.search], items, "")}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                // items={items}
                onClick={({ key }) => handleMenuItemClick(key)}
            >
                {renderMenuItems(filteredMenuItems)}
            </MenuNav>

        </div>


    );
};

export default Sidebar;
