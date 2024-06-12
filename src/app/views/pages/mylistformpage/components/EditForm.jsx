import React, { useEffect, useState } from 'react'

import { FormBuilder as FormBuilderIo, Formio, FormEdit, Components } from "react-formio";
import "react-form-builder2/dist/app.css";
import "formiojs/dist/formio.full.css";
import { Button, ConfigProvider, Modal, message } from 'antd';
import states from 'app/states/States';

import SaveIcon from '@mui/icons-material/Save';
import Services from 'app/services';
import { CircularProgress } from '@mui/material';
const EditForm = ({ bieuMau }) => {
    const key = new URLSearchParams(window.location.search).get("key");
    const [formData, setFormData] = useState({
        display: "form",
        components: bieuMau?.thanhPhan
        // components: [{
        //     "html": "<h4><strong>PHIẾU KHẢO SÁT VỀ VIỆC...</strong></h4><p>Nhầm nâng cao chất lượng sản phẩm và dịch vụ, nay công ty chúng tôi ...</p>",
        //     "label": "Giới thiệu",
        //     "customClass": "Class-menu-default",
        //     "refreshOnChange": false,
        //     "key": "content",
        //     "type": "content",
        //     "input": false,
        //     "tableView": false
        // },
        // {
        //     "label": "Họ và tên",
        //     "placeholder": "Họ và tên người khảo sát",
        //     "validate": {
        //         "required": true
        //     },
        //     "errorLabel": "Bắt buộc nhập họ và tên",
        //     "type": "textfield",
        //     "input": true,
        //     "key": "textField1",
        //     "tableView": true
        // },
        // {
        //     "label": "Số điện thoại/Email",
        //     "placeholder": "Nhập số điện thoại hoặc email của bạn",
        //     "description": "Hoặc bất kỳ thông tin liên hệ khác",
        //     "tooltip": "Giúp chúng tôi có thể liên hệ với bạn",
        //     "validate": {
        //         "required": true
        //     },
        //     "type": "textfield",
        //     "input": true,
        //     "key": "textField",
        //     "tableView": true
        // }]

    });
    const [sending, setSending] = useState(false)
    const printResult = () => {
        Formio.createForm(document.getElementById("formio-result"), {
            components: formData?.components
        }).then((form) => {
            console.log(form.component?.components);
            setSending(true);
            console.log(generateKey(form.component?.components))

            Services.getFormService().capNhatBieuMau({ ...bieuMau, thanhPhan: JSON.stringify(generateKey(form.component?.components)) }).then(
                (res) => {
                    setSending(false);
                    if (res?.data?.error) {
                        Modal.error({
                            title: 'Lỗi',
                            content: res?.data?.message,
                        });
                    } else {
                        message.success("Lưu thành công")
                    }
                }
            )
            form.on("submit", (data) => console.log("submit", data));
        });
    };

    const handleSave = () => {
        printResult()
    }
    const generateKey = (listForm) => {
        let rs = []
        listForm?.forEach(element => {
            if (element?.columns?.length > 0) {
                rs.push({ ...element, columns: generateKey(element?.columns) })
            } else if (element?.components?.length > 0) {
                rs.push({ ...element, components: generateKey(element?.components) })
            } else {
                if (element?.key?.length < 20) {

                    rs.push({ ...element, key: generateRandomString(20) + "-" + (element?.key?.includes("@") ? element?.key?.substring(1) : element?.type) })
                } else {
                    rs.push(element)
                }
            }
        });
        return rs;
    }
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    useEffect(() => {
        if (bieuMau?.thanhPhan) {

            console.log(bieuMau?.thanhPhan);
        }
    }, [bieuMau]);
    return (
        <div>

            <FormBuilderIo
                form={formData}
                // onChange={schema => setFormData(schema)}
                onSubmit={(data) => {
                    console.log(data);
                }}
                saveForm={(data) => setFormData(data)}
                saveText="Save Form"
                options={states.getComponentFormIO()}

                onSubmitDone={(data) => console.log(data)}
            />
            <div style={{ display: "none" }}>
                <div id="formio-result" />
            </div>
            <div className='flex justify-center' >
                <Button className='btn-success' type="primary" size="large" disabled={sending} onClick={handleSave}>
                    <span style={{ display: sending ? 'inherit' : 'none' }}>
                        <CircularProgress className="span-sender" />
                    </span>
                    <SaveIcon className='f-28 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                    Lưu biểu mẫu
                </Button>

            </div>



        </div>
    );
};

export default EditForm;
