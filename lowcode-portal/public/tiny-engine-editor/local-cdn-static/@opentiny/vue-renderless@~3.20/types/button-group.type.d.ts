import { PropType, ExtractPropTypes } from 'vue';
import { IButtonGroupNode as IButtonGroupNode$1 } from '@opentiny/vue-renderless/types/button-group.type';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const buttonGroupProps: {
    size: StringConstructor;
    data: {
        type: PropType<IButtonGroupNode$1[]>;
        default: () => never[];
    };
    plain: BooleanConstructor;
    modelValue: (StringConstructor | NumberConstructor)[];
    disabled: BooleanConstructor;
    valueField: {
        type: StringConstructor;
        default: string;
    };
    textField: {
        type: StringConstructor;
        default: string;
    };
    showMore: NumberConstructor;
    showEdit: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
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

declare const handleChange: ({ emit, state }: Pick<IButtonGroupRenderlessParams, 'emit' | 'state'>) => () => void;
declare const handleClick: ({ emit, props, state }: Pick<IButtonGroupRenderlessParams, 'emit' | 'props' | 'state'>) => (node: IButtonGroupNode) => void;
declare const moreNodeClick: ({ emit, props, state }: Pick<IButtonGroupRenderlessParams, 'emit' | 'props' | 'state'>) => (node: IButtonGroupNode) => void;
declare const getItemClass: ({ props, state }: Pick<IButtonGroupRenderlessParams, 'props' | 'state'>) => (node: IButtonGroupNode) => IButtonGroupItemClass;

type IButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;
interface IButtonGroupItemClass {
    disabled?: boolean;
    plain?: boolean;
    medium?: boolean;
    small?: boolean;
    mini?: boolean;
}
interface IButtonGroupNode {
    text?: string;
    value?: string;
    disabled?: boolean;
    [otherKey: string]: any;
}
interface IButtonGroupState {
    value: IButtonGroupProps['modelValue'];
    buttonData: IButtonGroupNode[];
    moreData: IButtonGroupNode[];
    formDisabled: boolean;
    disabled: boolean;
}
type IButtonGroupRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IButtonGroupState;
    props: IButtonGroupProps;
};
interface IButtonGroupApi {
    state: IButtonGroupState;
    handleChange: ReturnType<typeof handleChange>;
    handleClick: ReturnType<typeof handleClick>;
    moreNodeClick: ReturnType<typeof moreNodeClick>;
    getItemClass: ReturnType<typeof getItemClass>;
}
type IButtonGroupRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IButtonGroupApi, IButtonGroupItemClass, IButtonGroupNode, IButtonGroupProps, IButtonGroupRenderlessParamUtils, IButtonGroupRenderlessParams, IButtonGroupState };
