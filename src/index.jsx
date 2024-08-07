import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Interceptor from 'app/common/Interceptor';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from 'app/reducers';
import reportWebVitals from './reportWebVitals';
import App from 'app/App';
import ViewForm from 'app/views/pages/mylistformpage/components/ViewForm';
import LoginPage from 'app/views/pages/loginpage/LoginPage';
import HomePage from 'app/views/pages/homepage/HomePage';
import ReactDOM from 'react-dom/client';
import ViewKSForm from 'app/views/pages/cuockhaosat/components/ViewKSForm';
import { ContentContext, ContentProvider } from 'app/context/ContentContext';
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Interceptor.initInterceptor();

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ContentProvider>
        <Routes>

          <Route exact path="/khao-sat" element={<ViewKSForm />} />
          <Route exact path="/bieu-mauu" element={<ViewForm />} />
          <Route exact path="/dang-nhap" element={<LoginPage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/*" element={<App />} />

        </Routes>
      </ContentProvider>
    </Provider>

  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
reportWebVitals();
