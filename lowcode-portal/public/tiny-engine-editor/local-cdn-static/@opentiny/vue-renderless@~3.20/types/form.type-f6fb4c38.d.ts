import { StyleValue, ExtractPropTypes, ComponentPublicInstance } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils, ITinyVm } from './shared.type.js';

declare const formProps: {
    model: ObjectConstructor;
    rules: ObjectConstructor;
    inlineMessage: {
        type: BooleanConstructor;
        default: undefined;
    };
    messageType: StringConstructor;
    statusIcon: BooleanConstructor;
    showMessage: {
        type: BooleanConstructor;
        default: boolean;
    };
    validatePosition: {
        type: StringConstructor;
        default: string;
    };
    size: StringConstructor;
    disabled: BooleanConstructor;
    validateOnRuleChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideRequiredAsterisk: {
        type: BooleanConstructor;
        default: undefined;
    };
    labelPosition: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    labelWidth: {
        type: StringConstructor;
        default: string;
    };
    labelAlign: {
        type: BooleanConstructor;
        default: boolean;
    };
    contentOffset: NumberConstructor;
    labelSuffix: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    responsiveLayout: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateType: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    validateIcon: ObjectConstructor;
    manual: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: undefined;
    };
    popperOptions: {
        type: ObjectConstructor;
        default: () => {};
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAutoWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    showEmptyValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateTag: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapFragment: {
        type: StringConstructor;
        default: string;
    };
    tooltipConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const $constants: {
    FORM_NAME: string;
    FORM_ITEM_NAME: string;
};
declare const formItemProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            FORM_NAME: string;
            FORM_ITEM_NAME: string;
        };
    };
    appendToBody: {
        type: BooleanConstructor;
        default: undefined;
    };
    error: {
        type: StringConstructor;
        default: string;
    };
    for: StringConstructor;
    inlineMessage: {
        type: BooleanConstructor;
        default: undefined;
    };
    messageType: StringConstructor;
    label: StringConstructor;
    labelWidth: StringConstructor;
    manual: BooleanConstructor;
    popperOptions: {
        type: ObjectConstructor;
        default: () => {};
    };
    prop: StringConstructor;
    required: {
        type: BooleanConstructor;
        default: undefined;
    };
    rules: (ObjectConstructor | ArrayConstructor)[];
    showMessage: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: StringConstructor;
    tipContent: StringConstructor;
    validateDisabled: BooleanConstructor;
    validateDebounce: BooleanConstructor;
    validatePosition: StringConstructor;
    validateStatus: StringConstructor;
    validateType: StringConstructor;
    validateIcon: ObjectConstructor;
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    extra: StringConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const watchError: (state: IFormItemRenderlessParams['state']) => (value: string) => void;
declare const watchValidateStatus: (state: IFormItemRenderlessParams['state']) => (value: IFormItemValidateStatus) => void;
declare const computedGetValidateType: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => string;
declare const computedValidateIcon$1: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => object | null;
declare const computedIsErrorInline$1: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => boolean;
declare const computedIsErrorBlock$1: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => boolean;
declare const computedLabelStyle: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => IFormItemLabelStyle;
declare const computedValueStyle: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => {
    width: string;
};
declare const computedContentStyle: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => StyleValue;
declare const computedForm: ({ constants, vm, state }: Pick<IFormItemRenderlessParams, 'constants' | 'vm' | 'state'>) => () => IFormInstance | null;
declare const computedIsRequired: ({ api, state }: Pick<IFormItemRenderlessParams, 'api' | 'state'>) => () => boolean;
declare const computedFieldValue: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => any;
declare const mounted: ({ api, vm, props, state }: Pick<IFormItemRenderlessParams, 'api' | 'vm' | 'props' | 'state'>) => () => void;
declare const unmounted: ({ api, vm, state }: Pick<IFormItemRenderlessParams, 'api' | 'vm' | 'state'>) => () => void;
declare const validate$1: ({ api, props, state, t }: Pick<IFormItemRenderlessParams, 'api' | 'props' | 'state' | 't'>) => (trigger: IFormItemTrigger, callback?: Function) => void;
declare const clearValidate$1: (state: IFormItemRenderlessParams['state']) => () => void;
declare const resetField: ({ api, nextTick, props, state }: Pick<IFormItemRenderlessParams, 'api' | 'nextTick' | 'props' | 'state'>) => () => void;
/**
 * @description 获取本表单项的校验规则
 * 来源有可能有3处：form中rules,form-item中的rules以及form-item配置了required属性
 */
declare const getRules: ({ props, state }: Pick<IFormItemRenderlessParams, 'props' | 'state'>) => () => IFormItemRule[];
/**
 * @description 根据trigger来筛选符合条件和检验规则。此处的规则进行了一层浅拷贝处理。
 * 因为valide中使用会delete掉其中的trigger属性。
 * 不传或者传空字符串，则默认返回所有规则。
 * @param {trigger} target 触发检验规则
 * @returns {Array} 符合条件的检验规则
 */
declare const getFilteredRule: (api: IFormItemRenderlessParams['api']) => (trigger: IFormItemTrigger) => IFormItemRule[];
declare const onFieldBlur: (api: IFormItemRenderlessParams['api']) => () => void;
declare const onFieldChange: ({ api, state }: Pick<IFormItemRenderlessParams, 'api' | 'state'>) => () => void;
declare const updateComputedLabelWidth: (state: IFormItemRenderlessParams['state']) => (width: number) => void;
declare const addValidateEvents: ({ api, vm, props, state }: Pick<IFormItemRenderlessParams, 'api' | 'vm' | 'props' | 'state'>) => () => void;
declare const removeValidateEvents: (vm: IFormItemRenderlessParams['vm']) => () => void;
declare const updateTip$1: ({ vm, state }: Pick<IFormItemRenderlessParams, 'vm' | 'state'>) => () => void;
/**
 * 目前仅mobile-first模板使用到
 */
declare const handleMouseenter: ({ state }: Pick<IFormItemRenderlessParams, 'state'>) => (e: any) => void;
declare const handleMouseleave: (state: IFormItemRenderlessParams['state']) => () => void;
declare const getDisplayedValue: ({ state }: Pick<IFormItemRenderlessParams, 'state'>) => (param: IFormItemDisplayedValueParam) => void;
declare const clearDisplayedValue: ({ state }: Pick<IFormItemRenderlessParams, 'state'>) => () => void;

interface IFormItemDisplayedValueParam {
    type: string;
    val: string;
}
type IFormItemValidateStatus = 'validating' | 'success' | 'error';
type IFormItemTrigger = 'blur' | 'change' | '';
interface IFormItemLabelStyle {
    width: string;
}
interface IFormItemRule {
    required?: boolean;
    message?: string;
    trigger?: IFormItemTrigger | IFormItemTrigger[];
    validator?: Function;
}
interface IFormItemState {
    mode: string;
    validateState: string;
    validateMessage: string;
    validateDisabled: boolean;
    validator: object;
    isNested: boolean;
    computedLabelWidth: string;
    initialValue: any;
    canShowTip: boolean;
    validationRequired: boolean;
    validateType: string;
    tooltip: string;
    displayedValue: string;
    isBasicComp: boolean;
    showTooltip: boolean;
    typeName: string;
    formInstance: IFormInstance;
    labelFor: string;
    labelStyle: IFormItemLabelStyle;
    valueStyle: StyleValue;
    contentStyle: StyleValue;
    form: IFormInstance;
    fieldValue: any;
    isRequired: boolean;
    formInline: boolean | undefined;
    formSize: string | undefined;
    formItemSize: string | undefined;
    isDisplayOnly: boolean;
    labelPosition: string;
    hideRequiredAsterisk: boolean;
    labelSuffix: string;
    labelWidth: string;
    showMessage: boolean;
    sizeClass: string | undefined;
    getValidateType: string;
    validateIcon: object | null;
    isErrorInline: boolean;
    isErrorBlock: boolean;
    tooltipType: string;
    isMultiple: boolean;
}
type IFormItemConstants = typeof $constants;
type IFormItemProps = ExtractPropTypes<typeof formItemProps>;
type IFormItemRenderlessParams = ISharedRenderlessFunctionParams<IFormItemConstants> & {
    state: IFormItemState;
    props: IFormItemProps;
    api: IFormItemApi;
    instance: IFormItemInstance;
    validateFunc: Function;
};
interface IFormItemApi {
    state: IFormItemState;
    dispatch: ISharedRenderlessParamUtils['dispatch'];
    broadcast: ISharedRenderlessParamUtils['broadcast'];
    watchError: ReturnType<typeof watchError>;
    updateTip: ReturnType<typeof updateTip$1>;
    watchValidateStatus: ReturnType<typeof watchValidateStatus>;
    computedLabelStyle: ReturnType<typeof computedLabelStyle>;
    computedValueStyle: ReturnType<typeof computedValueStyle>;
    computedContentStyle: ReturnType<typeof computedContentStyle>;
    computedForm: ReturnType<typeof computedForm>;
    computedFieldValue: ReturnType<typeof computedFieldValue>;
    computedGetValidateType: ReturnType<typeof computedGetValidateType>;
    computedValidateIcon: ReturnType<typeof computedValidateIcon$1>;
    computedIsErrorInline: ReturnType<typeof computedIsErrorInline$1>;
    computedIsErrorBlock: ReturnType<typeof computedIsErrorBlock$1>;
    clearValidate: ReturnType<typeof clearValidate$1>;
    getRules: ReturnType<typeof getRules>;
    updateComputedLabelWidth: ReturnType<typeof updateComputedLabelWidth>;
    removeValidateEvents: ReturnType<typeof removeValidateEvents>;
    unmounted: ReturnType<typeof unmounted>;
    mounted: ReturnType<typeof mounted>;
    computedIsRequired: ReturnType<typeof computedIsRequired>;
    resetField: ReturnType<typeof resetField>;
    getFilteredRule: ReturnType<typeof getFilteredRule>;
    onFieldBlur: ReturnType<typeof onFieldBlur>;
    onFieldChange: ReturnType<typeof onFieldChange>;
    addValidateEvents: ReturnType<typeof addValidateEvents>;
    validate: ReturnType<typeof validate$1>;
    getDisplayedValue: ReturnType<typeof getDisplayedValue>;
    clearDisplayedValue: ReturnType<typeof clearDisplayedValue>;
    handleMouseenter: ReturnType<typeof handleMouseenter>;
    handleMouseleave: ReturnType<typeof handleMouseleave>;
}
type IFormItemRenderlessParamUtils = ISharedRenderlessParamUtils<IFormItemConstants>;
type IFormItemInstance = ITinyVm<IFormItemConstants> & IFormItemProps & IFormItemApi;

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const watchRules: ({ api, props, state }: Pick<IFormRenderlessParams, 'api' | 'props' | 'state'>) => (newRules?: {}, oldRules?: {}) => void;
declare const computedAutoLabelWidth: ({ state }: Pick<IFormRenderlessParams, 'state'>) => () => string;
declare const computedHideRequiredAsterisk: ({ props, designConfig }: Pick<IFormRenderlessParams, 'props' | 'designConfig'>) => () => boolean;
declare const computedValidateIcon: ({ props, designConfig }: Pick<IFormRenderlessParams, 'props' | 'designConfig'>) => () => object | null;
declare const computedIsErrorInline: ({ props, designConfig }: Pick<IFormRenderlessParams, 'props' | 'designConfig'>) => () => boolean;
declare const computedIsErrorBlock: ({ props, designConfig }: Pick<IFormRenderlessParams, 'props' | 'designConfig'>) => () => boolean;
declare const created: ({ parent, state }: Pick<IFormRenderlessParams, 'parent' | 'state'>) => () => void;
declare const resetFields: ({ props, state }: Pick<IFormRenderlessParams, 'props' | 'state'>) => () => void;
declare const updateTip: ({ props, state }: Pick<IFormRenderlessParams, 'props' | 'state'>) => () => void;
declare const clearValidate: (state: IFormRenderlessParams['state']) => (props?: string | string[]) => void;
declare const validate: ({ props, state }: Pick<IFormRenderlessParams, 'props' | 'state'>) => (callback?: ((valid: boolean, invalidFields?: any) => void) | undefined) => Promise<boolean> | void;
declare const validateField: (state: IFormRenderlessParams['state']) => (props: any, cb: any) => void;
declare const getLabelWidthIndex: (state: IFormRenderlessParams['state']) => (width: number) => number;
declare const registerLabelWidth: ({ api, state }: Pick<IFormRenderlessParams, 'api' | 'state'>) => (val: number, oldVal: number) => void;
declare const deregisterLabelWidth: ({ api, state }: Pick<IFormRenderlessParams, 'api' | 'state'>) => (val: number) => void;
declare const showTooltip: ({ vm, state }: Pick<IFormRenderlessParams, 'vm' | 'state'>) => (dom: HTMLElement, val: string) => void;
declare const hideTooltip: ({ state }: Pick<IFormRenderlessParams, 'state'>) => () => void;

interface IFormRules {
    [prop: string]: IFormItemRule;
}
interface IFormState {
    showAutoWidth: boolean;
    fields: IFormItemInstance[];
    timer: number;
    tooltipVisible: boolean;
    displayedValue: string;
    potentialLabelWidthArr: number[];
    autoLabelWidth: string;
    isDisplayOnly: boolean;
    hasRequired: boolean;
    hideRequiredAsterisk: boolean;
    validateIcon: object | null;
    isErrorInline: boolean;
    isErrorBlock: boolean;
    labelWidth: string;
    tooltipType: string;
}
type IFormProps = ExtractPropTypes<typeof formProps>;
type IFormRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IFormState;
    props: IFormProps;
    api: IFormApi;
    dialog: ITinyVm | null;
};
interface IFormApi {
    state: IFormState;
    updateTip: ReturnType<typeof updateTip>;
    computedAutoLabelWidth: ReturnType<typeof computedAutoLabelWidth>;
    computedHideRequiredAsterisk: ReturnType<typeof computedHideRequiredAsterisk>;
    computedValidateIcon: ReturnType<typeof computedValidateIcon>;
    computedIsErrorInline: ReturnType<typeof computedIsErrorInline>;
    computedIsErrorBlock: ReturnType<typeof computedIsErrorBlock>;
    created: ReturnType<typeof created>;
    resetFields: ReturnType<typeof resetFields>;
    clearValidate: ReturnType<typeof clearValidate>;
    validate: ReturnType<typeof validate>;
    validateField: ReturnType<typeof validateField>;
    getLabelWidthIndex: ReturnType<typeof getLabelWidthIndex>;
    registerLabelWidth: ReturnType<typeof registerLabelWidth>;
    deregisterLabelWidth: ReturnType<typeof deregisterLabelWidth>;
    watchRules: ReturnType<typeof watchRules>;
    showTooltip: ReturnType<typeof showTooltip>;
    hideTooltip: ReturnType<typeof hideTooltip>;
}
type IFormRenderlessParamUtils = ISharedRenderlessParamUtils<never>;
type IFormInstance = ComponentPublicInstance & IFormProps & IFormApi;

export { IFormItemDisplayedValueParam as I, IFormItemValidateStatus as a, IFormItemTrigger as b, IFormItemLabelStyle as c, IFormItemRule as d, IFormItemState as e, IFormItemConstants as f, IFormItemProps as g, IFormItemRenderlessParams as h, IFormItemApi as i, IFormItemRenderlessParamUtils as j, IFormItemInstance as k, IFormRules as l, IFormState as m, IFormProps as n, IFormRenderlessParams as o, IFormApi as p, IFormRenderlessParamUtils as q, IFormInstance as r };
