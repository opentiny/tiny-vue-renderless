import { PropType, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const radioGroupProps: {
    modelValue: {};
    size: {
        type: PropType<"medium" | "small" | "mini">;
        default: string;
    };
    fill: StringConstructor;
    textColor: StringConstructor;
    disabled: BooleanConstructor;
    vertical: BooleanConstructor;
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    showTips: {
        type: BooleanConstructor;
        default: boolean;
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

declare const handleKeydown: (parent: IRadioGroupRenderlessParams['parent']) => (event: KeyboardEvent) => void;
declare const mounted: (parent: IRadioGroupRenderlessParams['parent']) => () => void;

interface IRadioGroupState {
    radioGroupSize: IRadioGroupProps['size'];
    tag: string;
    activeStyle: string | undefined;
}
type IRadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
type IRadioGroupRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IRadioGroupState;
    props: IRadioGroupProps;
};
interface IRadioGroupApi {
    state: IRadioGroupState;
    dispatch: ISharedRenderlessParamUtils<never>['dispatch'];
    onMounted: ReturnType<typeof mounted>;
    handleKeydown: ReturnType<typeof handleKeydown>;
}
type IRadioGroupRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IRadioGroupApi, IRadioGroupProps, IRadioGroupRenderlessParamUtils, IRadioGroupRenderlessParams, IRadioGroupState };
