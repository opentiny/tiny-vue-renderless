import { ExtractPropTypes } from 'vue';
import { ITabsVm } from './tabs.type.js';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';
import { t as tabBarProps } from './index-a975a7a2.js';

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

declare const computedBarStyle: (parent: ITabBarPcRenderlessParams['parent']) => (props: ITabBarPcRenderlessParams['props'], state: ITabBarPcRenderlessParams['state']) => ITabBarStyle;

type ITabBarPcProps = ExtractPropTypes<typeof tabBarProps>;
interface ITabBarPcState {
    rootTabs: ITabsVm;
    barStyle: object;
    separator: boolean | null;
}
interface ITabBarPcApi {
    state: ITabBarPcState;
    computedBarStyle: ReturnType<typeof computedBarStyle>;
}
type ITabBarPcRenderlessParamUtils = ISharedRenderlessParamUtils<never>;
type ITabBarPcRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ITabBarPcState;
    props: ITabBarPcProps;
    api: ITabBarPcApi;
    rootTabs: ITabsVm;
};
interface ITabBarStyle {
    transform: string;
    msTransform: string;
    webkitTransform: string;
}

export { ITabBarPcApi, ITabBarPcProps, ITabBarPcRenderlessParamUtils, ITabBarPcRenderlessParams, ITabBarPcState, ITabBarStyle };
