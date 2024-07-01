import React, { useEffect, useState } from 'react'

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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import iconfile from 'app/assets/images/icons8-file-200.png'
import iconvnpt from 'app/assets/images/H-TH-NG-QU-N-L-6-20-2024 (1).png'
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Services from 'app/services';
import { useSelector } from 'react-redux';
import ChangePassModal from '../../profile/ChangePassModal';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const NavbarMunuForm = ({ content, type, children }) => {
    const settings = ['Thông tin cá nhân', 'Biểu mẫu của tôi', 'Đăng xuất'];
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [openChangePassModal, setOpenChangePassModal] = useState(false);
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
        <AppBar position="static" className='xrqwdasd qqweqweeqr' >
            <ChangePassModal open={openChangePassModal} setOpen={setOpenChangePassModal} />
            <Container maxWidth="xl" className='xrqwdasd'>
                <Toolbar disableGutters className='xrqwdasdx'>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {content?.type ?
                            <>
                                {/* <a href='/'><HomeIcon className='icon-homex' /></a> */}
                                <a href={taiKhoan?._id ? '/quan-tri/bieu-mau' : "/"}><ArrowBackIosNewIcon className='icon-homex' /></a>

                                <div className='div-nav-flex'>
                                    {/* <img className='img-nav' src={iconfile}></img> */}
                                    <WebAssetIcon className='me-2 c-blue2' />
                                    <StarBorderIcon className='me-2 c-blue2' />
                                    <div>
                                        <p className='text-tieude-nav'>{content?.title}</p>
                                        <p className='text-his-nav'>{content?.history}</p>
                                    </div>
                                </div>
                            </> :
                            <>
                                <a href='/' className='qxxeyqwopioprq'>
                                    {/* <img className='img-nav' src={iconvnpt}></img> */}
                                    <WebAssetIcon className='me-2 c-blue2' />
                                    <StarBorderIcon className='me-2 c-blue2' />
                                </a>
                                {children}
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
                                    {type != 1 &&
                                        <MenuItem onClick={handleCloseNavMenu}>

                                            <a href={"/khao-sat-bieu-mau?key=" + content?.maBieuMau} target='_blank'><Typography textAlign="center"><PreviewIcon className='f-39 me-1' style={{ color: "#6782df" }} />Xem nhanh</Typography></a>
                                        </MenuItem>
                                    }

                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <div className='div-nav-flex-2'>
                                    <div>
                                        {/* <img className='img-nav-2' src={iconfile}></img> */}
                                        <WebAssetIcon className='me-2 c-blue2' />
                                        <StarBorderIcon className='me-2 c-blue2' />
                                    </div>

                                    <div>
                                        <p className='text-tieude-nav-1'>{content?.title}</p>
                                    </div>
                                </div>
                            </Box>
                        </> :
                        <>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <div className='div-nav-flex-2'>

                                    <WebAssetIcon className='me-2 c-blue2' />
                                    <StarBorderIcon className='me-2 c-blue2' />
                                    {/* <a href='/'><img className='img-nav-2' src={iconvnpt}></img></a> */}
                                    {children}
                                </div>
                            </Box>
                        </>}

                    <Box sx={{ flexGrow: 0 }}>
                        <div className='div-flex'>
                            {content?.type ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <div className='me-2'>
                                    {type != 1 && <a href={"/khao-sat-bieu-mau?key=" + content?.maBieuMau} target='_blank' className='div-flex text-tieude-nav'><PreviewIcon className='f-39 me-1' style={{ color: "#6782df" }} /> Xem nhanh</a>}

                                </div> <span className='black mt-1 me-1'>|</span>
                            </Box> : <></>}
                            {type != 1 && <>
                                <NotificationsNoneIcon className='red me-3' />
                                <span className='black me-2'>{taiKhoan?.hoTen}</span>

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
                                        <Typography textAlign="center" onClick={() => { setOpenChangePassModal(true); handleCloseUserMenu() }}>Đổi mật khẩu</Typography>
                                    </MenuItem>
                                    <MenuItem >
                                        <a href='/quan-tri/bieu-mau'>
                                            <Typography textAlign="center">Biểu mẫu của tôi</Typography>
                                        </a>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        Services.getTaiKhoanService().dangXuat()
                                    }}>

                                        <Typography textAlign="center">Đăng xuất</Typography>


                                    </MenuItem>

                                </Menu>
                            </>}
                        </div>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>


    )
}
export default NavbarMunuForm;
