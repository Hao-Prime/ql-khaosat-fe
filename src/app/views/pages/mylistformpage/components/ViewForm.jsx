import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Form } from "@formio/react";
import NavbarMunuForm from './NavbarMunuForm';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Button, Modal, Skeleton } from 'antd';
import dayjs from 'dayjs';
import Services from 'app/services';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Loading from 'app/components/Loading';
const ViewForm = () => {
    // const formRef = useRef(null);

    const [bieuMau, setBieuMau] = React.useState();
    const key = new URLSearchParams(window.location.search).get("key");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState("");
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        reloadList()

        return () => {
            isMounted = false;
        };
    }, [key]);
    function reloadList() {
        setLoading(true)
        Services.getFormService().getFormDetail(key).then(
            (res) => {
                if (res?.data && isMounted) {
                    setBieuMau(res?.data)
                    setLoading(false)
                } else {
                    Modal.error({
                        title: "Không tìm thấy biểu mẫu",
                    });
                }
            }
        )
    }
    const convertObject = (obj) => {
        let list = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key?.includes("container")) {
                    list = [...list, ...convertObject(obj[key])];
                } else {
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
    const onSubmitHandler = (submission) => {
        setSending(true)
        Services.getFormService().guiKetQua({ bieuMau: bieuMau, ketQua: convertObject(submission?.data) })?.then(
            (res) => {
                setSending(false)
                if (res.data?.error) {
                    Modal.error({
                        title: res.data?.message,
                    });
                } else {
                    setFinish(true)
                }
            }
        )
    };

    return (
        <div className='div-form-view'>
            {loading ? <Skeleton /> : <>
                <NavbarMunuForm content={{ ...bieuMau, type: true, title: bieuMau?.tenBieuMau, history: "ĐƯỢC LƯU LÚC " + dayjs(bieuMau?.ngayLuuGanNhat)?.format('HH:mm dddd, D [THÁNG] M, YYYY') }} />
                <div className='pos-relative'>
                    <div className='div-form-view-detail'>
                        {finish ?
                            <div className='div-finish mt-3'>
                                <CheckCircleIcon className='f-40 green'></CheckCircleIcon>
                                <p className='f-20 bold'>Lưu thành công</p>
                                <p className='f-14'>Cảm ơn bạn đã tham gia khảo sát</p>
                                <Button className='mt-2' onClick={() => window.location.href = "/"}> Quay lại</Button>
                            </div>
                            :
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
                                            ...(bieuMau?.thanhPhan ? JSON.parse(bieuMau?.thanhPhan) : []),
                                            {
                                                "label": "Gửi kết quả",
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
                                            }],
                                        "type": "form"
                                    }
                                    }
                                    onSubmit={onSubmitHandler}
                                // onChange={(e) => console.log(e)}
                                />
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

export default ViewForm;
