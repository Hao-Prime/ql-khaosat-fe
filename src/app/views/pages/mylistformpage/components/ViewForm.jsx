import React, { useState } from 'react'
import { Form } from "@formio/react";
import NavbarMunuForm from './NavbarMunuForm';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Button } from 'antd';
const ViewForm = () => {
    const onSubmitHandler = (submission) => {
        console.log(submission);
    };
    const handleSave = (submission) => {
        console.log(submission);
    };
    return (
        <div className='div-form-view'>
            <NavbarMunuForm content={{ type: true, title: "Đánh Giá Hiệu Quả Dịch Vụ Công", history: "ĐƯỢC LƯU LÚC 11:26 THỨ HAI, 1 THÁNG 4, 2024" }} />
            <div className='div-form-view-detail'>
                <Form
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
                            {
                                "html": "<h4><strong>PHIẾU KHẢO SÁT VỀ VIỆC...</strong></h4><p>Nhầm nâng cao chất lượng sản phẩm và dịch vụ, nay công ty chúng tôi ...</p>",
                                "label": "Giới thiệu",
                                "customClass": "Class-menu-default",
                                "refreshOnChange": false,
                                "key": "content",
                                "type": "content",
                                "input": false,
                                "tableView": false,
                                "id": "e5kwn1",
                                "placeholder": "",
                                "prefix": "",
                                "suffix": "",
                                "multiple": false,
                                "defaultValue": null,
                                "protected": false,
                                "unique": false,
                                "persistent": true,
                                "hidden": false,
                                "clearOnHide": true,
                                "refreshOn": "",
                                "redrawOn": "",
                                "modalEdit": false,
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
                                "addons": []
                            },
                            {
                                "label": "Họ và tên",
                                "placeholder": "Họ và tên người khảo sát",
                                "validate": {
                                    "required": true,
                                    "custom": "",
                                    "customPrivate": false,
                                    "strictDateValidation": false,
                                    "multiple": false,
                                    "unique": false,
                                    "minLength": "",
                                    "maxLength": "",
                                    "pattern": ""
                                },
                                "errorLabel": "Bắt buộc nhập họ và tên",
                                "type": "textfield",
                                "input": true,
                                "key": "textField1",
                                "tableView": true,
                                "id": "e4er40y",
                                "prefix": "",
                                "customClass": "",
                                "suffix": "",
                                "multiple": false,
                                "defaultValue": null,
                                "protected": false,
                                "unique": false,
                                "persistent": true,
                                "hidden": false,
                                "clearOnHide": true,
                                "refreshOn": "",
                                "redrawOn": "",
                                "modalEdit": false,
                                "dataGridLabel": false,
                                "labelPosition": "top",
                                "description": "",
                                "tooltip": "",
                                "hideLabel": false,
                                "tabindex": "",
                                "disabled": false,
                                "autofocus": false,
                                "dbIndex": false,
                                "customDefaultValue": "",
                                "calculateValue": "",
                                "calculateServer": false,
                                "widget": {
                                    "type": "input"
                                },
                                "attributes": {},
                                "validateOn": "change",
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
                                "mask": false,
                                "inputType": "text",
                                "inputFormat": "plain",
                                "inputMask": "",
                                "displayMask": "",
                                "spellcheck": true,
                                "truncateMultipleSpaces": false
                            },
                            {
                                "label": "Số điện thoại/Email",
                                "placeholder": "Nhập số điện thoại hoặc email của bạn",
                                "description": "Hoặc bất kỳ thông tin liên hệ khác",
                                "tooltip": "Giúp chúng tôi có thể liên hệ với bạn",
                                "validate": {
                                    "required": true,
                                    "custom": "",
                                    "customPrivate": false,
                                    "strictDateValidation": false,
                                    "multiple": false,
                                    "unique": false,
                                    "minLength": "",
                                    "maxLength": "",
                                    "pattern": ""
                                },
                                "type": "textfield",
                                "input": true,
                                "key": "textField",
                                "tableView": true,
                                "id": "evazdl",
                                "prefix": "",
                                "customClass": "",
                                "suffix": "",
                                "multiple": false,
                                "defaultValue": null,
                                "protected": false,
                                "unique": false,
                                "persistent": true,
                                "hidden": false,
                                "clearOnHide": true,
                                "refreshOn": "",
                                "redrawOn": "",
                                "modalEdit": false,
                                "dataGridLabel": false,
                                "labelPosition": "top",
                                "errorLabel": "",
                                "hideLabel": false,
                                "tabindex": "",
                                "disabled": false,
                                "autofocus": false,
                                "dbIndex": false,
                                "customDefaultValue": "",
                                "calculateValue": "",
                                "calculateServer": false,
                                "widget": {
                                    "type": "input"
                                },
                                "attributes": {},
                                "validateOn": "change",
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
                                "mask": false,
                                "inputType": "text",
                                "inputFormat": "plain",
                                "inputMask": "",
                                "displayMask": "",
                                "spellcheck": true,
                                "truncateMultipleSpaces": false
                            }
                        ],
                        "type": "form"
                    }
                    } onSubmit={onSubmitHandler}
                />
                <div className='flex justify-center mt-4' onClick={handleSave}>
                    <Button className='btn-primary' type="primary" size="large">Gửi kết quả <TelegramIcon className='f-28 ms-1' /></Button>

                </div>

            </div>
        </div>
    );
};

export default ViewForm;
