import { PropType, ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    RADIO_GROUP: string;
};
declare const radioProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            RADIO_GROUP: string;
        };
    };
    modelValue: {};
    label: {};
    disabled: BooleanConstructor;
    name: StringConstructor;
    border: BooleanConstructor;
    size: {
        type: PropType<"medium" | "small" | "mini">;
        default: string;
    };
    text: StringConstructor;
    events: {
        type: ObjectConstructor;
        default: () => {};
    };
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    displayOnly: {
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

declare const handleChange: ({ constants, dispatch, emit, state, nextTick }: Pick<IRadioRenderlessParams, 'constants' | 'dispatch' | 'emit' | 'state' | 'nextTick'>) => () => void;
declare const isGroup: ({ constants, parent: $parent, state }: Pick<IRadioRenderlessParams, 'constants' | 'parent' | 'state'>) => () => boolean;
declare const radioSize: ({ props, state }: Pick<IRadioRenderlessParams, 'props' | 'state'>) => () => IRadioState['radioSize'];
declare const isDisabled: ({ props, state }: Pick<IRadioRenderlessParams, 'props' | 'state'>) => () => boolean;
declare const isDisplayOnly: ({ props }: Pick<IRadioRenderlessParams, 'props'>) => () => boolean;
declare const tabIndex: ({ props, state }: Pick<IRadioRenderlessParams, 'props' | 'state'>) => () => number;
declare const getModel: ({ props, state }: Pick<IRadioRenderlessParams, 'props' | 'state'>) => () => IRadioState['model'];
declare const setModel: ({ constants, dispatch, emit, props, vm, state }: Pick<IRadioRenderlessParams, 'constants' | 'dispatch' | 'emit' | 'props' | 'vm' | 'state'>) => (val: IRadioState['model']) => void;

type IRadioProps = ExtractPropTypes<typeof radioProps>;
type IRadioConstants = typeof $constants;
interface IRadioState {
    vertical: boolean;
    size: IRadioProps['size'];
    focus: boolean;
    radioGroup: ISharedRenderlessParamUtils<IRadioConstants>['parent'] | null;
    isGroup: boolean;
    radioSize: IRadioProps['size'];
    isDisabled: boolean;
    isDisplayOnly: boolean;
    tabIndex: number;
    formDisabled: boolean;
    model: string;
}
type IRadioRenderlessParams = ISharedRenderlessFunctionParams<IRadioConstants> & {
    state: IRadioState;
    props: IRadioProps;
    type: string;
    api: IRadioApi;
};
interface IRadioApi {
    state: IRadioState;
    handleChange: ReturnType<typeof handleChange>;
    isGroup: ReturnType<typeof isGroup>;
    radioSize: ReturnType<typeof radioSize>;
    isDisabled: ReturnType<typeof isDisabled>;
    isDisplayOnly: ReturnType<typeof isDisplayOnly>;
    tabIndex: ReturnType<typeof tabIndex>;
    getModel: ReturnType<typeof getModel>;
    setModel: ReturnType<typeof setModel>;
}
type IRadioRenderlessParamUtils = ISharedRenderlessParamUtils<IRadioConstants>;

export { IRadioApi, IRadioConstants, IRadioProps, IRadioRenderlessParamUtils, IRadioRenderlessParams, IRadioState };
