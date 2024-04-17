import React, { useState } from "react";
import cn from "classnames";
import { Button, TextField } from "@mui/material";
import { Checkbox } from "antd";

const LoginPage = () => {


    return (

        <div className="container">
            <div className="screen">
                <div className="screen__content">

                    <form className="login">
                        <div className="login__field">
                            <h4 className="bold">PHẦN MỀM KHẢO SÁT</h4>
                            <h5 className="bold">Đăng nhập</h5>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <TextField id="outlined-basic" label="Email/Số điện thoại" variant="standard" placeholder="Nhập địa chỉ email/sđt" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <TextField style={{ width: "200px" }} id="outlined-basic" label="Mật khẩu" type="password" variant="standard" />
                        </div>
                        <Checkbox>Lưu mật khẩu</Checkbox>
                        <br />
                        <Button variant="contained" className="mt-2" >Đăng nhập</Button>

                    </form>
                    <div className="social-login">
                        <a href="/#">Quên mật khẩu •</a>
                        <br />

                        <a href="/#">Đăng ký tài khoản •</a>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
