import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare class BigIntDecimal {
    constructor(value: any);
    getDecimalStr(): any;
    getIntegerStr(): any;
    getMark(): "" | "-";
    /**
     * Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
     * This is used for add function only.
     */
    alignDecimal(decimalLength: any): bigint;
    add(value: any): any;
    negate(): BigIntDecimal;
    isNaN(): any;
    isEmpty(): any;
    isInvalidate(): any;
    lessEquals(target: any): boolean;
    equals(target: any): boolean;
    toNumber(): number;
    toString(safe?: boolean): any;
}

declare const $constants: {
    MAX: string;
    MIN: string;
    VALUENOW: string;
    DISABLED: string;
    KEY: string;
    VALUE: string;
    EVENT_NAME: {
        blur: string;
        change: string;
    };
    COMPONENT_NAME: string;
    FILTER_OPTION: string[];
};
declare const numericProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            MAX: string;
            MIN: string;
            VALUENOW: string;
            DISABLED: string;
            KEY: string;
            VALUE: string;
            EVENT_NAME: {
                blur: string;
                change: string;
            };
            COMPONENT_NAME: string;
            FILTER_OPTION: string[];
        };
    };
    allowEmpty: {
        type: BooleanConstructor;
        default: boolean;
    };
    emptyValue: {
        default: undefined;
    };
    circulate: BooleanConstructor;
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
    controlsPosition: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    format: (StringConstructor | ObjectConstructor)[];
    hideUnit: {
        type: BooleanConstructor;
        default: boolean;
    };
    holdZero: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: StringConstructor;
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelTruncation: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: (StringConstructor | NumberConstructor | undefined)[];
    mouseWheel: BooleanConstructor;
    name: StringConstructor;
    placeholder: StringConstructor;
    plugin: FunctionConstructor;
    precision: {
        type: NumberConstructor;
        validator(val: any): boolean;
    };
    size: StringConstructor;
    step: {
        type: (StringConstructor | ObjectConstructor | NumberConstructor)[];
        default: number;
    };
    stepStrictly: {
        type: BooleanConstructor;
        default: boolean;
    };
    strictInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    stringMode: BooleanConstructor;
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    unit: StringConstructor;
    unitCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLeft: {
        type: BooleanConstructor;
        default: boolean;
    };
    showEmptyValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
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
    changeCompat: {
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

declare const initService: (service: INumericRenderlessParamUtils['service']) => {
    getUnitPrecision: Function;
    getNumberFormat: Function;
};
declare const getDecimal: (props: INumericProps) => (value: number) => BigIntDecimal;
declare const watchValue: ({ api, props, state }: Pick<INumericRenderlessParams, 'api' | 'state' | 'props'>) => (value: number) => void;
declare const toPrecision: (state: INumericState) => ({ num, precision }: {
    num: number;
    precision: number;
}) => number;
declare const getPrecision: () => (value: number) => number;
declare const internalIncrease: ({ api, state }: Pick<INumericRenderlessParams, 'api' | 'state'>) => ({ val, step }: {
    val: number | string;
    step: number | string;
}) => string;
declare const internalDecrease: ({ api, state }: Pick<INumericRenderlessParams, 'api' | 'state'>) => ({ val, step }: {
    val: number | string;
    step: number | string;
}) => string | number;
declare const increase: ({ api, props, state }: Pick<INumericRenderlessParams, 'api' | 'props' | 'state'>) => () => void;
declare const decrease: ({ api, props, state }: Pick<INumericRenderlessParams, 'api' | 'props' | 'state'>) => () => void;
declare const handleBlur: ({ constants, dispatch, emit, props, state, api }: Pick<INumericRenderlessParams, 'constants' | 'dispatch' | 'emit' | 'props' | 'state' | 'api'>) => (event: FocusEvent) => void;
declare const handleFocus: ({ emit, state, props, api, vm }: Pick<INumericRenderlessParams, 'emit' | 'state' | 'props' | 'api' | 'vm'>) => (event: FocusEvent) => void;
declare const focus: (vm: INumericRenderlessParams['vm']) => () => void;
declare const setCurrentValue: ({ api, constants, dispatch, emit, props, state }: Pick<INumericRenderlessParams, 'api' | 'constants' | 'dispatch' | 'emit' | 'props' | 'state'>) => (newVal: number, emitChangeFlag?: boolean) => void;
/** 处理输入字符： input / compositionend 事件均进入该函数 */
declare const handleInput: ({ state, api, emit, props }: Pick<INumericRenderlessParams, 'state' | 'api' | 'emit' | 'props'>) => (event: InputEvent) => void;
declare const handleInputChange: ({ api, state, props }: Pick<INumericRenderlessParams, 'api' | 'state' | 'props'>) => (event: Event) => void;
declare const select: (vm: INumericRenderlessParams['vm']) => () => any;
declare const mounted: ({ constants, parent, props, state }: Pick<INumericRenderlessParams, 'constants' | 'parent' | 'props' | 'state'>) => () => void;
declare const unmounted: ({ parent, state }: Pick<INumericRenderlessParams, 'parent' | 'state'>) => () => void;
declare const updated: ({ constants, parent, state }: Pick<INumericRenderlessParams, 'constants' | 'parent' | 'state'>) => () => void;
declare const displayValue: ({ props, state, api }: Pick<INumericRenderlessParams, 'props' | 'state' | 'api'>) => () => string | number;
declare const getNumPecision: ({ api, props }: Pick<INumericRenderlessParams, 'api' | 'props'>) => () => number;
declare const mouseEvent: ({ api, props, state }: Pick<INumericRenderlessParams, 'api' | 'props' | 'state'>) => (event: MouseEvent) => void | boolean;
declare const getDisplayOnlyText: ({ parent, state, props }: Pick<INumericRenderlessParams, 'parent' | 'state' | 'props'>) => () => string | number;
declare const filterValue: ({ state }: Pick<INumericRenderlessParams, 'state'>) => () => number | string;
declare const handleClear: ({ state, emit }: Pick<INumericRenderlessParams, 'state' | 'emit'>) => () => void;
declare const handleChange: ({ state, emit }: Pick<INumericRenderlessParams, 'state' | 'emit'>) => () => void;

type INumericProps = ExtractPropTypes<typeof numericProps>;
type INumericConstants = typeof $constants;
interface INumericState {
    radioVal: string;
    currentValue: number | string;
    userInput: number | string;
    lastInput: number | string;
    inputStatus: boolean;
    decimal: BigIntDecimal;
    strictInput: boolean;
    inputSize: INumericSize;
    formSize: string;
    formDisabled: boolean;
    inputDisabled: boolean;
    displayValue: number | string;
    numPrecision: number;
    minDisabled: boolean;
    maxDisabled: boolean;
    controlsAtRight: boolean;
    format: INumericUnitPrecision;
    isDisplayOnly: boolean;
}
interface INumericApi {
    focus: ReturnType<typeof focus>;
    select: ReturnType<typeof select>;
    getPrecision: ReturnType<typeof getPrecision>;
    toPrecision: ReturnType<typeof toPrecision>;
    updated: ReturnType<typeof updated>;
    mounted: ReturnType<typeof mounted>;
    unmounted: ReturnType<typeof unmounted>;
    getDecimal: ReturnType<typeof getDecimal>;
    handleFocus: ReturnType<typeof handleFocus>;
    decrease: ReturnType<typeof decrease>;
    increase: ReturnType<typeof increase>;
    handleInput: ReturnType<typeof handleInput>;
    getNumPecision: ReturnType<typeof getNumPecision>;
    displayValue: ReturnType<typeof displayValue>;
    internalDecrease: ReturnType<typeof internalDecrease>;
    internalIncrease: ReturnType<typeof internalIncrease>;
    handleInputChange: ReturnType<typeof handleInputChange>;
    mouseEvent: ReturnType<typeof mouseEvent>;
    handleBlur: ReturnType<typeof handleBlur>;
    watchValue: ReturnType<typeof watchValue>;
    setCurrentValue: ReturnType<typeof setCurrentValue>;
    getDisplayOnlyText: ReturnType<typeof getDisplayOnlyText>;
    filterValue: ReturnType<typeof filterValue>;
    handleClear: ReturnType<typeof handleClear>;
    handleChange: ReturnType<typeof handleChange>;
}
type INumericRenderlessParams = ISharedRenderlessFunctionParams<INumericConstants> & {
    api: INumericApi;
    state: INumericState;
    props: INumericProps;
};
type INumericRenderlessParamUtils = ISharedRenderlessParamUtils<INumericConstants>;
type INumericSize = 'medium' | 'small' | 'mini';
interface INumericUnitPrecision {
    decimalSeparator: string;
    groupSeparator: string;
    fraction?: string;
    rounding?: string;
    zeroize: boolean;
}
interface INumericInitStateParams extends Pick<INumericRenderlessParams, 'constants' | 'reactive' | 'computed' | 'props' | 'api' | 'parent'> {
    $service: ReturnType<typeof initService>;
}
interface INumericGetEmitValueParams {
    newVal: number;
    emitValue: number | string | undefined;
    allowEmpty: boolean;
    defaultVal: number;
    bigNew: BigIntDecimal;
    oldVal: number;
    max: number;
    min: number;
    api: INumericApi;
    props: INumericProps;
    format: INumericState['format'];
    plugin: INumericProps['plugin'];
    stringMode: boolean;
}

export { INumericApi, INumericConstants, INumericGetEmitValueParams, INumericInitStateParams, INumericProps, INumericRenderlessParamUtils, INumericRenderlessParams, INumericSize, INumericState, INumericUnitPrecision };
