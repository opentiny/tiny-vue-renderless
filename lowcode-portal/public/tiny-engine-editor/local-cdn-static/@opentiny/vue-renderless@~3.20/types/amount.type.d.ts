import { ComputedRef, ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils } from './shared.type.js';

declare const amountProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            FILTER_OPTION: string[];
        };
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
    };
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    size: StringConstructor;
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    currency: {
        type: StringConstructor;
        default: string;
    };
    date: (StringConstructor | DateConstructor)[];
    dateAllowEmpty: {
        type: BooleanConstructor;
        default: boolean;
    };
    digits: {
        type: NumberConstructor;
        default: number;
    };
    stringMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    rounding: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxLen: {
        type: NumberConstructor;
        default: number;
    };
    negative: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    fetchCurrency: FunctionConstructor;
    fields: ObjectConstructor;
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    format: ObjectConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    holdZero: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelTruncation: {
        type: BooleanConstructor;
        default: boolean;
    };
    strictInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    plugin: FunctionConstructor;
    popUp: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideCurrency: {
        type: BooleanConstructor;
        default: boolean;
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    numAllowEmpty: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    tip: StringConstructor;
    shape: StringConstructor;
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    filter: {
        type: BooleanConstructor;
        default: boolean;
    };
    blank: {
        type: BooleanConstructor;
        default: boolean;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

interface IAmountState {
    visible: boolean;
    amount: string;
    currency: string;
    date: string | Date | undefined;
    overMaxLen: boolean;
    isFocus: boolean;
    lock: boolean;
    amountText: string;
    lastInput: string | number | undefined;
    lastCurrency: number;
    lastDate: string | Date | undefined;
    format: ComputedRef<object>;
}
type IAmountEditorState = Pick<IAmountState, 'amount' | 'date' | 'currency' | 'lastInput'>;
type IAmountProps = ExtractPropTypes<typeof amountProps>;
type IAmountRenderlessParamUtils = ISharedRenderlessParamUtils<null>;
interface IAmountApi {
    state: IAmountState;
    t: ISharedRenderlessParamUtils['t'];
    editorState: IAmountEditorState;
    getDecimal: (value: any) => any;
    innerFormat: (value: any) => any;
    getAmountText: (value: any) => any;
    initAmount: () => any;
    onInputPreprocess: (value: any) => any;
    onInput: (value: any) => any;
    initText: () => void;
    inputFocus: () => void;
    inputBlur: () => void;
    closePopper: () => void;
    emitChange: () => void;
    popInput: (value: any) => void;
    save: () => void;
    reset: () => void;
    handelClick: (e: any) => void;
    addOutSideEvent: (visible: any) => void;
    watchModelValue: () => void;
    watchCurrency: (value: any) => void;
    toggleVisible: () => void;
}

export { IAmountApi, IAmountEditorState, IAmountProps, IAmountRenderlessParamUtils, IAmountState };
