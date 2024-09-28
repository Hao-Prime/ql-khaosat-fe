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
import { Badge, Modal } from 'antd';
import { Drawer } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import { useNavigate } from 'react-router-dom';
const NavbarMunuForm = ({ content, type, children, setHiddenSidebar, hiddenSidebar }) => {
    const settings = ['Thông tin cá nhân', 'Biểu mẫu của tôi', 'Đăng xuất'];
    const taiKhoan = useSelector(state => state.taiKhoan)
    const [openChangePassModal, setOpenChangePassModal] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [listTB, setListTB] = useState([]);
    const [soLuongThongBaoChuaDoc, setsoLuongThongBaoChuaDoc] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    useEffect(() => {
        reLoadTB()
    }, []);
    function reLoadTB() {
        Services.getTaiKhoanService().getThongBaoCuaToi(0, 10000).then(
            (res) => {
                if (res?.data) {
                    setListTB(res?.data?.content)
                    let sl = 0
                    res?.data?.content.forEach(element => {
                        if (element?.trangThai == 0) {
                            sl++
                        }
                    });
                    setsoLuongThongBaoChuaDoc(sl)
                }
            }
        )
    }

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
    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };
    const danhDauDaDoc = (listTBDD) => {
        Services.getTaiKhoanService().daDocThongBao(listTBDD).then(
            (res) => {
                if (res?.data) {
                    reLoadTB()
                }
            }
        )
    }
    const xoaThongBoa = async (idTB) => {
        const confirmed = await modal.confirm({
            title: "Bạn có chắc muốn xóa thông báo",
            content: "",

        });
        if (confirmed) {

            if (idTB) {
                Services.getTaiKhoanService().xoaThongBao(idTB).then(
                    (res) => {
                        if (res?.data) {
                            reLoadTB()
                        }
                    }
                )
            } else {
                Services.getTaiKhoanService().xoaTatCaTB().then(
                    (res) => {
                        if (res?.data) {
                            reLoadTB()
                        }
                    }
                )
            }
        }

    }
    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        console.log('XXXXXXXX');
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            // Nếu đang trong chế độ toàn màn hình, thì thoát
            exitFullscreen();
            setIsFullscreen(false);
        } else {
            // Nếu không trong chế độ toàn màn hình, thì vào chế độ toàn màn hình
            enterFullscreen();
            setIsFullscreen(true);
        }
    };

    const enterFullscreen = () => {
        const element = document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };
    function togglePage() {
        // messageApi.open({
        //     type: 'warning',
        //     content: 'Chức năng đang phát triển',
        // });
    }
    return (
        <AppBar position="static" className='xrqwdasd qqweqweeqr' >
            {contextHolder}
            <ChangePassModal open={openChangePassModal} setOpen={setOpenChangePassModal} />
            <Drawer open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
                <div className='div-ttb'>
                    <div className='tt-ttb'>
                        <div>
                            <NotificationsNoneIcon className='red me-2' /> Thông báo
                        </div>
                        <div>
                            {listTB?.length > 0 && <p className='red pointer' onClick={() => xoaThongBoa()}>  Xóa tất cả</p>}

                        </div>

                    </div>
                    <div className='sroll-thongbao'>
                        {!listTB?.length > 0 && <p className='text-center gray01'>Không có thông báo</p>}
                        {listTB?.map((tb =>
                            <div class="qiweoqpw hover false pos-relative" >
                                <Badge dot={tb?.trangThai == 0 ? true : false} className='w-100pt pe-4'>
                                    <div className='mb-1' >
                                        <i class="gray01 f-13">

                                            <span>{dayjs(tb?.ngayTao)?.format('DD/MM/YYYY HH:mm')}</span>
                                        </i>
                                    </div>
                                    <div className='mb-1 pointer' onClick={() => { navigate("/quan-tri/chi-tiet-khao-sat?id=" + tb?.url) }}>
                                        <b className='adqwueqoieuq'>{tb?.tieuDe}</b>
                                    </div>
                                    <div >
                                        <p className='adqwueqoieuq'>{tb?.noiDung}</p>
                                    </div>
                                    {tb?.trangThai == 0 && <div>
                                        <p class="link pointer f-13 right mt-2 show-hoverx">
                                            <i onClick={() => danhDauDaDoc([tb])}>
                                                <CheckIcon className=' me-1' /> Đánh dấu đã đọc
                                            </i>
                                        </p>
                                    </div>}
                                    <div className='pos-delele-tb'>
                                        <DeleteOutlineIcon className='red  pointer' onClick={() => {
                                            xoaThongBoa([tb?._id])
                                        }} />
                                    </div>
                                </Badge>

                            </div>
                        ))}


                    </div>
                    {soLuongThongBaoChuaDoc > 0 && <div class="MuiBox-root css-1ih1ysu">
                        <div class="btn-dddoc pointer" onClick={() => danhDauDaDoc(listTB)} >
                            <CheckIcon className=' me-1' /> Đánh dấu tất cả đã đọc</div>
                    </div>}
                </div>
                {

                }
            </Drawer>
            <Container maxWidth="xl" className='xrqwdasd'>
                <Toolbar disableGutters className='xrqwdasdx'>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {content?.type ?
                            <>
                                {/* <a href='/'><HomeIcon className='icon-homex' /></a> */}
                                <a href={taiKhoan?._id ? '/quan-tri/bieu-mau' : "/"}><ArrowBackIosNewIcon className='icon-homex' /></a>

                                <div className='div-nav-flex'>
                                    {/* <img className='img-nav' src={iconfile}></img> */}
                                    {hiddenSidebar ?
                                        <FormatIndentIncreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />
                                        : <FormatIndentDecreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />

                                    }
                                    <FullscreenIcon className='me-2 c-blue2' onClick={() => toggleFullscreen()} />
                                    {/* <StarBorderIcon className='me-2 c-blue2' onClick={() => togglePage()} /> */}
                                    <div>
                                        <p className='text-tieude-nav'>{content?.title}</p>
                                        <p className='text-his-nav'>{content?.history}</p>
                                    </div>
                                </div>
                            </> :
                            <>
                                <div className='qxxeyqwopioprq pointer'>
                                {hiddenSidebar ?
                                        <FormatIndentIncreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />
                                        : <FormatIndentDecreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />

                                    }
                                    <FullscreenIcon className='me-2 c-blue2' onClick={() => toggleFullscreen()} />
                                    {/* <StarBorderIcon className='me-2 c-blue2' onClick={() => togglePage()} /> */}
                                </div>
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
                                    {hiddenSidebar ?
                                        <FormatIndentIncreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />
                                        : <FormatIndentDecreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />

                                    }
                                    <FullscreenIcon className='me-2 c-blue2' onClick={() => toggleFullscreen()} />
                                    {/* <StarBorderIcon className='me-2 c-blue2' onClick={() => togglePage()} /> */}
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

                                {hiddenSidebar ?
                                        <FormatIndentIncreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />
                                        : <FormatIndentDecreaseIcon className='me-2 c-blue2' onClick={() => setHiddenSidebar(!hiddenSidebar)} />

                                    }
                                    <FullscreenIcon className='me-2 c-blue2' onClick={() => toggleFullscreen()} />
                                    {/* <StarBorderIcon className='me-2 c-blue2' onClick={() => togglePage()} /> */}
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
                                {soLuongThongBaoChuaDoc > 0 ?
                                    <Badge count={soLuongThongBaoChuaDoc}>
                                        <NotificationsNoneIcon className='red pointer' onClick={toggleDrawer(true)} />
                                    </Badge>
                                    :
                                    <NotificationsNoneIcon className='red pointer' onClick={toggleDrawer(true)} />
                                }


                                <span className='black me-2 ms-3'>{taiKhoan?.hoTen}</span>

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
        </AppBar >


    )
}
export default NavbarMunuForm;
