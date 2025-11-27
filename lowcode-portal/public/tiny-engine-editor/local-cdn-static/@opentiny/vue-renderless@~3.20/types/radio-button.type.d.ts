import { StyleValue, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';
import { IRadioGroupProps } from './radio-group.type.js';

declare const $constants: {
    RADIO_GROUP: string;
};
declare const radioButtonProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            RADIO_GROUP: string;
        };
    };
    name: StringConstructor;
    text: StringConstructor;
    events: {
        type: ObjectConstructor;
        default: () => {};
    };
    label: {};
    disabled: BooleanConstructor;
    tipContent: StringConstructor;
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

declare const handleChange: ({ constants, nextTick, dispatch, state }: Pick<IRadioButtonRenderlessParams, 'constants' | 'nextTick' | 'dispatch' | 'state'>) => () => void;
declare const getValue: (state: IRadioButtonRenderlessParams['state']) => () => IRadioGroupProps['modelValue'];
declare const setValue: ({ state }: Pick<IRadioButtonRenderlessParams, 'state'>) => (val: IRadioGroupProps['modelValue']) => void;
declare const getGroup: ({ constants, parent: $parent }: Pick<IRadioButtonRenderlessParams, 'constants' | 'parent'>) => () => IRadioButtonState['radioGroup'] | null;
declare const getStyle: (state: IRadioButtonRenderlessParams['state']) => () => {
    backgroundColor: any;
    borderColor: any;
    boxShadow: string;
    color: any;
};
declare const toggleEvents: ({ vm, props }: Pick<IRadioButtonRenderlessParams, 'vm' | 'props'>) => (isUnBind?: boolean) => void;
declare const keydownHandle: ({ state, props }: Pick<IRadioButtonRenderlessParams, 'state' | 'props'>) => () => void;
declare const handleFocus: (state: IRadioButtonRenderlessParams['state']) => () => boolean;
declare const handleBlur: (state: IRadioButtonRenderlessParams['state']) => () => boolean;

interface IRadioButtonState {
    focus: boolean;
    value: IRadioButtonProps['label'];
    radioGroup: ISharedRenderlessFunctionParams<IRadioButtonConstants>['parent'] | null;
    activeStyle: StyleValue;
    size: string;
    isDisabled: boolean;
    tabIndex: number;
    showTips: boolean;
    tipContent: string | undefined;
}
type IRadioButtonProps = ExtractPropTypes<typeof radioButtonProps>;
type IRadioButtonConstants = typeof $constants;
type IRadioButtonRenderlessParams = ISharedRenderlessFunctionParams<IRadioButtonConstants> & {
    state: IRadioButtonState;
    props: IRadioButtonProps;
};
interface IRadioButtonApi {
    state: IRadioButtonState;
    handleChange: ReturnType<typeof handleChange>;
    getValue: ReturnType<typeof getValue>;
    setValue: ReturnType<typeof setValue>;
    getGroup: ReturnType<typeof getGroup>;
    getStyle: ReturnType<typeof getStyle>;
    toggleEvents: ReturnType<typeof toggleEvents>;
    keydownHandle: ReturnType<typeof keydownHandle>;
    handleFocus: ReturnType<typeof handleFocus>;
    handleBlur: ReturnType<typeof handleBlur>;
}
type IRadioButtonRenderlessParamUtils = ISharedRenderlessParamUtils<IRadioButtonConstants>;

export { IRadioButtonApi, IRadioButtonConstants, IRadioButtonProps, IRadioButtonRenderlessParamUtils, IRadioButtonRenderlessParams, IRadioButtonState };
