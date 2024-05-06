import React, { useState } from 'react'

import HomeIcon from '@mui/icons-material/Home';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import iconfile from 'app/assets/images/icons8-file-200.png'
import iconvnpt from 'app/assets/images/vnptlogo.png'
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const NavbarMunuForm = ({ content }) => {
    const settings = ['Thông tin cá nhân', 'Biểu mẫu của tôi', 'Đăng xuất'];


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" className='bg-white' style={{ boxShadow: "rgba(0, 86, 202, 0.28) 0px 0px 20px 0px" }}>
            <Container maxWidth="xl" className='bg-white'>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {content?.type ?
                            <>
                                {/* <a href='/'><HomeIcon className='icon-homex' /></a> */}
                                <a href='/danh-sach-bieu-mau'><ArrowBackIosNewIcon className='icon-homex' /></a>

                                <div className='div-nav-flex'>
                                    <img className='img-nav' src={iconfile}></img>
                                    <div>
                                        <p className='text-tieude-nav'>{content?.title}</p>
                                        <p className='text-his-nav'>{content?.history}</p>
                                    </div>
                                </div>
                            </> :
                            <>
                                <a href='/'><img className='img-nav' src={iconvnpt}></img></a>
                            </>}

                    </Box>
                    {content?.type ?
                        <>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="#6682df"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <a href='/'><Typography textAlign="center"><HomeIcon className='f-39 me-1' style={{ color: "#6782df" }} /> Trang chủ</Typography></a>

                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>

                                        <a href={"/khao-sat-bieu-mau?key=" + content?.maBieuMau} target='_blank'><Typography textAlign="center"><PreviewIcon className='f-39 me-1' style={{ color: "#6782df" }} />Xem nhanh</Typography></a>
                                    </MenuItem>

                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <div className='div-nav-flex-2'>

                                    <img className='img-nav-2' src={iconfile}></img>
                                    <div>
                                        <p className='text-tieude-nav-1'>Đánh Giá Hiệu Quả Dịch Vụ Công</p>
                                    </div>
                                </div>
                            </Box>
                        </> :
                        <>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <div className='div-nav-flex-2'>

                                    <a href='/'><img className='img-nav-2' src={iconvnpt}></img></a>

                                </div>
                            </Box>
                        </>}

                    <Box sx={{ flexGrow: 0 }}>
                        <div className='div-flex'>
                            {content?.type ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <div className='me-2'>
                                    <a href={"/khao-sat-bieu-mau?key=" + content?.maBieuMau} target='_blank' className='div-flex text-tieude-nav'><PreviewIcon className='f-39 me-1' style={{ color: "#6782df" }} /> Xem nhanh</a>

                                </div>
                            </Box> : <></>}
                            <span className='black me-2'>|</span>
                            <Tooltip title="Mở cài đặt">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="V" src="/static/images/avatar/2.jpg" style={{ background: "linear-gradient(90deg, #6782df, #29b8e9)" }} />
                                </IconButton>
                            </Tooltip>
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
                                <MenuItem >
                                    <a href='/danh-sach-bieu-mau'>
                                        <Typography textAlign="center">Biểu mẫu của tôi</Typography>
                                    </a>
                                </MenuItem>
                                <MenuItem >
                                    <a href='/dang-nhap'>
                                        <Typography textAlign="center">Đăng xuất</Typography>
                                    </a>

                                </MenuItem>

                            </Menu>
                        </div>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>


    )
}
export default NavbarMunuForm;
