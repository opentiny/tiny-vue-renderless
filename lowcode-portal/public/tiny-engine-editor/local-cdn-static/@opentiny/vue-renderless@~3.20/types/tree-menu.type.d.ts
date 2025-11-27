import * as vue from 'vue';
import { ComputedRef, ExtractPropTypes } from 'vue';
import * as _opentiny_vue_common from '@opentiny/vue-common';
import { ISharedRenderlessParamUtils } from './shared.type.js';

declare const treeMenuProps: {
    placeholder: {
        default: string;
        type: StringConstructor;
    };
    data: ArrayConstructor;
    nodeKey: StringConstructor;
    defaultExpandAll: BooleanConstructor;
    suffixIcon: ObjectConstructor;
    searchIcon: {
        type: ObjectConstructor;
        default: () => vue.Raw<_opentiny_vue_common.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<_opentiny_vue_common.ExtractPropTypes<{}>>, {}, {}>>;
    };
    props: ObjectConstructor;
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    checkStrictly: BooleanConstructor;
    lazy: {
        type: BooleanConstructor;
        default: boolean;
    };
    load: FunctionConstructor;
    showCheckbox: BooleanConstructor;
    filterNodeMethod: FunctionConstructor;
    defaultCheckedKeys: ArrayConstructor;
    defaultExpandedKeys: ArrayConstructor;
    defaultExpandedKeysHighlight: (StringConstructor | NumberConstructor)[];
    indent: {
        type: NumberConstructor;
        default: number;
    };
    allowDrag: FunctionConstructor;
    allowDrop: FunctionConstructor;
    expandOnClickNode: {
        type: BooleanConstructor;
        default: boolean;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    getMenuDataSync: FunctionConstructor;
    accordion: BooleanConstructor;
    showTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapsible: {
        type: BooleanConstructor;
        default: boolean;
    };
    showNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    nodeHeight: NumberConstructor;
    onlyCheckChildren: {
        type: BooleanConstructor;
        default: boolean;
    };
    menuCollapsible: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    highlightQuery: {
        type: BooleanConstructor;
        default: boolean;
    };
    widthAdapt: {
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

declare const initData: ({ state, props, service, api }: {
    state: ITreeMenuState;
    props: ITreeMenuProps;
    service: any;
    api: ITreeMenuApi;
}) => () => Promise<void>;
declare const setMenuKey: (api: ITreeMenuApi) => ({ newData, menuData }: {
    newData: ITreeMenuNewData[];
    menuData: ITreeMenuData[];
}) => ITreeMenuNewData[];
declare const filterNode: (props: any) => (value: any, data: any) => any;
declare const watchFilterText: ({ vm }: {
    vm: any;
}) => (value: any) => void;
declare const nodeDragStart: (emit: any) => (node: any, event: any) => void;
declare const nodeDragEnter: (emit: any) => (dragNode: any, dropNode: any, event: any) => void;
declare const nodeDragOver: (emit: any) => (dragNode: any, dropNode: any, event: any) => void;
declare const nodeDragEnd: (emit: any) => (dragNode: any, dropNode: any, dropType: any, event: any) => void;
declare const nodeDrop: (emit: any) => (dragNode: any, dropNode: any, dropType: any, event: any) => void;
declare const nodeExpand: (emit: any) => (nodeData: any, node: any) => void;
declare const nodeCollapse: (emit: any) => (nodeData: any, node: any) => void;
declare const nodeClick: ({ emit, props, state }: {
    emit: any;
    props: any;
    state: any;
}) => (nodeData: any, node: any) => void;
declare const checkChange: (emit: any) => (data: any, checked: any, indeterminate: any) => void;
declare const check: (emit: any) => (data: any, checkedStatus: any) => void;
declare const currentChange: (emit: any) => (data: any, node: any, e: any) => void;
declare const getTitle: (props: any) => (label: any) => any;
declare const collapseChange: ({ state, props, emit }: {
    state: any;
    props: any;
    emit: any;
}) => () => void;
declare const collapseMenu: ({ state, props, api }: {
    state: any;
    props: any;
    api: any;
}) => () => void;
declare const expandMenu: ({ state, props, api }: {
    state: ITreeMenuState;
    props: ITreeMenuProps;
    api: ITreeMenuApi;
}) => () => void;
declare const setCurrentKey: ({ vm }: {
    vm: any;
}) => (key: string) => void;
declare const getCurrentKey: ({ vm }: {
    vm: any;
}) => () => any;
declare const setCurrentNode: ({ vm }: {
    vm: any;
}) => (key: string) => void;
declare const getCurrentNode: ({ vm }: {
    vm: any;
}) => () => any;

interface ITreeMenuState {
    data?: unknown[];
    filterText: string;
    isCollapsed: boolean;
    clearable: ComputedRef<boolean>;
}
type ITreeMenuProps = ExtractPropTypes<typeof treeMenuProps>;
interface ITreeMenuApi {
    t: ISharedRenderlessParamUtils['t'];
    state: ITreeMenuState;
    check: ReturnType<typeof check>;
    filterNode: ReturnType<typeof filterNode>;
    nodeDrop: ReturnType<typeof nodeDrop>;
    nodeClick: ReturnType<typeof nodeClick>;
    nodeExpand: ReturnType<typeof nodeExpand>;
    nodeDragEnd: ReturnType<typeof nodeDragEnd>;
    checkChange: ReturnType<typeof checkChange>;
    nodeCollapse: ReturnType<typeof nodeCollapse>;
    nodeDragOver: ReturnType<typeof nodeDragOver>;
    nodeDragStart: ReturnType<typeof nodeDragStart>;
    nodeDragEnter: ReturnType<typeof nodeDragEnter>;
    currentChange: ReturnType<typeof currentChange>;
    watchFilterText: ReturnType<typeof watchFilterText>;
    getTitle: ReturnType<typeof getTitle>;
    setMenuKey: ReturnType<typeof setMenuKey>;
    initData: ReturnType<typeof initData>;
    collapseChange: ReturnType<typeof collapseChange>;
    collapseMenu: ReturnType<typeof collapseMenu>;
    expandMenu: ReturnType<typeof expandMenu>;
    setCurrentKey: ReturnType<typeof setCurrentKey>;
    getCurrentKey: ReturnType<typeof getCurrentKey>;
    setCurrentNode: ReturnType<typeof setCurrentNode>;
    getCurrentNode: ReturnType<typeof getCurrentNode>;
}
interface ITreeMenuData {
    name: string;
    siteNodeId: string;
    url: string;
    children: ITreeMenuData[];
}
interface ITreeMenuNewData extends ITreeMenuData {
    label: string;
    id: string;
    url: string;
    children: ITreeMenuNewData[];
}

export { ITreeMenuApi, ITreeMenuData, ITreeMenuNewData, ITreeMenuProps, ITreeMenuState };
