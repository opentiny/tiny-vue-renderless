import { ExtractPropTypes, ComponentPublicInstance } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

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
declare const actionMenuProps: {
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    maxShowNum: NumberConstructor;
    moreText: StringConstructor;
    spacing: {
        type: (StringConstructor | NumberConstructor)[];
    };
    textField: {
        type: StringConstructor;
        default: string;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: StringConstructor;
        default: string;
    };
    suffixIcon: ObjectConstructor;
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
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

declare const computedMaxShowNum: ({ props, state }: Pick<IActionMenuRenderlessParams, 'props' | 'state'>) => () => number;
declare const computedSpacing: ({ props, state, designConfig }: any) => () => string;
declare const computedMoreText: ({ props, state, t }: any) => () => string;
declare const computedSuffixIcon: ({ props, state }: Pick<IActionMenuRenderlessParams, 'props' | 'state'>) => () => string | Object;
declare const handleMoreClick: (emit: IActionMenuRenderlessParams['emit']) => () => void;
declare const handleItemClick: (emit: IActionMenuRenderlessParams['emit']) => (data: IActionMenuItemData) => void;
declare const visibleChange: (emit: IActionMenuRenderlessParams['emit']) => (status: boolean) => void;

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

interface IActonMenuOptionsItem {
    label?: string;
    disabled?: boolean;
    divided?: boolean;
    children?: IActonMenuOptionsItem[];
    icon?: any;
    [key: string]: any;
}
interface IActionMenuState {
    visibleOptions: IActonMenuOptionsItem[];
    moreOptions: IActonMenuOptionsItem[];
    isCardMode: boolean;
    spacing: string | number;
    maxShowNum: number;
    moreText: string;
    suffixIcon: string | object;
}
type IActionMenuProps = ExtractPropTypes<typeof actionMenuProps>;
type IActionMenuRenderlessParams = ISharedRenderlessFunctionParams<null> & {
    state: IActionMenuState;
    props: IActionMenuProps;
};
interface IActionMenuItemData {
    itemData: object;
    vm: ComponentPublicInstance;
    disabled: boolean;
}
interface IActionMenuApi {
    handleMoreClick: ReturnType<typeof handleMoreClick>;
    handleItemClick: ReturnType<typeof handleItemClick>;
    visibleChange: ReturnType<typeof visibleChange>;
    computedMaxShowNum: ReturnType<typeof computedMaxShowNum>;
    computedSpacing: ReturnType<typeof computedSpacing>;
    computedMoreText: ReturnType<typeof computedMoreText>;
    computedSuffixIcon: ReturnType<typeof computedSuffixIcon>;
    state: IActionMenuState;
}
type IActionMenuRenderlessParamUtils = ISharedRenderlessParamUtils<null>;

export { IActionMenuApi, IActionMenuItemData, IActionMenuProps, IActionMenuRenderlessParamUtils, IActionMenuRenderlessParams, IActionMenuState, IActonMenuOptionsItem };
