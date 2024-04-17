import React, { useState } from 'react'

import { FormBuilder as FormBuilderIo, Formio, FormEdit, Components } from "react-formio";
import "react-form-builder2/dist/app.css";
import "formiojs/dist/formio.full.css";
import { Button, ConfigProvider } from 'antd';
import states from 'app/states/States';

import SaveIcon from '@mui/icons-material/Save';
const EditForm = () => {
    const [formData, setFormData] = useState({
        display: "form",
        components: [{
            "html": "<h4><strong>PHIẾU KHẢO SÁT VỀ VIỆC...</strong></h4><p>Nhầm nâng cao chất lượng sản phẩm và dịch vụ, nay công ty chúng tôi ...</p>",
            "label": "Giới thiệu",
            "customClass": "Class-menu-default",
            "refreshOnChange": false,
            "key": "content",
            "type": "content",
            "input": false,
            "tableView": false
        },
        {
            "label": "Họ và tên",
            "placeholder": "Họ và tên người khảo sát",
            "validate": {
                "required": true
            },
            "errorLabel": "Bắt buộc nhập họ và tên",
            "type": "textfield",
            "input": true,
            "key": "textField1",
            "tableView": true
        },
        {
            "label": "Số điện thoại/Email",
            "placeholder": "Nhập số điện thoại hoặc email của bạn",
            "description": "Hoặc bất kỳ thông tin liên hệ khác",
            "tooltip": "Giúp chúng tôi có thể liên hệ với bạn",
            "validate": {
                "required": true
            },
            "type": "textfield",
            "input": true,
            "key": "textField",
            "tableView": true
        }],

    });

    const printResult = () => {
        Formio.createForm(document.getElementById("formio-result"), {
            components: formData?.components
        }).then((form) => {
            console.log(form.component);
            form.on("submit", (data) => console.log("submit", data));
        });
    };

    const handleSave = () => {
        printResult()
    }
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
            <div className='flex justify-center' onClick={handleSave}>
                <Button className='btn-success' type="primary" size="large"><SaveIcon className='f-28 c-white me-2' />Lưu biểu mẫu</Button>

            </div>



        </div>
    );
};

export default EditForm;
