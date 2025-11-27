import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    RATENODECLS: string;
    ICON_PREFIXCLS: string;
    DECIMALCLS: string;
};
declare const rateProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            RATENODECLS: string;
            ICON_PREFIXCLS: string;
            DECIMALCLS: string;
        };
    };
    allowHalf: {
        type: BooleanConstructor;
        default: boolean;
    };
    colors: {
        type: ArrayConstructor;
        default: () => string[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledVoidColor: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidIconClass: {
        type: StringConstructor;
        default: string;
    };
    highThreshold: {
        type: NumberConstructor;
        default: number;
    };
    iconClasses: {
        type: ArrayConstructor;
        default: () => string[];
    };
    lowThreshold: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    radio: {
        type: BooleanConstructor;
        default: boolean;
    };
    scoreTemplate: {
        type: StringConstructor;
        default: string;
    };
    showScore: {
        type: BooleanConstructor;
        default: boolean;
    };
    showText: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    space: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    textOnBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    texts: {
        type: ArrayConstructor;
        default: () => any[];
    };
    voidColor: {
        type: StringConstructor;
        default: string;
    };
    voidIconClass: {
        type: StringConstructor;
        default: string;
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

declare const computedActiveColor: (props: IRateProps) => (state: IRateState) => string;
declare const computedActiveClass: (props: IRateProps) => (state: IRateState) => string;
declare const getTextStyle: ({ props, state }: {
    props: any;
    state: any;
}) => () => {
    color: any;
};
declare const handelKey: ({ emit, props, state }: {
    emit: any;
    props: any;
    state: any;
}) => (event: any) => void;
declare const selectValue: ({ emit, props, state }: {
    emit: any;
    props: any;
    state: any;
}) => (value: any) => void;
declare const setCurrentValue: ({ constants: { RATENODECLS, DECIMALCLS, ICON_PREFIXCLS }, props, state, parent, api }: {
    constants: {
        RATENODECLS: any;
        DECIMALCLS: any;
        ICON_PREFIXCLS: any;
    };
    props: any;
    state: any;
    parent: any;
    api: any;
}) => ({ event, item }: {
    event: any;
    item: any;
}) => void;
declare const resetCurrentValue: ({ props, state }: {
    props: any;
    state: any;
}) => () => void;
declare const showDecimalIcon: ({ props, state }: {
    props: any;
    state: any;
}) => (item: any) => any;
declare const getIconStyle: ({ api, props, state }: {
    api: any;
    props: any;
    state: any;
}) => (item: any) => {
    fill: any;
    'font-size': any;
};
declare const computedText: ({ props, state }: Pick<IRateRenderlessParams, 'props' | 'state'>) => string;
declare const computedDecimalStyle: ({ props, state }: Pick<IRateRenderlessParams, 'props' | 'state'>) => {
    fill: string;
    width: string;
    clip: string;
    clipPath: string;
    fontSize: string;
};
declare const computedClasses: ({ props, state }: Pick<IRateRenderlessParams, 'props' | 'state'>) => string[];
declare const computedClassMap: (props: IRateProps) => {
    lowClass: unknown;
    mediumClass: unknown;
    highClass: unknown;
    voidClass: string;
    disabledVoidClass: string;
};
declare const computedColorMap: (props: IRateProps) => {
    lowColor: unknown;
    mediumColor: unknown;
    highColor: unknown;
    voidColor: string;
    disabledVoidColor: string;
};
declare const computedVoidClass: ({ props, state }: Pick<IRateRenderlessParams, 'props' | 'state'>) => string;

interface IRateState {
    pointerAtLeftHalf: boolean;
    colorMap: ReturnType<typeof computedColorMap>;
    classMap: ReturnType<typeof computedClassMap>;
    text: ReturnType<typeof computedText>;
    activeClass: string;
    activeColor: string;
    classes: ReturnType<typeof computedClasses>;
    decimalIconClass: string;
    voidClass: ReturnType<typeof computedVoidClass>;
    decimalStyle: ReturnType<typeof computedDecimalStyle>;
    hoverIndex: number;
    currentValue: number;
    mouseTarget: null | HTMLElement;
}
type IRateProps = ExtractPropTypes<typeof rateProps>;
type IRateConstants = typeof $constants;
type IRateRenderlessParams = ISharedRenderlessFunctionParams<IRateConstants> & {
    api: IRateApi;
    state: IRateState;
    props: IRateProps;
};
interface IRateApi {
    state: IRateState;
    computedText: typeof computedText;
    computedClasses: typeof computedClasses;
    computedClassMap: typeof computedClassMap;
    computedColorMap: typeof computedColorMap;
    computedVoidClass: typeof computedVoidClass;
    computedDecimalStyle: typeof computedDecimalStyle;
    getTextStyle: ReturnType<typeof getTextStyle>;
    handelKey: ReturnType<typeof handelKey>;
    computedActiveColor: ReturnType<typeof computedActiveColor>;
    computedActiveClass: ReturnType<typeof computedActiveClass>;
    showDecimalIcon: ReturnType<typeof showDecimalIcon>;
    getIconStyle: ReturnType<typeof getIconStyle>;
    selectValue: ReturnType<typeof selectValue>;
    resetCurrentValue: ReturnType<typeof resetCurrentValue>;
    setCurrentValue: ReturnType<typeof setCurrentValue>;
}
type IRateRenderlessParamUtils = ISharedRenderlessParamUtils<IRateConstants>;

export { IRateApi, IRateConstants, IRateProps, IRateRenderlessParamUtils, IRateRenderlessParams, IRateState };
