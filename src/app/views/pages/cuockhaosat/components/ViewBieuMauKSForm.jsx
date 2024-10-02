import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Form } from "@formio/react";
// import NavbarMunuForm from './NavbarMunuForm';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Button, Divider, Modal, Skeleton } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Services from 'app/services';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Loading from 'app/components/Loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ViewBieuMauKSForm = ({ cuocKhaoSatUp , tabValue }) => {
    // const formRef = useRef(null);
    const [modal, contextHolder] = Modal.useModal();
    const [listPageForm, setListPageForm] = useState([]);
    const [page, setPage] = useState(0);
    const [cuocKhaoSat, setCuocKhaoSat] = useState();
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [finish, setFinish] = useState(false);
    const [dataSubmit, setDataSubmit] = useState();
    const [listLabel, setListLabel] = useState([]);
    const [error, setError] = useState("");
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        if (tabValue == "1" ) {
            console.log(tabValue);
            reloadList()
        }
        return () => {
            isMounted = false;
        };
    }, [tabValue]);

    function reloadList() {
        setLoading(true)
        setCuocKhaoSat({ ...cuocKhaoSatUp })
        setListLabel(convertLabelFromListComponent(cuocKhaoSatUp?.thanhPhan));
        setListPageForm(convertCuocKhaoSatToListPage(cuocKhaoSatUp?.thanhPhan));
        setLoading(false)
    }
    const convertCuocKhaoSatToListPage = (thanhPhan) => {
        let isContainer = true
        let rs = []
        thanhPhan.forEach(element => {
            if (element?.type != "container") {
                isContainer = false
            }
        });
        if (isContainer && thanhPhan?.length > 1) {
            thanhPhan.forEach(element => {
                rs.push(element?.components)
            });
            return rs;
        } else return thanhPhan
    }
    const convertObject = (obj) => {
        let list = []
        console.log(obj);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key?.includes("container")) {
                    list = [...list, ...convertObject(obj[key])];
                } else {
                    if (key?.includes('-select') && !key?.includes('-selectboxes')) {
                        let listString = obj[key];
                        if (Array.isArray(listString)) {
                            listString?.forEach(element => {
                                list.push({ key: key + "_" + element, valueCount: 1, type: 2 });
                            });
                        } else if (listString?.value) {// nó là object của api data
                            list.push({ key: key + "_" + obj[key]?.value, label: listString?.label, valueCount: 1, type: 2 });
                        } else {
                            list.push({ key: key + "_" + obj[key], valueCount: 1, type: 2 });
                        }

                    } else
                        if (typeof obj[key] === 'object') {
                            list = [...list, ...convertObjectChildValue(obj[key], key)];
                        } else if (key?.includes('-radio')) {
                            list.push({ key: key + "_" + obj[key], valueCount: 1, type: 2 });
                        } else {
                            list.push({ key, value: obj[key], type: 1 });
                        }
                }

            }
        }
        return list;
    }
    const convertObjectChildValue = (obj, keyParent) => {
        let list = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                list.push({ key: keyParent + "_" + key, valueCount: obj[key] ? 1 : 0, type: 2 });
            }
        }
        return list;
    }
    const onSubmitHandler = async (submission) => {
        if (page == (listPageForm?.length - 1)) {
        } else {
            setDataSubmit({ ...dataSubmit, ...submission?.data })
            setPage(page + 1);
            window.scrollTo(0, 0)
        }

    };
    const decodeJWT = (token) => {
        try {
            // Tách phần payload từ JWT (phần thứ hai, được tách bởi dấu chấm)
            const [, payloadBase64] = token.split('.');

            // Giải mã base64 để nhận được phần payload
            const decodedPayload = atob(payloadBase64);

            // Parse phần payload thành một đối tượng JavaScript
            const decodedPayloadObj = JSON.parse(decodedPayload);

            // console.log('Decoded JWT payload:', decodedPayloadObj);
            // console.log(decodedPayloadObj?.exp);
            // console.log(dayjs.unix(decodedPayloadObj?.exp).format('DD/MM/YYYY HH:mm'))
            // console.log(dayjs(decodedPayloadObj?.exp)?.format())
            return decodedPayloadObj; // Trả về payload đã giải mã
        } catch (error) {
            console.error('Error decoding JWT:', error.message);
            return null;
        }
    };
    const convertLabelFromListComponent = (listCom, keyParen) => {

        let rs = []
        listCom?.forEach(e => {
            if (keyParen) {
                rs.push({ label: e?.label, key: keyParen + '_' + e?.value })
            } else {
                if (e?.components?.length > 0) {
                    rs = [...rs, ...convertLabelFromListComponent(e?.components)]
                } else if (e?.columns?.length > 0) {
                    rs = [...rs, ...convertLabelFromListComponent(e?.columns)]
                } else if (!["content", "container", "column", "tab"]?.includes(e?.type)) {
                    rs.push({ label: e?.label, key: e?.key, })
                    if (e?.values?.length > 0) {
                        rs = [...rs, ...convertLabelFromListComponent(e?.values, e?.key)]
                    }
                    if (e?.data?.values?.length > 0) {
                        rs = [...rs, ...convertLabelFromListComponent(e?.data?.values, e?.key)]
                    }
                }
            }

        });
        return rs;
    }
    const getLabelFromKey = (key) => {
        return listLabel?.find(element => element?.key == key)?.label || "";
    }
    return (
        <div className='div-form-view-2'>
            {contextHolder}

            {loading ? <Skeleton /> : <>
                {/* <NavbarMunuForm type={1} content={{ ...cuocKhaoSat, type: true, title: cuocKhaoSat?.tenCuocKhaoSat, history: "ĐƯỢC LƯU LÚC " + dayjs(cuocKhaoSat?.ngayLuuGanNhat)?.format('HH:mm dddd, D [THÁNG] M, YYYY') }} /> */}
                <div className='pos-relative pt-4'>
                    <div className='div-form-view-detail-full'>
                        {finish ?
                            <div className='div-finish mt-3'>
                                <CheckCircleIcon className='f-40 green'></CheckCircleIcon>
                                <p className='f-20 bold'>Lưu thành công</p>
                                <p className='f-14'>Cảm ơn bạn đã tham gia khảo sát</p>
                                <Button className='mt-2' onClick={() => window.location.href = "/"}> Quay lại</Button>
                            </div>
                            :
                            <>

                                {
                                    listPageForm?.length > 1 ?
                                        <>
                                            {
                                                listPageForm?.map((form, index) =>
                                                    <div className='' key={index} style={{ display: page == index ? "inline-block" : "none" }}>
                                                        <Form
                                                            // ref={formRef}
                                                            src={{
                                                                "input": false,
                                                                "key": "",
                                                                "placeholder": "",
                                                                "prefix": "",
                                                                "customClass": "",
                                                                "suffix": "",
                                                                "multiple": false,
                                                                "defaultValue": null,
                                                                "protected": false,
                                                                "unique": false,
                                                                "persistent": true,
                                                                "hidden": false,
                                                                "clearOnHide": false,
                                                                "refreshOn": "",
                                                                "redrawOn": "",
                                                                "tableView": false,
                                                                "modalEdit": false,
                                                                "label": "",
                                                                "dataGridLabel": false,
                                                                "labelPosition": "top",
                                                                "description": "",
                                                                "errorLabel": "",
                                                                "tooltip": "",
                                                                "hideLabel": false,
                                                                "tabindex": "",
                                                                "disabled": false,
                                                                "autofocus": false,
                                                                "dbIndex": false,
                                                                "customDefaultValue": "",
                                                                "calculateValue": "",
                                                                "calculateServer": false,
                                                                "widget": null,
                                                                "attributes": {},
                                                                "validateOn": "change",
                                                                "validate": {
                                                                    "required": false,
                                                                    "custom": "",
                                                                    "customPrivate": false,
                                                                    "strictDateValidation": false,
                                                                    "multiple": false,
                                                                    "unique": false
                                                                },
                                                                "conditional": {
                                                                    "show": null,
                                                                    "when": null,
                                                                    "eq": ""
                                                                },
                                                                "overlay": {
                                                                    "style": "",
                                                                    "left": "",
                                                                    "top": "",
                                                                    "width": "",
                                                                    "height": ""
                                                                },
                                                                "allowCalculateOverride": false,
                                                                "encrypted": false,
                                                                "showCharCount": false,
                                                                "showWordCount": false,
                                                                "properties": {},
                                                                "allowMultipleMasks": false,
                                                                "addons": [],
                                                                "tree": false,
                                                                "lazyLoad": false,
                                                                "id": "ep1wemg",
                                                                "components": [
                                                                    ...(form ? form : []),
                                                                    ...((index == (listPageForm?.length - 1)) ? [] : [{
                                                                        "label": "Tiếp tục ▷",
                                                                        "action": "submit",
                                                                        "showValidations": false,
                                                                        "theme": "primary",
                                                                        "size": "md",
                                                                        "block": false,
                                                                        "leftIcon": "",
                                                                        "rightIcon": "",
                                                                        "shortcut": "",
                                                                        "description": "",
                                                                        "tooltip": "",
                                                                        "customClass": "btn-submit-form",
                                                                        "tabindex": "",
                                                                        "disableOnInvalid": false,
                                                                        "hidden": false,
                                                                        "autofocus": false,
                                                                        "disabled": false,
                                                                        "tableView": false,
                                                                        "modalEdit": false,
                                                                        "key": "submit",
                                                                        "tags": [],
                                                                        "properties": {},
                                                                        "conditional": {
                                                                            "show": null,
                                                                            "when": null,
                                                                            "eq": "",
                                                                            "json": ""
                                                                        },
                                                                        "customConditional": "",
                                                                        "logic": [],
                                                                        "attributes": {},
                                                                        "overlay": {
                                                                            "style": "",
                                                                            "page": "",
                                                                            "left": "",
                                                                            "top": "",
                                                                            "width": "",
                                                                            "height": ""
                                                                        },
                                                                        "type": "button",
                                                                        "saveOnEnter": false,
                                                                        "input": true,
                                                                        "placeholder": "",
                                                                        "prefix": "",
                                                                        "suffix": "",
                                                                        "multiple": false,
                                                                        "defaultValue": null,
                                                                        "protected": false,
                                                                        "unique": false,
                                                                        "persistent": false,
                                                                        "clearOnHide": true,
                                                                        "refreshOn": "",
                                                                        "redrawOn": "",
                                                                        "dataGridLabel": true,
                                                                        "labelPosition": "top",
                                                                        "errorLabel": "",
                                                                        "hideLabel": false,
                                                                        "dbIndex": false,
                                                                        "customDefaultValue": "",
                                                                        "calculateValue": "",
                                                                        "calculateServer": false,
                                                                        "widget": {
                                                                            "type": "input"
                                                                        },
                                                                        "validateOn": "change",
                                                                        "validate": {
                                                                            "required": false,
                                                                            "custom": "",
                                                                            "customPrivate": false,
                                                                            "strictDateValidation": false,
                                                                            "multiple": false,
                                                                            "unique": false
                                                                        },
                                                                        "allowCalculateOverride": false,
                                                                        "encrypted": false,
                                                                        "showCharCount": false,
                                                                        "showWordCount": false,
                                                                        "allowMultipleMasks": false,
                                                                        "addons": [],
                                                                        "id": "ei8d6og"
                                                                    }])
                                                                ],
                                                                "type": "form"
                                                            }
                                                            }
                                                            onSubmit={onSubmitHandler}
                                                        />
                                                    </div>
                                                )
                                            }
                                            <Divider />
                                            <div className='flex justify-center mt-3'>
                                                {page != 0 && <Button type="dashed" size="middle" onClick={() => { setPage(page - 1); window.scrollTo(0, 0) }}>
                                                    <span className=''> ◁ Trở lại</span>
                                                </Button>}
                                            </div>

                                        </> :
                                        <>
                                            <Form
                                                // ref={formRef}
                                                src={{
                                                    "input": false,
                                                    "key": "",
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "defaultValue": null,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": false,
                                                    "refreshOn": "",
                                                    "redrawOn": "",
                                                    "tableView": false,
                                                    "modalEdit": false,
                                                    "label": "",
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "calculateServer": false,
                                                    "widget": null,
                                                    "attributes": {},
                                                    "validateOn": "change",
                                                    "validate": {
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "strictDateValidation": false,
                                                        "multiple": false,
                                                        "unique": false
                                                    },
                                                    "conditional": {
                                                        "show": null,
                                                        "when": null,
                                                        "eq": ""
                                                    },
                                                    "overlay": {
                                                        "style": "",
                                                        "left": "",
                                                        "top": "",
                                                        "width": "",
                                                        "height": ""
                                                    },
                                                    "allowCalculateOverride": false,
                                                    "encrypted": false,
                                                    "showCharCount": false,
                                                    "showWordCount": false,
                                                    "properties": {},
                                                    "allowMultipleMasks": false,
                                                    "addons": [],
                                                    "tree": false,
                                                    "lazyLoad": false,
                                                    "id": "ep1wemg",
                                                    "components": [
                                                        ...(cuocKhaoSat?.thanhPhan ? cuocKhaoSat?.thanhPhan : []),
                                                    ],
                                                    "type": "form"
                                                }
                                                }
                                                onSubmit={onSubmitHandler}
                                            // onChange={(e) => console.log(e)}
                                            />
                                        </>
                                }

                                {/* <div className='flex justify-center mt-4' onClick={handleSave}>
                        <Button className='btn-primary' type="primary" size="large">Gửi kết quả <TelegramIcon className='f-28 ms-1' /></Button>
                    </div> */}

                                {/* <p className='text-center red'>{error}</p> */}

                            </>}
                    </div>
                    {sending && <div className='loading-hiden-all'>
                        <Loading />
                    </div>}
                </div>

            </>}

        </div>
    );
};

export default ViewBieuMauKSForm;
