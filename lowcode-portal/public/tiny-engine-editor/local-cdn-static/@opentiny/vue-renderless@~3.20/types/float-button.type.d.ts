import { ComputedRef, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const floatButtonProps: {
    trigger: {
        default: string;
        type: StringConstructor;
        validator(val: string): boolean;
    };
    open: BooleanConstructor;
    shape: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    top: {
        type: StringConstructor;
        default: string;
    };
    bottom: {
        type: StringConstructor;
        default: string;
    };
    right: {
        type: StringConstructor;
        default: string;
    };
    left: {
        type: StringConstructor;
        default: string;
    };
    href: {
        type: StringConstructor;
        default: string;
    };
    target: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: StringConstructor;
        default: string;
    };
    resetTime: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
    backTop: BooleanConstructor;
    visibilityHeight: {
        default: number;
        type: NumberConstructor;
    };
    element: {
        default: HTMLElement;
        type: {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
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

declare const handleClick: ({ emit, props, state }: Pick<IFloatButtonRenderlessParams, 'emit' | 'props' | 'state'>) => (event: MouseEvent) => void;
declare const clearTimer: (state: IFloatButtonState) => () => void;

interface IFloatButtonState {
    timer: number;
    disabled: boolean;
    open: Boolean;
    show: Boolean;
    hasEvent: Boolean;
    formDisabled: ComputedRef<boolean>;
    buttonDisabled: ComputedRef<boolean>;
}
type IFloatButtonRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IFloatButtonState;
    props: IFloatButtonProps;
};
type IFloatButtonProps = ExtractPropTypes<typeof floatButtonProps>;
interface IFloatButtonApi {
    state: IFloatButtonState;
    clearTimer: ReturnType<typeof clearTimer>;
    handleClick: ReturnType<typeof handleClick>;
}
type IFloatButtonRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IFloatButtonApi, IFloatButtonProps, IFloatButtonRenderlessParamUtils, IFloatButtonRenderlessParams, IFloatButtonState };
