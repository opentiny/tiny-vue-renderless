import { StyleValue, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const badgeProps: {
    showLeft: {
        type: BooleanConstructor;
        default: boolean;
    };
    isDot: {
        type: BooleanConstructor;
        default: boolean;
    };
    isFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    isMini: {
        type: BooleanConstructor;
        default: boolean;
    };
    max: NumberConstructor;
    value: (StringConstructor | NumberConstructor)[];
    modelValue: (StringConstructor | NumberConstructor)[];
    href: StringConstructor;
    target: StringConstructor;
    hidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    badgeClass: StringConstructor;
    offset: {
        type: ArrayConstructor;
        default: () => number[];
    };
    data: (StringConstructor | NumberConstructor)[];
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

declare const computedContent: ({ props, state }: Pick<IBadgeRenderlessParams, 'props' | 'state'>) => () => IBadgeContent;
declare const computedValueRef: ({ props }: Pick<IBadgeRenderlessParams, 'props'>) => () => number | string | undefined;
declare const computedTransform: ({ designConfig, props }: Pick<IBadgeRenderlessParams, 'designConfig' | 'props'>) => () => StyleValue;

type IBadgeContent = string | number | undefined;
interface IBadgeState {
    isOverstep: boolean;
    valueRef: number | undefined;
    content: IBadgeContent;
    href: string;
}
type IBadgeProps = ExtractPropTypes<typeof badgeProps>;
type IBadgeRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IBadgeState;
    props: IBadgeProps;
};
interface IBadgeApi {
    state: IBadgeState;
    computedValueRef: ReturnType<typeof computedValueRef>;
    computedContent: ReturnType<typeof computedContent>;
    computedTransform: ReturnType<typeof computedTransform>;
}
type IBadgeRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IBadgeApi, IBadgeContent, IBadgeProps, IBadgeRenderlessParamUtils, IBadgeRenderlessParams, IBadgeState };
