import React, { useState } from 'react'
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu as MenuNav, Typography } from 'antd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import logoVnpt from "app/assets/images/vnptlogo.png"
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
            key: '/quan-tri/bieu-mau',
            icon: <EventAvailableIcon />,
            label: 'Danh sách biểu mẫu',
            roles: ["admin", "bieumau"],
        },
        {
            key: 'sub11',
            icon: <EditCalendarIcon />,
            label: 'Cuộc khảo sát',
            roles: ["admin", "khaosat"],
            children: [
                {
                    key: '/quan-tri/khao-sat?trangThai=0',
                    label: 'Tất cả',
                    roles: ["admin", "khaosat"],
                },
                {
                    key: '/quan-tri/khao-sat?trangThai=1',
                    label: 'Chưa tiếp nhận',
                    roles: ["admin", "khaosat"],
                },
                {
                    key: '/quan-tri/khao-sat?trangThai=2',
                    label: 'Đang diễn ra',
                    roles: ["admin", "khaosat"],
                },
                {
                    key: '/quan-tri/khao-sat?trangThai=3',
                    label: 'Đã kết thúc',
                    roles: ["admin", "khaosat"],
                }

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
                {
                    key: '/quan-tri/nguoi-dung',
                    label: 'Tệp người khảo sát',
                    roles: ["admin", 'nguoidung'],
                }

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
        //             label: 'Chỉ tiêu theo đơn vị',
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
                    label: 'Quyền truy tập',
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
        console.log(location.pathname, location.pathname + location?.search);
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
    console.log(filterMenuItems(items, taiKhoan?.listVaiTro));
    const renderMenuItems = items => {
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
