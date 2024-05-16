import ProtectedRoute from 'app/common/ProtectedRoute';
import Footer from 'app/components/home-component/Footer';
import React, { useState } from 'react'
import { useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import { Button, Menu as MenuNav, Typography } from 'antd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import logoVnpt from "app/assets/images/vnptlogo-white.png"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DonViPage from './donvi/DonViPage';
import NguoiDungPage from './nguoidung/NguoiDungPage';
import DangPhatTrienPage from './developer/DangPhatTrienPage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Services from 'app/services';
const AdminPage = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
    const items = [
        {
            key: '/admin/dashboard',
            icon: <DashboardIcon />,
            label: 'Dashboard',

        },
        {
            key: 'sub1',
            label: 'Quản trị hệ thống',
            icon: <AccountBalanceWalletIcon />,
            children: [
                {
                    key: '/admin/donvi',
                    label: 'Đơn vị',
                },
                {
                    key: '/admin/nguoidung',
                    label: 'Người dùng',
                }

            ],
        },
        {
            key: 'sub2',
            label: 'Quản lý cấu hình',
            icon: <AccountBalanceWalletIcon />,
            children: [
                {
                    key: '/admin/cauhinh/form',
                    label: 'Cấu hình form',
                },
                {
                    key: '/admin/logs',
                    label: 'Log hệ thống',
                }
            ],
        },
    ];
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const chekExistKey = (list, key, subparren) => {
        list?.forEach(element => {
            if (element?.key == key) {
                return key
            }
        });
    }
    useEffect(() => {
        // Lấy đường dẫn của URL hiện tại
        const path = location.pathname;
        console.log(path);
        setDefaultSelectedKeys([path])
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
            if (element?.key == path) {
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
        console.log(key);
        navigate(`${key}`);
    };
    return (
        <div className='flex'>
            <div
                className='nav-bar-cus'
                style={{
                    width: !collapsed ? "256px" : "80px",
                }}
            >
                {collapsed ?
                    <div className=' eqwrttqwecq pointer' onClick={toggleCollapsed} >
                        <MenuOpenIcon />
                    </div>
                    : <div className='div-flex eqwrttqweq pointer' >
                        <MenuIcon onClick={toggleCollapsed}></MenuIcon>
                        <img src={logoVnpt} className='logo-nav' />
                    </div>
                }

                <MenuNav
                    defaultSelectedKeys={[location.pathname]}
                    defaultOpenKeys={getDefaultOpenKeys(location.pathname, items, "")}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={({ key }) => handleMenuItemClick(key)}
                />
            </div>
            <div
                style={{
                    width: !collapsed ? "calc(100% - 256px)" : "calc(100% - 80px)",
                    height: "calc(100vh)"
                }}
            >

                <div className='nav-top'>
                    <div className=' div-flex'>
                        <div className='pointer div-flex' onClick={() => window.location.href = "/"}>
                            <ArrowBackIosIcon className='f14 me-2' />
                            <span>Về trang chủ</span>
                        </div>

                    </div>
                    <div>
                        <div onClick={handleOpenUserMenu} className='pointer'>
                            <Tooltip title="Mở cài đặt" >
                                <span className='me-1'>
                                    {user?.hoTen}
                                </span>

                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="V" src="/static/images/avatar/2.jpg" style={{ background: "linear-gradient(90deg, #6782df, #29b8e9)" }} />
                                </IconButton>
                            </Tooltip>

                        </div>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem  >
                                <Typography textAlign="center">Thông tin cá nhân</Typography>
                            </MenuItem>

                            <MenuItem onClick={() => {
                                Services.getTaiKhoanService().dangXuat()
                            }}>

                                <Typography textAlign="center">Đăng xuất</Typography>


                            </MenuItem>

                        </Menu>
                    </div>

                </div>
                <div className='sidpaa'>
                    <Routes>
                        <Route path="/dashboard" element={<ProtectedRoute user={user} role="admin"> <DangPhatTrienPage /> </ProtectedRoute>} />
                        <Route path="/logs" element={<ProtectedRoute user={user} role="admin"> <DangPhatTrienPage /> </ProtectedRoute>} />
                        <Route path="/donvi" element={<ProtectedRoute user={user} role="admin"> <DonViPage /> </ProtectedRoute>} />
                        <Route path="/nguoidung" element={<ProtectedRoute user={user} role="admin"> <NguoiDungPage /> </ProtectedRoute>} />
                        <Route path="/cauhinh/form" element={<ProtectedRoute user={user} role="admin"> <DangPhatTrienPage /> </ProtectedRoute>} />
                    </Routes>
                    <Footer></Footer>
                </div>

            </div>
        </div>

    );
};

export default AdminPage;
