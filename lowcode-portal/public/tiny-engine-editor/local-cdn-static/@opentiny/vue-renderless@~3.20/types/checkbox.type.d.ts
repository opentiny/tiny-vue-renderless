import { ExtractPropTypes, ComputedRef } from 'vue';
import { PropType } from '@opentiny/vue-common';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

type IconPosition = 'center' | 'top';
declare const $constants: {
    FORM_ITEM: string;
    FORM_CHANGE: string;
    CHECKBOX: string;
    CHECKBOX_GROUP: string;
};
declare const checkboxProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            FORM_ITEM: string;
            FORM_CHANGE: string;
            CHECKBOX: string;
            CHECKBOX_GROUP: string;
        };
    };
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    label: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: string;
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: StringConstructor;
    trueLabel: (StringConstructor | NumberConstructor)[];
    falseLabel: (StringConstructor | NumberConstructor)[];
    id: StringConstructor;
    controls: {
        type: StringConstructor;
        default: string;
    };
    border: BooleanConstructor;
    size: StringConstructor;
    text: StringConstructor;
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    events: {
        type: ObjectConstructor;
        default: () => {};
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconPosition: PropType<IconPosition>;
    shape: {
        type: StringConstructor;
        default: string;
    };
    tabindex: {
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

declare const addToStore: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => void;
declare const removeFromStore: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => void;
declare const handleChange: ({ state, props, emit, nextTick, dispatch, constants }: Pick<ICheckboxRenderlessParams, 'state' | 'props' | 'emit' | 'nextTick' | 'dispatch' | 'constants'>) => (event: ICheckboxChangeEvent) => void;
declare const computedGetModelGet: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => ICheckboxState['model'];
declare const computedGetModelSet: ({ state, dispatch, emit, constants }: Pick<ICheckboxRenderlessParams, 'state' | 'dispatch' | 'emit' | 'constants'>) => (value: ICheckboxState['model']) => void;
declare const computedIsChecked: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => boolean;
declare const computedIsGroup: ({ state, parent, constants }: Pick<ICheckboxRenderlessParams, 'state' | 'parent' | 'constants'>) => () => boolean;
declare const computedStore: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => ICheckboxState['store'];
declare const computedIsLimitDisabled: (state: any) => () => any;
declare const computedIsDisabled: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => boolean;
declare const computedFormItemSize: (props: any) => () => string;
declare const computedCheckboxSize: ({ state, props, formItemSize }: Pick<ICheckboxRenderlessParams, 'state' | 'props' | 'formItemSize'>) => () => any;
declare const mounted: ({ props, emit, api, parent }: Pick<ICheckboxRenderlessParams, 'props' | 'emit' | 'api' | 'parent'>) => () => void;
declare const computedIsDisplayOnly: ({ state, props }: Pick<ICheckboxRenderlessParams, 'state' | 'props'>) => () => boolean;
declare const computedIsGroupDisplayOnly: ({ state }: Pick<ICheckboxRenderlessParams, 'state'>) => () => boolean;
declare const computedDisplayLabel: ({ state, props, t }: Pick<ICheckboxRenderlessParams, 'state' | 'props' | 't'>) => () => string;
declare const computedIsShowText: ({ props }: Pick<ICheckboxRenderlessParams, 'props'>) => () => boolean;
declare const computedShowText: ({ props }: Pick<ICheckboxRenderlessParams, 'props'>) => () => ICheckboxProps['label'] | ICheckboxProps['text'];

type ICheckboxSizeEnum = 'medium' | 'small' | 'mini';
type ICheckboxModalValue = string | number | boolean;
interface ICheckboxChangeEvent extends Event {
    target: HTMLInputElement;
}
interface ICheckboxState {
    size: ICheckboxSizeEnum;
    vertical: boolean;
    focus: boolean;
    selfModel: ICheckboxModalValue;
    showLabel: boolean;
    isLimitExceeded: boolean;
    checkboxGroup: ISharedRenderlessFunctionParams<ICheckboxConstants>['parent'];
    store: ICheckboxModalValue | ICheckboxModalValue[];
    isGroup: boolean;
    isChecked: boolean;
    isDisabled: boolean;
    checkboxSize: boolean;
    isLimitDisabled: boolean;
    formDisabled: boolean;
    formDisplayOnly: boolean;
    isDisplayOnly: boolean;
    isGroupDisplayOnly: boolean;
    displayLabel: string;
    inputDisabled: boolean;
    model: ICheckboxModalValue | ICheckboxModalValue[];
    showText: boolean;
    isShowText: boolean;
    tooltipVisible: boolean;
    displayedValue: string;
}
type ICheckboxProps = ExtractPropTypes<typeof checkboxProps>;
type ICheckboxConstants = typeof $constants;
type ICheckboxRenderlessParams = ISharedRenderlessFunctionParams<ICheckboxConstants> & {
    state: ICheckboxState;
    props: ICheckboxProps;
    formItemSize: ComputedRef<string>;
    type: string;
    api: ICheckboxApi;
};
interface ICheckboxApi {
    state: ICheckboxState;
    dispatch: ISharedRenderlessParamUtils<ICheckboxConstants>['dispatch'];
    addToStore: ReturnType<typeof addToStore>;
    removeFromStore: ReturnType<typeof removeFromStore>;
    computedStore: ReturnType<typeof computedStore>;
    computedFormItemSize: ReturnType<typeof computedFormItemSize>;
    computedIsChecked: ReturnType<typeof computedIsChecked>;
    computedIsLimitDisabled: ReturnType<typeof computedIsLimitDisabled>;
    computedIsDisabled: ReturnType<typeof computedIsDisabled>;
    computedIsDisplayOnly: ReturnType<typeof computedIsDisplayOnly>;
    computedIsGroupDisplayOnly: ReturnType<typeof computedIsGroupDisplayOnly>;
    computedGetModelGet: ReturnType<typeof computedGetModelGet>;
    computedIsGroup: ReturnType<typeof computedIsGroup>;
    computedCheckboxSize: ReturnType<typeof computedCheckboxSize>;
    computedGetModelSet: ReturnType<typeof computedGetModelSet>;
    mounted: ReturnType<typeof mounted>;
    handleChange: ReturnType<typeof handleChange>;
    computedDisplayLabel: ReturnType<typeof computedDisplayLabel>;
    computedIsShowText: ReturnType<typeof computedIsShowText>;
    computedShowText: ReturnType<typeof computedShowText>;
}
type ICheckboxRenderlessParamUtils = ISharedRenderlessParamUtils<ICheckboxConstants>;

export { ICheckboxApi, ICheckboxChangeEvent, ICheckboxConstants, ICheckboxModalValue, ICheckboxProps, ICheckboxRenderlessParamUtils, ICheckboxRenderlessParams, ICheckboxSizeEnum, ICheckboxState };
