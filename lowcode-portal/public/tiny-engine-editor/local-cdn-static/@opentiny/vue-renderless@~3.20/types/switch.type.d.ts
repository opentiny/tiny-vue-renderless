import { StyleValue, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    PC_PREFIXCLS: string;
    MOBILE_PREFIXCLS: string;
    Mode: string;
    prefixcls(mode: any): any;
};
declare const switchProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            PC_PREFIXCLS: string;
            MOBILE_PREFIXCLS: string;
            Mode: string;
            prefixcls(mode: any): any;
        };
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    showText: {
        type: BooleanConstructor;
        default: undefined;
    };
    types: {
        type: StringConstructor;
    };
    falseColor: StringConstructor;
    falseValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    mini: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    size: (StringConstructor | NumberConstructor)[];
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    trueColor: StringConstructor;
    trueValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    beforeChange: FunctionConstructor;
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
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

declare const toggle: ({ emit, props, state }: Pick<ISwitchRenderlessParams, 'emit' | 'props' | 'state'>) => (event: KeyboardEvent | MouseEvent) => void;
declare const computedWarpClasses: ({ prefixCls, props, state }: Pick<ISwitchRenderlessParams, 'prefixCls' | 'props' | 'state'>) => () => ISwitchClass;
declare const computedInnerClasses: ({ prefixCls }: Pick<ISwitchRenderlessParams, 'prefixCls'>) => () => string;
declare const computedStyle: ({ props, state }: Pick<ISwitchRenderlessParams, 'props' | 'state'>) => () => StyleValue;

interface ISwitchState {
    currentValue: string | number | boolean;
    innerClasses: string;
    wrapClasses: ISwitchClass;
    style: StyleValue;
    formDisabled: boolean;
    disabled: boolean;
    isDisplayOnly: boolean;
    showText: boolean;
}
type ISwitchClass = Array<string | {
    [calssName: string]: boolean;
}>;
type ISwitchProps = ExtractPropTypes<typeof switchProps>;
type ISwitchConstants = typeof $constants;
type ISwitchRenderlessParams = ISharedRenderlessFunctionParams<ISwitchConstants> & {
    state: ISwitchState;
    props: ISwitchProps;
    prefixCls: string;
};
interface ISwitchApi {
    state: ISwitchState;
    toggle: ReturnType<typeof toggle>;
    computedWarpClasses: ReturnType<typeof computedWarpClasses>;
    computedInnerClasses: ReturnType<typeof computedInnerClasses>;
    computedStyle: ReturnType<typeof computedStyle>;
}
type ISwitchRenderlessParamUtils = ISharedRenderlessParamUtils<ISwitchConstants>;

export { ISwitchApi, ISwitchClass, ISwitchConstants, ISwitchProps, ISwitchRenderlessParamUtils, ISwitchRenderlessParams, ISwitchState };
