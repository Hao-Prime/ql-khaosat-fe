
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
                title: 'Basic',
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

                    textfield: true,
                    textarea: true,
                    number: true,
                    checkbox: true,
                    selectboxes: true,
                    select: true,
                    radio: true,
                    datetime: true,
                    // button: true,
                }
            },
            layout: {
                title: 'Layout',
                weight: 0,
                components: {
                    content: true,
                    container: true,
                    columns: true,
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
const states = {
    getComponentFormIO,

};
export default states;