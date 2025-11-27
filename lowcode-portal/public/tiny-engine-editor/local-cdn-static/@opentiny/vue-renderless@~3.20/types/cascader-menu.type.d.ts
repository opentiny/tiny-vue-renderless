import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';
import { I as ICascaderPanelNode, a as ICascaderPanelApi } from './cascader-panel.type-8f58e628.js';
import 'vue';

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

declare const handleExpand: (state: ICascaderMenuState) => (e: MouseEvent) => HTMLElement;
declare const handleMouseMove: ({ api, parent, vm, state, svg }: Pick<ICascaderMenuRenderlessParams, "state" | "api" | "parent" | "vm"> & {
    svg: string;
}) => (e: MouseEvent) => void;
declare const clearHoverZone: ({ vm }: Pick<ICascaderMenuRenderlessParams, 'vm'>) => () => void;

interface ICascaderMenuProps {
    nodes: ICascaderPanelNode[];
    index: number;
}
interface ICascaderMenuState {
    activeNode: null | HTMLElement;
    hoverTimer: null | NodeJS.Timeout;
    id: number;
    isEmpty: boolean;
    menuId: string;
}
interface ICascaderMenuApi {
    state: ICascaderMenuState;
    clearHoverZone: ReturnType<typeof clearHoverZone>;
    handleExpand: ReturnType<typeof handleExpand>;
    handleMouseMove: ReturnType<typeof handleMouseMove>;
}
type ICascaderMenuRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ICascaderMenuState;
    props: ICascaderMenuProps;
    api: ICascaderMenuApi;
    panel: ICascaderPanelApi;
};
type ICascaderMenuRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { ICascaderMenuApi, ICascaderMenuProps, ICascaderMenuRenderlessParamUtils, ICascaderMenuRenderlessParams, ICascaderMenuState };
