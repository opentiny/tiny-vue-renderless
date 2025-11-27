import { ExtractPropTypes } from 'vue';
import { ITabsProps, ITabsVm } from './tabs.type.js';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';
import { a as tabNavPcProps } from './index-a975a7a2.js';

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

declare const computedNavStyle: (state: ITabNavRenderlessParams['state']) => {
    transform: string;
    width?: string;
};
declare const scrollIntoView: ({ parent, vm, state }: Pick<ITabNavRenderlessParams, 'parent' | 'vm' | 'state'>) => () => void;
declare const computedSizeName: (state: ITabNavRenderlessParams['state']) => 'width' | 'height';
declare const updated: ({ api, vm, state }: Pick<ITabNavRenderlessParams, 'api' | 'vm' | 'state'>) => () => void;
declare const mounted: ({ api, parent }: Pick<ITabNavRenderlessParams, 'api' | 'parent'>) => void;
declare const beforeUnmount: ({ api, parent }: Pick<ITabNavRenderlessParams, 'api' | 'parent'>) => void;
declare const visibilityChangeHandler: (state: ITabNavRenderlessParams['state']) => () => void;
declare const windowBlurHandler: (state: ITabNavRenderlessParams['state']) => () => void;
declare const windowFocusHandler: (state: ITabNavRenderlessParams['state']) => () => void;
declare const scrollToActiveTab: ({ parent, vm, state }: Pick<ITabNavRenderlessParams, 'parent' | 'vm' | 'state'>) => () => void;
declare const scrollPrev: ({ vm, state }: Pick<ITabNavRenderlessParams, 'vm' | 'state'>) => () => void;
declare const scrollNext: ({ vm, state }: Pick<ITabNavRenderlessParams, 'vm' | 'state'>) => () => void;
declare const changeTab: (api: ITabNavRenderlessParams['api']) => (event: KeyboardEvent) => void;
declare const setFocus: (state: ITabNavRenderlessParams['state']) => () => void;
declare const removeFocus: (state: ITabNavRenderlessParams['state']) => () => void;
declare const moreTabShow: (state: ITabNavRenderlessParams['state']) => () => void;
declare const expandTabShow: ({ api, state }: Pick<ITabNavRenderlessParams, 'api' | 'state'>) => () => void;
declare const expandTabHide: (state: ITabNavRenderlessParams['state']) => () => boolean;
declare const computedHeaderStyle: ({ vm, state }: Pick<ITabNavRenderlessParams, 'vm' | 'state'>) => () => {};
declare const handleTabDragStart: ({ state, vm, emit }: Pick<ITabNavRenderlessParams, 'state' | 'vm' | 'emit'>) => (event: DragEvent) => void;
declare const handleTabDragEnd: ({ vm, state, nextTick }: Pick<ITabNavRenderlessParams, 'vm' | 'state' | 'nextTick'>) => () => void;
declare const sortableEvent: ({ api, props, state, vm, emit, markRaw }: Pick<ITabNavRenderlessParams, 'api' | 'props' | 'state' | 'vm' | 'emit' | 'markRaw'>) => () => void;
declare const watchCurrentName: ({ nextTick, vm, state }: Pick<ITabNavRenderlessParams, 'nextTick' | 'vm' | 'state'>) => () => void;

type ITabNavProps = {
    _mode: string;
} & ExtractPropTypes<typeof tabNavPcProps> & ITabsProps;
interface ITabNavStyle {
}
interface ITabLineStyle {
    width: number;
    offset: number;
}
interface ITabNavScrollable {
    prev: number;
    next: boolean;
}
interface ITabNavState {
    dragging: boolean;
    navOffset: number;
    lineStyle: ITabLineStyle;
    scrollable: boolean | ITabNavScrollable;
    isFocus: boolean;
    focusable: boolean;
    showMoreItem: boolean;
    isActive: boolean;
    showMoreTabs: boolean;
    showExpandItem: boolean;
    showExpandTabs: boolean;
    expandHeaderStyle: {};
    mode: string;
    rootTabs: ITabsVm;
    sizeName: string;
    navStyle: ITabNavStyle;
    navSortableObj: object;
    separator: boolean | null;
}
interface ITabNavApi {
    state: ITabNavState;
    setFocus: ReturnType<typeof setFocus>;
    removeFocus: ReturnType<typeof removeFocus>;
    moreTabShow: ReturnType<typeof moreTabShow>;
    expandTabShow: ReturnType<typeof expandTabShow>;
    expandTabHide: ReturnType<typeof expandTabHide>;
    scrollPrev: ReturnType<typeof scrollPrev>;
    scrollNext: ReturnType<typeof scrollNext>;
    windowBlurHandler: ReturnType<typeof windowBlurHandler>;
    windowFocusHandler: ReturnType<typeof windowFocusHandler>;
    visibilityChangeHandler: ReturnType<typeof visibilityChangeHandler>;
    scrollToActiveTab: ReturnType<typeof scrollToActiveTab>;
    scrollIntoView: ReturnType<typeof scrollIntoView>;
    computedHeaderStyle: ReturnType<typeof computedHeaderStyle>;
    watchCurrentName: ReturnType<typeof watchCurrentName>;
    handleTabDragStart: ReturnType<typeof handleTabDragStart>;
    handleTabDragEnd: ReturnType<typeof handleTabDragEnd>;
    sortableEvent: ReturnType<typeof sortableEvent>;
    computedSizeName: typeof computedSizeName;
    computedNavStyle: typeof computedNavStyle;
    beforeUnmount: typeof beforeUnmount;
    mounted: typeof mounted;
    changeTab: ReturnType<typeof changeTab>;
    updated: ReturnType<typeof updated>;
}
type ITabNavRenderlessParamUtils = ISharedRenderlessParamUtils<never>;
type ITabNavRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ITabNavState;
    props: ITabNavProps;
    api: ITabNavApi;
    rootTabs: ITabsVm;
};

export { ITabNavApi, ITabNavProps, ITabNavRenderlessParamUtils, ITabNavRenderlessParams, ITabNavState };
