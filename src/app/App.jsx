import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import HomePage from "app/views/pages/homepage/HomePage";
import Services from "app/services";
import '../index.css';
import "app/assets/css/rsuite-lib.css";
import "app/assets/css/style.css";
import "app/assets/css/custom-antd.css";
import MyListFormPage from "./views/pages/mylistformpage/MyListFormPage";
import FormDetailPage from "./views/pages/mylistformpage/FormDetailPage";

import Loading from './components/Loading';
import ProtectedRoute from './common/ProtectedRoute';
import AdminPage from './views/pages/admin/AdminPage';
import { useDispatch } from 'react-redux';
import allActions from './actions';
import HomeMenuPage from './views/pages/homepage/HomeMenuPage';

const App = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true)
        Services.getTaiKhoanService().getMe().then((res) => {
            if (res?.data) {
                setUser(res?.data);
                dispatch(allActions.taiKhoanActions.setTaiKhoanNguoiDung(res?.data))
                setLoading(false)
            }

        }, (err) => {
            setUser();
        });
    }, []);

    return (
        <>
            {loading ? <>
                <Loading />
            </> :
                <Routes>
                    <Route path="/quan-tri/*" element={<ProtectedRoute user={user} role="user"><HomeMenuPage user={user} /></ProtectedRoute>} />
                    {/* <Route path="/chi-tiet-bieu-mau" element={<ProtectedRoute user={user} role="user"> <FormDetailPage /> </ProtectedRoute>} /> */}
                    {/* <Route path="/quan-tri/bieu-mau" element={<ProtectedRoute user={user} role="user"> <HomeMenuPage /> </ProtectedRoute>} /> */}
                </Routes>

            }
        </>

    );
};

export default App;


