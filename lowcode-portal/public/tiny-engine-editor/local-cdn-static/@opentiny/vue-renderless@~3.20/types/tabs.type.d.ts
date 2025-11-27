import { ComponentPublicInstance, ExtractPropTypes } from 'vue';
import { ITinyVm, ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    TAB_ITEM: string;
};
declare const tabsProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            TAB_ITEM: string;
        };
    };
    tabStyle: StringConstructor;
    activeName: StringConstructor;
    withClose: BooleanConstructor;
    withAdd: BooleanConstructor;
    size: StringConstructor;
    activeColor: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {};
    editable: BooleanConstructor;
    position: {
        type: StringConstructor;
        default: string;
    };
    beforeLeave: FunctionConstructor;
    stretch: BooleanConstructor;
    showMoreTabs: BooleanConstructor;
    swipeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropConfig: {
        type: ObjectConstructor;
        default: () => null;
    };
    separator: BooleanConstructor;
    showExpandTabs: BooleanConstructor;
    expandTabsTitle: StringConstructor;
    expandTabsMode: StringConstructor;
    tooltipConfig: (StringConstructor | ObjectConstructor)[];
    optimized: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeClose: FunctionConstructor;
    overflowTitle: BooleanConstructor;
    titleWidth: StringConstructor;
    moreShowAll: BooleanConstructor;
    panelMaxHeight: StringConstructor;
    panelWidth: StringConstructor;
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

declare const calcPaneInstances: ({ constants, parent, state, childrenHandler }: Pick<ITabsRenderlessParams, 'constants' | 'parent' | 'state' | 'childrenHandler'>) => (isForceUpdate?: boolean) => void;
declare const calcMorePanes: ({ parent, props, state, refs }: Pick<ITabsRenderlessParams, 'parent' | 'props' | 'state' | 'refs'>) => () => void;
declare const calcExpandPanes: ({ parent, props, state }: Pick<ITabsRenderlessParams, 'parent' | 'props' | 'state'>) => () => void;
declare const handleTabClick: ({ api, emit, props, refs }: Pick<ITabsRenderlessParams, 'api' | 'emit' | 'props' | 'refs'>) => (pane: ITabsPane, tabName: string, event: Event) => void;
declare const handleTabRemove: ({ emit, props }: Pick<ITabsRenderlessParams, 'emit' | 'props'>) => (pane: ITabsPane, event: Event) => void;
declare const handleTabAdd: (emit: ITabsRenderlessParams['emit']) => () => void;
declare const setCurrentName: ({ api, props, refs, state }: Pick<ITabsRenderlessParams, 'api' | 'props' | 'refs' | 'state'>) => (value: string) => void;
declare const changeCurrentName: ({ emit, state }: Pick<ITabsRenderlessParams, 'emit' | 'state'>) => (value: string) => void;
declare const created: ({ api, parent, state }: Pick<ITabsRenderlessParams, 'api' | 'parent' | 'state'>) => () => void;
declare const changeDirection: ({ props, state }: Pick<ITabsRenderlessParams, 'props' | 'state'>) => (currentName: string) => void;
declare const handleTabDragStart: ({ emit }: Pick<ITabsRenderlessParams, 'emit'>) => (event: ITabsCustomEvent) => void;
declare const handleTabDragOver: ({ emit }: Pick<ITabsRenderlessParams, 'emit'>) => (event: ITabsCustomEvent) => void;
declare const handleTabDragEnd: ({ state, emit }: Pick<ITabsRenderlessParams, 'state' | 'emit'>) => (event: ITabsCustomEvent) => void;

interface ITabsState {
    panes: ITabsPaneVm[] | [];
    currentName: string;
    currentIndex: number;
    showPanesCount: number;
    startX: number;
    startY: number;
    deltaX: number;
    deltaY: number;
    offsetX: number;
    offsetY: number;
    direction: string;
    expandPanesWidth: string | number;
    activeIndex: number;
    morePanes?: ITabsPaneVm[];
    separator?: boolean;
}
/**
 *tab根元素实例对象
 */
type ITabsVm = ComponentPublicInstance & {
    state: ITabsState;
} & ITabsProps;
type ITabsPaneVm = ITinyVm<{
    TAB_ITEM: string;
}> | ITabsPane | ITabsVm;
/**
 * pane对象类型
 */
interface ITabsPane {
    name: string;
    disabled: boolean;
    state: ITabsState;
}
/**
 * 自定义拖拽事件
 */
interface ITabsCustomEvent {
    originalEvent: DragEvent;
    oldDraggableIndex: number;
    newDraggableIndex: number;
}
interface ITabsApi {
    state: ITabsState;
    handleTabAdd: ReturnType<typeof handleTabAdd>;
    handleTabRemove: ReturnType<typeof handleTabRemove>;
    changeDirection: ReturnType<typeof changeDirection>;
    changeCurrentName: ReturnType<typeof changeCurrentName>;
    calcMorePanes: ReturnType<typeof calcMorePanes>;
    calcExpandPanes: ReturnType<typeof calcExpandPanes>;
    calcPaneInstances: ReturnType<typeof calcPaneInstances>;
    handleTabDragStart: ReturnType<typeof handleTabDragStart>;
    handleTabDragOver: ReturnType<typeof handleTabDragOver>;
    handleTabDragEnd: ReturnType<typeof handleTabDragEnd>;
    handleTabClick: ReturnType<typeof handleTabClick>;
    setCurrentName: ReturnType<typeof setCurrentName>;
    created: ReturnType<typeof created>;
}
type ITabsProps = ExtractPropTypes<typeof tabsProps>;
type ITabsConstants = typeof $constants;
type ITabsRenderlessParamUtils = ISharedRenderlessParamUtils<ITabsConstants>;
type ITabsRenderlessParams = ISharedRenderlessFunctionParams<ITabsConstants> & {
    state: ITabsState;
    props: ITabsProps;
    api: ITabsApi;
};

export { ITabsApi, ITabsConstants, ITabsCustomEvent, ITabsPane, ITabsPaneVm, ITabsProps, ITabsRenderlessParamUtils, ITabsRenderlessParams, ITabsState, ITabsVm };
