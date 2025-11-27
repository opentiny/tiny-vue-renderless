import { ComputedRef, ExtractPropTypes } from 'vue';
import { PropType } from '@opentiny/vue-common';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    INPUT_PC: string;
    INPUTGROUP_PC: string;
    INPUT_MOBILE: string;
    INPUTGROUP_MOBILE: string;
    Mode: string;
    inputMode(mode: any): any;
    inputGroupMode(mode: any): any;
    VALIDATE_ICON: {
        Validating: string;
        Success: string;
        Error: string;
    };
    COMPONENT_NAME: {
        FormItem: string;
    };
    MASKSYMBOL: string;
    TEXTAREA_HEIGHT_MOBILE: number;
};
declare const inputProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            INPUT_PC: string;
            INPUTGROUP_PC: string;
            INPUT_MOBILE: string;
            INPUTGROUP_MOBILE: string;
            Mode: string;
            inputMode(mode: any): any;
            inputGroupMode(mode: any): any;
            VALIDATE_ICON: {
                Validating: string;
                Success: string;
                Error: string;
            };
            COMPONENT_NAME: {
                FormItem: string;
            };
            MASKSYMBOL: string;
            TEXTAREA_HEIGHT_MOBILE: number;
        };
    };
    name: StringConstructor;
    size: StringConstructor;
    form: StringConstructor;
    label: StringConstructor;
    height: NumberConstructor;
    resize: StringConstructor;
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    hoverExpand: BooleanConstructor;
    mask: BooleanConstructor;
    suffixIcon: (StringConstructor | ObjectConstructor)[];
    prefixIcon: (StringConstructor | ObjectConstructor)[];
    modelValue: PropType<string | number | null>;
    type: {
        type: StringConstructor;
        default: string;
    };
    memorySpace: {
        type: NumberConstructor;
        default: number;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectMenu: {
        type: {
            (arrayLength: number): {
                id: string;
                label: string;
            }[];
            (...items: {
                id: string;
                label: string;
            }[]): {
                id: string;
                label: string;
            }[];
            new (arrayLength: number): {
                id: string;
                label: string;
            }[];
            new (...items: {
                id: string;
                label: string;
            }[]): {
                id: string;
                label: string;
            }[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    contentStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    isSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
    tips: StringConstructor;
    counter: {
        type: BooleanConstructor;
        default: boolean;
    };
    autosize: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    autocomplete: {
        type: StringConstructor;
        default: string;
    };
    showPassword: {
        type: BooleanConstructor;
        default: boolean;
    };
    showWordLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    popupMore: {
        type: BooleanConstructor;
        default: boolean;
    };
    textareaTitle: {
        type: StringConstructor;
        default: string;
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    displayOnlyContent: {
        type: StringConstructor;
        default: string;
    };
    customClass: {
        type: StringConstructor;
        default: string;
    };
    frontClearIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    showEmptyValue: {
        type: BooleanConstructor;
        default: undefined;
    };
    textAlign: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: PropType<string | number | null>;
    };
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 输入框的边框模式，当值为underline时，只显示一条底部直线 */
    inputBoxType: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
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
declare const _default: ({ api, props, reactive, toRefs }: {
    api: any;
    props: any;
    reactive: any;
    toRefs: any;
}) => any;

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

declare const inputStyle: ({ props }: {
    props: any;
}) => () => {
    textAlign: any;
};
declare const calculateNodeStyling: () => (targetElement: HTMLElement) => {
    contextStyle: string;
    paddingSize: number;
    borderSize: number;
    boxSizing: string;
};
declare const calcTextareaHeight: ({ api, hiddenTextarea, props, state, mode, constants }: Pick<IInputRenderlessParams, "mode" | "props" | "state" | "api" | "constants"> & {
    hiddenTextarea: HTMLTextAreaElement | null;
}) => (targetElement: HTMLTextAreaElement, minRows?: number, maxRows?: null) => {
    minHeight?: string | undefined;
    height?: string | undefined;
};
declare const getInput: (vm: IInputRenderlessParamUtils['vm']) => () => HTMLTextAreaElement | HTMLInputElement;
declare const focus: (api: IInputApi) => () => void;
declare const handleInput: ({ api, emit, nextTick, state }: Pick<IInputRenderlessParams, 'api' | 'emit' | 'nextTick' | 'state'>) => (event: Event) => void;
declare const resizeTextarea: ({ api, parent, vm, state, props }: Pick<IInputRenderlessParams, 'api' | 'parent' | 'vm' | 'state' | 'props'>) => () => void;
declare const setNativeInputValue: ({ api, state }: Pick<IInputRenderlessParams, 'api' | 'state'>) => () => void;
declare const calcIconOffset: ({ vm, parent }: Pick<IInputRenderlessParams, 'parent' | 'vm'>) => (place: 'prefix' | 'suffix') => void;
declare const updateIconOffset: (api: IInputApi) => () => void;
declare const watchFormSelect: ({ emit, props, state }: Pick<IInputRenderlessParams, 'emit' | 'props' | 'state'>) => (value: string | number | undefined) => void;
declare const hiddenPassword: ({ state, props }: Pick<IInputRenderlessParams, 'state' | 'props'>) => () => string;

interface IInputState {
    mode: string;
    focused: boolean;
    hovering: boolean;
    isComposing: boolean;
    passwordVisible: boolean;
    boxVisibility: boolean;
    textareaCalcStyle: object;
    checkedLabel: string;
    width: string;
    sheetvalue: string | number | undefined;
    inputSize: ComputedRef<string>;
    showClear: ComputedRef<boolean>;
    upperLimit: ComputedRef<string>;
    textLength: ComputedRef<string>;
    inputExceed: ComputedRef<boolean>;
    formItemSize: ComputedRef<string>;
    validateIcon: ComputedRef<typeof $constants.VALIDATE_ICON | null>;
    showWordLimit: ComputedRef<boolean>;
    inputDisabled: ComputedRef<boolean>;
    validateState: ComputedRef<string>;
    textareaStyle: ComputedRef<object>;
    needStatusIcon: ComputedRef<boolean>;
    showPwdVisible: ComputedRef<boolean>;
    nativeInputValue: ComputedRef<string>;
    isWordLimitVisible: ComputedRef<boolean>;
    isDisplayOnly: ComputedRef<boolean>;
    displayOnlyTooltip: string;
    hiddenPassword: ComputedRef<string>;
}
type IInputRenderlessParamUtils = ISharedRenderlessParamUtils<IInputConstants>;
type IInputProps = ExtractPropTypes<typeof inputProps>;
type IInputConstants = typeof $constants;
interface IInputApi extends Pick<IInputRenderlessParamUtils, 'dispatch'> {
    state: IInputState;
    isMemoryStorage: ReturnType<typeof _default>['isMemoryStorage'];
    searchMemory: ReturnType<typeof _default>['searchMemory'];
    setNativeInputValue: ReturnType<typeof setNativeInputValue>;
    resizeTextarea: ReturnType<typeof resizeTextarea>;
    updateIconOffset: ReturnType<typeof updateIconOffset>;
    hiddenPassword: ReturnType<typeof hiddenPassword>;
    watchFormSelect: ReturnType<typeof watchFormSelect>;
    getInput: ReturnType<typeof getInput>;
    calcTextareaHeight: ReturnType<typeof calcTextareaHeight>;
    calculateNodeStyling: ReturnType<typeof calculateNodeStyling>;
    handleInput: ReturnType<typeof handleInput>;
    calcIconOffset: ReturnType<typeof calcIconOffset>;
    focus: ReturnType<typeof focus>;
    inputStyle: ReturnType<typeof inputStyle>;
}
type IInputRenderlessParams = ISharedRenderlessFunctionParams<IInputConstants> & {
    state: IInputState;
    props: IInputProps;
    api: IInputApi;
};
interface IInputClassPrefixConstants {
    Input: string;
    InputGroup: string;
}
interface IInputEventNameConstants {
    change: string;
    blur: string;
}

export { IInputApi, IInputClassPrefixConstants, IInputConstants, IInputEventNameConstants, IInputProps, IInputRenderlessParamUtils, IInputRenderlessParams, IInputState };
