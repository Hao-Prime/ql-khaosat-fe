import React, { useEffect, useState } from 'react'

import { FormBuilder as FormBuilderIo, Formio, FormEdit } from "react-formio";
import "react-form-builder2/dist/app.css";
import "formiojs/dist/formio.full.css";
import { Button, ConfigProvider, Modal, message } from 'antd';
import states from 'app/states/States';
import { Components } from 'formiojs';
import SaveIcon from '@mui/icons-material/Save';
import Services from 'app/services';
import { CircularProgress } from '@mui/material';
import Loading from 'app/components/Loading';
import SapXep from 'app/common/SapXep';

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
    const [listCauHoi, setListCauHoi] = useState([])
    const [listNhomDoiTuong, setListNhomDoiTuong] = useState([])
    const [listDoiTuongKS, setListDoiTuongKS] = useState([])
    const [loading, setLoading] = useState(true)
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
                if (element.key?.includes("dataGrid")) {
                    rs.push({ ...element, components: generateKey(element?.components), key: generateRandomString(20) + "-" + element.key })

                } else {
                    rs.push({ ...element, components: generateKey(element?.components) })

                }
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
        }

    }, [bieuMau]);
    useEffect(() => {
        reLoadList()
    }, []);
    function reLoadList() {
        setLoading(true)
        // Services.getDoiTuongKhaoSatService().getAll("").then(
        //     (res) => {
        //         if (res?.data) {
        //             setListDoiTuongKS(SapXep?.sapXepTheoObjectAtr(res?.data, "stt", 1))
        //         }
        //     }
        // )
        addKeyFieldToAllComponents();
    }
    const handleSaveComponent = (component) => {
        // let mauCauHoi = listCauHoi?.find(e => e?._id == component?.mauCauHoi)

        // if (component && component.mauQuestion) {
        //     component.questions = listDoiTuongKS && listDoiTuongKS
        //         ? listDoiTuongKS?.filter((e) => e?.nhomDoiTuong?._id == component.mauQuestion)?.map(obj => {
        //             return { label: obj.ten, value: obj._id };
        //         })
        //         : component.questions;
        // }
        // if (component && component.mauCauHoi && component.key && component.key.length < 20) {
        //     component.key = (mauCauHoi && mauCauHoi._id ? mauCauHoi._id : '') + "-" + (component.key || '');
        //     component.values = mauCauHoi && mauCauHoi.giaTri ? mauCauHoi.giaTri : component.values;
        //     component.label = mauCauHoi && mauCauHoi.ten ? mauCauHoi.ten : component.label;

        // }

        setFormData((prevFormData) => {
            const updatedComponents = prevFormData.components.map((comp) =>
                comp.key === component.key ? component : comp
            );
            return { ...prevFormData, components: updatedComponents };
        });

        console.log("Component đã được lưu:", component);
        return component;
    };

    const addKeyFieldToAllComponents = async () => {
        let listCauHoiRS = await Services.getNoiDungKhaoSatService().getAll("");
        setListCauHoi(listCauHoiRS?.data);
        let listNhomDoiTuongRS = await Services.getNhomDoiTuongService().getAll("");
        setListNhomDoiTuong(listNhomDoiTuongRS?.data);
        let listDoiTuongKSRS = (await Services.getDoiTuongKhaoSatService().getAll(""))?.data;
        setListDoiTuongKS(listDoiTuongKSRS);

        const componentNames = Object.keys(Components.components);
        componentNames.forEach((componentName) => {
            const component = Components.components[componentName];
            if (component.editForm) {
                const originalEditForm = component.editForm;
                component.editForm = function (builder, options) {
                    const editForm = originalEditForm(builder, options);
                    const hasKeyField = editForm.components.some(
                        (field) => field.key === 'key'
                    );

                    if (!hasKeyField && (component.type === 'survey' || component.type.includes('select'))) {
                        editForm.components.unshift({
                            type: 'select',
                            key: 'mauQuestion',
                            label: 'Chọn danh mục nhóm đối tượng',
                            placeholder: 'Chọn danh mục nhóm đối tượng khảo sát',
                            tooltip: 'Vào danh mục -> Thiết kế biểu mẫu -> Quản lý nhóm đối tượng khảo sát',
                            data: {
                                values: listNhomDoiTuongRS?.data?.map(obj => ({
                                    label: obj?.ten,
                                    value: obj?._id
                                }))
                            },
                            dataSrc: 'values',
                            valueProperty: 'value',
                            labelProperty: 'label',
                            input: true,
                            validate: {
                                required: false,
                            },
                            weight: -20,
                            onChange: function (selectedValue) {
                                if (selectedValue.data.type.includes('select')) {
                                    if (selectedValue.data && selectedValue.data.mauQuestion) {
                                        let rs = (listDoiTuongKSRS && listDoiTuongKSRS.length > 0)
                                            ? listDoiTuongKSRS.filter((e) => e.nhomDoiTuong && e.nhomDoiTuong._id == selectedValue.data.mauQuestion)
                                                .map(obj => {
                                                    return { label: obj.ten, value: obj._id };
                                                }) : selectedValue.data.data.values
                                        console.log(rs);
                                        selectedValue.data.data.values = rs
                                        if(!selectedValue.data.key?.includes("_selectdoiTuong")){
                                            selectedValue.data.key =selectedValue.data.key + "_selectdoiTuong";
                                        }
                                    }else {
                                        selectedValue.data.key.replaceAll("_selectdoiTuong","");
                                    }
                                } else if (selectedValue.data && selectedValue.data.mauQuestion) {
                                    selectedValue.data.questions = (listDoiTuongKSRS && listDoiTuongKSRS.length > 0)
                                        ? listDoiTuongKSRS.filter((e) => e.nhomDoiTuong && e.nhomDoiTuong._id == selectedValue.data.mauQuestion)
                                            .map(obj => {
                                                return { label: obj.ten, value: obj._id };
                                            })
                                        : selectedValue.data.questions;
                                }
                            },
                        });
                    }

                    if (!hasKeyField) {
                        editForm.components.push({
                            type: 'textfield',
                            key: 'key',
                            label: 'Key',
                            placeholder: 'Nhập một key duy nhất',
                            input: true,
                            weight: 100,
                        });

                        editForm.components.unshift({
                            type: 'select',
                            key: 'mauCauHoi',
                            label: 'Chọn từ câu hỏi/nội dung mẫu',
                            placeholder: 'Chọn các câu hỏi/nội dung mẫu đã tạo',
                            tooltip: 'Vào danh mục -> Thiết kế biểu mẫu -> Quản lý nội dung/câu hỏi',
                            data: {
                                values: listCauHoiRS?.data?.map(obj => ({
                                    label: obj?.nhomDoiTuong?.ten + " - " + obj?.ten,
                                    value: obj?._id
                                }))
                            },
                            dataSrc: 'values',
                            valueProperty: 'value',
                            labelProperty: 'label',
                            input: true,
                            validate: {
                                required: false, // Mặc định yêu cầu
                            },
                            onChange: function (selectedValue) {
                                let mauCauHoi = listCauHoiRS?.data.find(e => e?._id == selectedValue.data?.mauCauHoi)
                                if (selectedValue && selectedValue.data && selectedValue.data.values) {
                                    selectedValue.data.values = mauCauHoi && mauCauHoi.giaTri ? mauCauHoi.giaTri : selectedValue.data.values;
                                    selectedValue.data.key = (mauCauHoi && mauCauHoi._id ? mauCauHoi._id : '') + "-" + (selectedValue.data.type);
                                    selectedValue.data.label = mauCauHoi && mauCauHoi.ten ? mauCauHoi.ten : selectedValue.data.label;
                                }else  if (selectedValue && selectedValue.data) {
                                    selectedValue.data.key = (mauCauHoi && mauCauHoi._id ? mauCauHoi._id : '') + "-" + (selectedValue.data.type);
                                    selectedValue.data.label = mauCauHoi && mauCauHoi.ten ? mauCauHoi.ten : selectedValue.data.label;
                                }
                            },
                            weight: -20,
                        });
                    }

                    return editForm;
                };
            }
        });
        setLoading(false);
    };
    return (
        <div>{
            loading ? <Loading /> :
                <>
                    <FormBuilderIo
                        form={formData}
                        // onChange={schema => setFormData(schema)}
                        onSubmit={(data) => {
                            console.log(data);
                        }}
                        saveForm={(data) => setFormData(data)}
                        saveText="Save Form"
                        options={states.getComponentFormIO()}
                        onSaveComponent={handleSaveComponent}
                        onSubmitDone={(data) => console.log(data)}
                    />
                    <div style={{ display: "none" }}>
                        <div id="formio-result" />
                    </div>
                    <div className='flex justify-center' >
                        <Button className='btn-success mt-2' type="primary" size="large" disabled={sending} onClick={handleSave}>
                            <span style={{ display: sending ? 'inherit' : 'none' }}>
                                <CircularProgress className="span-sender" />
                            </span>
                            <SaveIcon className='f-28 c-white me-2' style={{ display: sending ? 'none' : 'inline-block' }} />
                            Lưu biểu mẫu
                        </Button>

                    </div>
                </>
        }






        </div>
    );
};

export default EditForm;
