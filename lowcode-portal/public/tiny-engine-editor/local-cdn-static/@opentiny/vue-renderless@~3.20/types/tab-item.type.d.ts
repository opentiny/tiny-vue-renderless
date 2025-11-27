import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';
import { ITabsVm } from './tabs.type.js';

declare const $constants: {};
declare const tabItemProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {};
    };
    title: StringConstructor;
    name: StringConstructor;
    withClose: BooleanConstructor;
    disabled: BooleanConstructor;
    lazy: BooleanConstructor;
    selected: BooleanConstructor;
    renderTitle: FunctionConstructor;
    renderSetting: FunctionConstructor;
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

declare const computedIsClosable: ({ rootTabs, props }: Pick<ITabItemRenderlessParams, 'rootTabs' | 'props'>) => () => boolean;
declare const computedActive: ({ nextTick, props, state }: Pick<ITabItemRenderlessParams, 'nextTick' | 'props' | 'state'>) => () => boolean;
declare const computedPaneName: ({ props, state }: Pick<ITabItemRenderlessParams, 'props' | 'state'>) => () => string | null;
declare const watchTitle: (parent: ITabItemRenderlessParams['parent']) => () => void;

interface ITabItemState {
    index: string | null;
    loaded: boolean;
    animateShow: boolean;
    rootTabs: ITabsVm;
    active: boolean;
    paneName: string | object | null;
    isClosable: boolean;
}
interface ITabItemApi {
    state: ITabItemState;
    watchTitle: ReturnType<typeof watchTitle>;
    computedIsClosable: ReturnType<typeof computedIsClosable>;
    computedActive: ReturnType<typeof computedActive>;
    computedPaneName: ReturnType<typeof computedPaneName>;
}
type ITabItemProps = ExtractPropTypes<typeof tabItemProps>;
type ITabItemConstants = typeof $constants;
type ITabItemRenderlessParamUtils = ISharedRenderlessParamUtils<ITabItemConstants>;
type ITabItemRenderlessParams = ISharedRenderlessFunctionParams<ITabItemConstants> & {
    state: ITabItemState;
    props: ITabItemProps;
    api: ITabItemApi;
    rootTabs: ITabsVm;
};

export { ITabItemApi, ITabItemConstants, ITabItemProps, ITabItemRenderlessParamUtils, ITabItemRenderlessParams, ITabItemState };
