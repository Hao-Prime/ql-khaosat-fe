import Cookies from 'js-cookie';
import getCookie from './getCookie';
import axios from "axios";
// const API_URL = "/api/public/getrole";

function getRole() {
    return axios.post(process.env.REACT_APP_URL_SERVER+"/api/public/getrole")
}
function check1Role(url,listQuyen,roleUser){
   
    if(listQuyen.includes(url)||roleUser.includes("ROLE_ADMIN")){
        return true
    } else return false
}
function check2Role(url,url2,listQuyen,roleUser){
    if(listQuyen.includes(url2)||listQuyen.includes(url)||roleUser.includes("ROLE_ADMIN")){
        return true
    } else return false
}
function checkNRole(listURL,listQuyen,roleUser){
    let rs=false
    listURL?.forEach(url => {
        if(listQuyen.includes(url)){
            rs= true
        } 
    });
    if(rs){
        return rs
    }
    if(roleUser.includes("ROLE_ADMIN")){
        return true
    } else return false
   
}

export default {
    check1Role,
    checkNRole,
    check2Role,
    getRole
}