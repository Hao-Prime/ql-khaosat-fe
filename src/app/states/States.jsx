
var display = [

    { key: 'prefix', ignore: true, },
    { key: 'suffix', ignore: true, },
    { key: 'widget.type', ignore: true, },
    { key: 'inputMask', ignore: true, },
    { key: 'applyMaskOn', ignore: true, },
    { key: 'customClass', ignore: true, },
    { key: 'tabindex', ignore: true, },
    { key: 'hidden', ignore: true, },
    { key: 'hideLabel', ignore: true, },
    { key: 'autofocus', ignore: true, },
    { key: 'dataGridLabel', ignore: true, },
    { key: 'disabled', ignore: true, },
    { key: 'autocomplete', ignore: true, },
    { key: 'modalEdit', ignore: true, },
    { key: 'displayMask', ignore: true, },
    { key: 'allowMultipleMasks', ignore: true, },
    { key: 'showWordCount', ignore: true, },
    { key: 'showCharCount', ignore: true, },
    { key: 'mask', ignore: true, },
    { key: 'spellcheck', ignore: true, },
    { key: 'tableView', ignore: true, },
    { key: 'inputMaskPlaceholderChar', ignore: true, },


]
var validation = [

    { key: 'validate.minLength', ignore: true, },
    { key: 'validate.maxLength', ignore: true, },
    { key: 'validate.minWords', ignore: true, },
    { key: 'validate.maxWords', ignore: true, },
    { key: 'validate.pattern', ignore: true, },
    { key: 'validate.required', ignore: true, },
    { key: 'unique', ignore: true, },
    { key: 'validateOn', ignore: true, },
    { key: 'errorLabel', ignore: true, },
    { key: 'validate.customMessage', ignore: true, },
    { key: 'custom-validation-js', ignore: true, },
    { key: 'json-validation-json', ignore: true, },
    { key: 'errors', ignore: true, },
    { key: 'kickbox', ignore: true, }

]
var hiddenDefault = [
    // { key: 'display', components: display },
    { key: 'data', ignore: true, },
    { key: 'api', ignore: true, },
    // { key: 'validation', components: validation },
    { key: 'conditional', ignore: true, },
    { key: 'logic', ignore: true, },
    { key: 'layout', ignore: true, },
    { key: 'tabs', ignore: true, },
]
var hiddenDefault_2 = [

    { key: 'api', ignore: true, },
    { key: 'conditional', ignore: true, },
    { key: 'logic', ignore: true, },
    { key: 'layout', ignore: true, },
    { key: 'tabs', ignore: true, },
]
const getComponentFormIO = () => {

    return {
        builder: {
            basic: false,
            advanced: false,
            data: false,
            customBasic: {
                title: 'Thành phần',
                default: true,
                weight: 0,
                components: {
                    hoTen: {
                        title: 'Họ Và Tên',
                        key: '@hoTen',
                        icon: 'terminal',
                        schema: {
                            label: 'Họ Và Tên',
                            type: 'textfield',
                            key: '@hoTen',
                            input: true,

                        },

                    },
                    phoneNumber: {
                        title: 'Số điện thoại',
                        key: '@soDienThoai',
                        icon: 'phone-square',
                        schema: {
                            label: 'Số Điện Thoại',
                            type: 'phoneNumber',
                            key: '@soDienThoai',
                            input: true,

                        },

                    },
                    email: {
                        title: 'Email',
                        key: '@emailuser',
                        icon: 'at',
                        schema: {
                            label: 'Email',
                            type: 'email',
                            key: '@emailuser',
                            input: true,

                        },

                    },
                    danToc: {
                        title: 'Dân tộc',
                        key: '@danToc-select',
                        icon: 'th-list',
                        "schema": {
                            "label": "Dân tộc",
                            "type": "select",
                            "key": "@danToc-select",
                            "dataSrc": "custom",
                            "data": {
                                custom: `var script = document.createElement('script');
                                    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
                                    script.type = 'text/javascript';
                                    document.getElementsByTagName('head')[0].appendChild(script);

                                    function getCookie(name) {
                                        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                                        return v ? v[2] : null;
                                    }

                                    var requestURL = 'https://apidemo.vnptigate.vn/ba/ethnic/name/--limit';


                                    $.ajax({ 
                                            type: 'GET', 
                                            headers: {
                                                
                                            },
                                            url: requestURL, 
                                            data: {
                                            }, 
                                            contentType: "application/json; charset=utf-8",
                                            dataType: 'json',
                                            success: function (data) { 
                                                $.each(data, function(index, value) {
                                                    values.push({ label: value.name, value: value.id });
                                                });
                                            }, 
                                            error: function(){
                                                console.log("Error");
                                                }
                                            , 
                                            async: false
                                        });
                                    `}
                        },

                    },
                    textfield: true,
                    textarea: true,
                    number: true,
                    checkbox: true,
                    selectboxes: true,
                    select: true,
                    radio: true,
                    datetime: true,
                    currency:true,
                    survey:true,
                    datagrid:true
                    // button: true,
                }
            },
            layout: {
                title: 'Giao diện',
                weight: 0,
                components: {
                    // content: true,
                    // container: true,
                    // columns: true,
                    content: {
                        title: 'Nhãn - nội dung',
                        key: '@content',
                        icon: 'html5',
                        schema: {
                            label: 'Nhãn - nội dung',
                            type: 'content',
                            key: '@content',
                            input: true,

                        },

                    },
                    container: {
                        title: 'Trang',
                        key: '@container',
                        icon: 'folder-open',
                        schema: {
                            label: 'Trang',
                            type: 'container',
                            key: '@container',
                            input: true,

                        },

                    },
                    columns: {
                        title: 'Bảng - cột',
                        key: '@columns',
                        icon: 'columns',
                        schema: {
                            label: 'Bảng - cột',
                            type: 'columns',
                            key: '@columns',
                            input: true,

                        },

                    },
                    tabs: true,
                    htmlelement: false,
                    fieldset: false,
                    panel: false,
                    table: false,
                    well: false,
                },
                editor: 'quill',
            },
            premium: {
                ignore: true,

            }

        },
        editForm: {
            textfield: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'unique', ignore: true, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.minLength', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        ...validation
                    ]
                },

            ],
            textarea: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        ...validation
                    ]
                },
            ],
            email: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'unique', ignore: true, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        ...validation
                    ]
                },
            ],
            phoneNumber: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'unique', ignore: true, },
                        { key: 'errorLabel', ignore: false, },
                        ...validation
                    ]
                },
            ],
            number: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'validate.minLength', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.pattern', ignore: true, },
                        { key: 'validateOn', ignore: true, },
                        { key: 'errorLabel', ignore: true, },
                        { key: 'validate.customMessage', ignore: true, },
                        { key: 'custom-validation-js', ignore: true, },
                        { key: 'json-validation-json', ignore: true, },
                        { key: 'errors', ignore: true, },
                    ]
                },
            ],
            checkbox: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'inputType', ignore: true, },
                        ...validation
                    ]
                },
            ],
            selectboxes: [
                ...hiddenDefault_2,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.onlyAvailableItems', ignore: true, },
                        { key: 'validate.minSelectedCount', ignore: true, },
                        { key: 'validate.maxSelectedCount', ignore: true, },
                        { key: 'minSelectedCountMessage', ignore: true, },
                        { key: 'maxSelectedCountMessage', ignore: true, },
                        ...validation
                    ]
                }, {
                    key: 'data', components: [
                        { key: 'dataSrc', ignore: true, },
                        { key: 'data.url', ignore: true, },
                        { key: 'data.headers', ignore: true, },
                        { key: 'valueProperty', ignore: true, },
                        { key: 'template', ignore: true, },
                        { key: 'authenticate', ignore: true, },
                        { key: 'persistent', ignore: true, },
                        { key: 'protected', ignore: true, },
                        { key: 'dbIndex', ignore: true, },
                        { key: 'encrypted', ignore: true, },
                        { key: 'redrawOn', ignore: true, },
                        { key: 'calculateServer', ignore: true, },
                        { key: 'allowCalculateOverride', ignore: true, },
                        { key: 'clearOnHide', ignore: true, },
                        { key: 'calculateValue', ignore: true, },
                        { key: 'customDefaultValue', ignore: true, },
                    ]
                },

            ],
            select: [
                ...hiddenDefault_2,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.onlyAvailableItems', ignore: true, },
                        { key: 'validate.minSelectedCount', ignore: true, },
                        { key: 'validate.maxSelectedCount', ignore: true, },
                        { key: 'minSelectedCountMessage', ignore: true, },
                        { key: 'maxSelectedCountMessage', ignore: true, },
                        ...validation
                    ]
                }, {
                    key: 'data', components: [
                        { key: 'dataSrc', ignore: true, },
                        { key: 'data.url', ignore: true, },
                        { key: 'data.headers', ignore: true, },
                        { key: 'valueProperty', ignore: true, },
                        { key: 'template', ignore: true, },
                        { key: 'authenticate', ignore: true, },
                        { key: 'persistent', ignore: true, },
                        { key: 'protected', ignore: true, },
                        { key: 'dbIndex', ignore: true, },
                        { key: 'encrypted', ignore: true, },
                        { key: 'redrawOn', ignore: true, },
                        { key: 'calculateServer', ignore: true, },
                        { key: 'allowCalculateOverride', ignore: true, },
                        { key: 'clearOnHide', ignore: true, },
                        { key: 'calculateValue', ignore: true, },
                        { key: 'customDefaultValue', ignore: true, },
                        { key: 'dataType', ignore: true, },
                        { key: 'idPath', ignore: true, },
                        { key: 'refreshOn', ignore: true, },
                        { key: 'selectThreshold', ignore: true, },
                        { key: 'readOnlyValue', ignore: true, },
                        { key: 'customOptions', ignore: true, },
                        { key: 'useExactSearch', ignore: true, },
                        { key: 'refreshOnBlur', ignore: true, },
                        { key: 'clearOnRefresh', ignore: true, },


                    ]
                },

            ],
            radio: [
                ...hiddenDefault_2,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.onlyAvailableItems', ignore: true, },
                        { key: 'validate.minSelectedCount', ignore: true, },
                        { key: 'validate.maxSelectedCount', ignore: true, },
                        { key: 'minSelectedCountMessage', ignore: true, },
                        { key: 'maxSelectedCountMessage', ignore: true, },
                        ...validation
                    ]
                }, {
                    key: 'data', components: [
                        { key: 'dataSrc', ignore: true, },
                        { key: 'data.url', ignore: true, },
                        { key: 'data.headers', ignore: true, },
                        { key: 'valueProperty', ignore: true, },
                        { key: 'template', ignore: true, },
                        { key: 'authenticate', ignore: true, },
                        { key: 'persistent', ignore: true, },
                        { key: 'protected', ignore: true, },
                        { key: 'dbIndex', ignore: true, },
                        { key: 'encrypted', ignore: true, },
                        { key: 'redrawOn', ignore: true, },
                        { key: 'calculateServer', ignore: true, },
                        { key: 'allowCalculateOverride', ignore: true, },
                        { key: 'clearOnHide', ignore: true, },
                        { key: 'calculateValue', ignore: true, },
                        { key: 'customDefaultValue', ignore: true, },
                    ]
                },

            ],
            datetime: [
                ...hiddenDefault,
                {
                    key: 'display', components: [
                        { key: 'shortcutButtons', ignore: true, },
                        { key: 'displayInTimezone', ignore: true, },
                        { key: 'useLocaleSettings', ignore: true, },
                        { key: 'allowInput', ignore: false, },
                        ...display,
                    ]
                },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.pattern', ignore: true, },
                        { key: 'unique', ignore: true, },
                        { key: 'validateOn', ignore: true, },
                        { key: 'errorLabel', ignore: true, },
                        { key: 'validate.customMessage', ignore: true, },
                        { key: 'custom-validation-js', ignore: true, },
                        { key: 'json-validation-json', ignore: true, },
                        { key: 'enableMinDateInput', ignore: true, },
                        { key: 'enableMaxDateInput', ignore: true, },
                        { key: 'errors', ignore: true, }
                    ]
                },
                {
                    key: 'data', components: [
                        { key: 'datePicker.disable', ignore: false, },
                    ]
                },
            ],
            content: [
                ...hiddenDefault,
                { key: 'editor', value: 'quill', },
                {
                    key: 'display', components: [
                        { key: 'refreshOnChange', ignore: true, },
                        { key: 'modalEdit', ignore: true, },
                    ]
                },

            ],
            container: [
                ...hiddenDefault,
                { key: 'validation', ignore: true, },
                {
                    key: 'display', components: [
                        { key: 'labelPosition', ignore: true, },
                        { key: 'modalEdit', ignore: true, },
                        { key: 'disabled', ignore: true, },
                        { key: 'tableView', ignore: true, },

                    ]
                },
            ],
            columns: [
                ...hiddenDefault,
                { key: 'validation', ignore: true, },
                {
                    key: 'display', components: [
                        { key: 'labelPosition', ignore: true, },
                        { key: 'modalEdit', ignore: true, },
                        { key: 'disabled', ignore: true, },
                        { key: 'tableView', ignore: true, },
                        { key: 'autoAdjust', ignore: true, },

                    ]
                },
            ],
            tabs: [
                ...hiddenDefault,
                { key: 'validation', ignore: true, },
                {
                    key: 'display', components: [
                        { key: 'labelPosition', ignore: true, },
                        { key: 'modalEdit', ignore: true, },
                        { key: 'disabled', ignore: true, },
                        { key: 'tableView', ignore: true, },

                    ]
                },
            ]
            // button: true,
        }
    }
};
const getComponentFormIONull = () => {

    return {
        builder: {
            basic: false,
            advanced: false,
            data: false,
            customBasic: {
                ignore: true,

            },
            layout: {
                ignore: true,

            },
            premium: {
                ignore: true,

            }

        },
        editForm: {
            textfield: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'unique', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.minLength', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        ...validation
                    ]
                },

            ],
            textarea: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        ...validation
                    ]
                },
            ],
            email: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'unique', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        ...validation
                    ]
                },
            ],
            phoneNumber: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'unique', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        ...validation
                    ]
                },
            ],
            number: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'validate.minLength', ignore: false, },
                        { key: 'validate.maxLength', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.pattern', ignore: true, },
                        { key: 'validateOn', ignore: true, },
                        { key: 'errorLabel', ignore: true, },
                        { key: 'validate.customMessage', ignore: true, },
                        { key: 'custom-validation-js', ignore: true, },
                        { key: 'json-validation-json', ignore: true, },
                        { key: 'errors', ignore: true, },
                    ]
                },
            ],
            checkbox: [
                ...hiddenDefault,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'inputType', ignore: true, },
                        ...validation
                    ]
                },
            ],
            selectboxes: [
                ...hiddenDefault_2,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.onlyAvailableItems', ignore: true, },
                        { key: 'validate.minSelectedCount', ignore: true, },
                        { key: 'validate.maxSelectedCount', ignore: true, },
                        { key: 'minSelectedCountMessage', ignore: true, },
                        { key: 'maxSelectedCountMessage', ignore: true, },
                        ...validation
                    ]
                }, {
                    key: 'data', components: [
                        { key: 'dataSrc', ignore: true, },
                        { key: 'data.url', ignore: true, },
                        { key: 'data.headers', ignore: true, },
                        { key: 'valueProperty', ignore: true, },
                        { key: 'template', ignore: true, },
                        { key: 'authenticate', ignore: true, },
                        { key: 'persistent', ignore: true, },
                        { key: 'protected', ignore: true, },
                        { key: 'dbIndex', ignore: true, },
                        { key: 'encrypted', ignore: true, },
                        { key: 'redrawOn', ignore: true, },
                        { key: 'calculateServer', ignore: true, },
                        { key: 'allowCalculateOverride', ignore: true, },
                        { key: 'clearOnHide', ignore: true, },
                        { key: 'calculateValue', ignore: true, },
                        { key: 'customDefaultValue', ignore: true, },
                    ]
                },

            ],
            select: [
                ...hiddenDefault_2,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.onlyAvailableItems', ignore: true, },
                        { key: 'validate.minSelectedCount', ignore: true, },
                        { key: 'validate.maxSelectedCount', ignore: true, },
                        { key: 'minSelectedCountMessage', ignore: true, },
                        { key: 'maxSelectedCountMessage', ignore: true, },
                        ...validation
                    ]
                }, {
                    key: 'data', components: [
                        { key: 'dataSrc', ignore: true, },
                        { key: 'data.url', ignore: true, },
                        { key: 'data.headers', ignore: true, },
                        { key: 'valueProperty', ignore: true, },
                        { key: 'template', ignore: true, },
                        { key: 'authenticate', ignore: true, },
                        { key: 'persistent', ignore: true, },
                        { key: 'protected', ignore: true, },
                        { key: 'dbIndex', ignore: true, },
                        { key: 'encrypted', ignore: true, },
                        { key: 'redrawOn', ignore: true, },
                        { key: 'calculateServer', ignore: true, },
                        { key: 'allowCalculateOverride', ignore: true, },
                        { key: 'clearOnHide', ignore: true, },
                        { key: 'calculateValue', ignore: true, },
                        { key: 'customDefaultValue', ignore: true, },
                    ]
                },

            ],
            radio: [
                ...hiddenDefault_2,
                { key: 'display', components: display },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.onlyAvailableItems', ignore: true, },
                        { key: 'validate.minSelectedCount', ignore: true, },
                        { key: 'validate.maxSelectedCount', ignore: true, },
                        { key: 'minSelectedCountMessage', ignore: true, },
                        { key: 'maxSelectedCountMessage', ignore: true, },
                        ...validation
                    ]
                }, {
                    key: 'data', components: [
                        { key: 'dataSrc', ignore: true, },
                        { key: 'data.url', ignore: true, },
                        { key: 'data.headers', ignore: true, },
                        { key: 'valueProperty', ignore: true, },
                        { key: 'template', ignore: true, },
                        { key: 'authenticate', ignore: true, },
                        { key: 'persistent', ignore: true, },
                        { key: 'protected', ignore: true, },
                        { key: 'dbIndex', ignore: true, },
                        { key: 'encrypted', ignore: true, },
                        { key: 'redrawOn', ignore: true, },
                        { key: 'calculateServer', ignore: true, },
                        { key: 'allowCalculateOverride', ignore: true, },
                        { key: 'clearOnHide', ignore: true, },
                        { key: 'calculateValue', ignore: true, },
                        { key: 'customDefaultValue', ignore: true, },
                    ]
                },

            ],
            datetime: [
                ...hiddenDefault,
                {
                    key: 'display', components: [
                        { key: 'shortcutButtons', ignore: true, },
                        { key: 'displayInTimezone', ignore: true, },
                        { key: 'useLocaleSettings', ignore: true, },
                        { key: 'allowInput', ignore: false, },
                        ...display,
                    ]
                },
                {
                    key: 'validation', components: [
                        { key: 'validate.required', ignore: false, },
                        { key: 'errorLabel', ignore: false, },
                        { key: 'validate.pattern', ignore: true, },
                        { key: 'unique', ignore: true, },
                        { key: 'validateOn', ignore: true, },
                        { key: 'errorLabel', ignore: true, },
                        { key: 'validate.customMessage', ignore: true, },
                        { key: 'custom-validation-js', ignore: true, },
                        { key: 'json-validation-json', ignore: true, },
                        { key: 'enableMinDateInput', ignore: true, },
                        { key: 'enableMaxDateInput', ignore: true, },
                        { key: 'errors', ignore: true, }
                    ]
                },
                {
                    key: 'data', components: [
                        { key: 'datePicker.disable', ignore: false, },
                    ]
                },
            ],
            content: [
                { key: 'editor', value: 'quill', }
            ]
            // button: true,
        }
    }
};
function getButtonList() {
    return [
        // default
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'math', 'imageGallery'],
        ['-right',  'link'],
        // (min-width: 992)
        ['%992', [
            ['undo', 'redo'],
            [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike'],
            [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
            ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'math']
        ]],
        // (min-width: 767)
        ['%767', [
            ['undo', 'redo'],
            [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
            [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
            [':r-More Rich-default.more_plus', 'table', 'link',  'math'],
            ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
        ]],
        // (min-width: 480)
        ['%480', [
            ['undo', 'redo'],
            [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
            [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
            [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
            [':r-More Rich-default.more_plus', 'table', 'link',  'math'],
            ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
        ]]
    ]
    
}
const states = {
    getComponentFormIO,
    getComponentFormIONull,
    getButtonList
};
export default states;