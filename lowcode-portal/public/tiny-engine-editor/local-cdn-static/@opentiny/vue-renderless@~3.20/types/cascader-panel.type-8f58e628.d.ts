import { VNode } from 'vue';
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

declare class Node {
    parent: Node | null;
    level: number;
    data: ICascaderPanelData;
    config: ICascaderPanelConfig;
    uid: number;
    value: ICascaderPanelNodeValue;
    label: string;
    pathNodes: Node[];
    path: ICascaderPanelNodeValue[];
    pathLabels: string[];
    loaded: boolean;
    loading: boolean;
    hasChildren: boolean;
    children: Node[];
    checked?: boolean;
    indeterminate?: boolean;
    root?: boolean;
    constructor(data: ICascaderPanelData, config: ICascaderPanelConfig, parentNode?: Node | null);
    initState(): void;
    initChildren(): void;
    get isLeaf(): boolean;
    /**
     * 当前节点是否被disable
     */
    get isDisabled(): boolean;
    calculatePathNodes(): Node[];
    getValue(): ICascaderPanelNodeValue;
    getPath(): ICascaderPanelNodeValue[];
    getValueByOption(): ICascaderPanelNodePropValue;
    /**
     *
     * @param allLevels 输入框中是否显示选中值的完整路径
     * @param separator 分割符
     * @returns 选中值的路径
     */
    getText(allLevels: boolean, separator: string): string;
    isSameNode(checkedValue: ICascaderPanelNodePropValue): boolean;
    emit(eventName: string, ...args: any[]): void;
    broadcast(eventName: string, ...args: any[]): void;
    onParentCheck(checked: boolean): void;
    onChildCheck(): void;
    syncCheckState(checkedValue: ICascaderPanelNodePropValue): void;
    setCheckState(checked: boolean): void;
    doCheck(isChecked: boolean): void;
}

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

declare class Store {
    config: ICascaderPanelConfig;
    nodes: ICascaderPanelNode[];
    flattedNodes: ICascaderPanelNode[];
    leafNodes: ICascaderPanelNode[];
    constructor(data: ICascaderPanelData | ICascaderPanelData[], config: ICascaderPanelConfig);
    getNodes(): Node[];
    initNodes(data: ICascaderPanelData | ICascaderPanelData[]): void;
    /**
     * 添加节点到parentNode
     */
    appendNode(nodeData: ICascaderPanelData, parentNode?: ICascaderPanelNode | null): void;
    /**
     * 添加节点到parentNode
     */
    appendNodes(nodeDataList: ICascaderPanelData[], parentNode?: ICascaderPanelNode | null): void;
    /**
     * 获取节点值
     * @param leafOnly 只包含叶子节点
     * @param cached 取缓存（flattedNodes或者leafNodes）中的数据
     * @returns
     */
    getFlattedNodes(leafOnly: boolean, cached?: boolean): Node[];
    /**
     * 通过节点值获取Node节点
     * @param value
     * @returns
     */
    getNodeByValue(value: ICascaderPanelNodePropValue | null): Node | null;
}

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

declare const watchCheckedValue: ({ api, emit, props, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'emit' | 'props' | 'state'>) => (value: ICascaderPanelNodePropValue | null) => void;
declare const initStore: ({ api, props, state, Store }: Pick<ICascaderPanelRenderlessParams, 'api' | 'props' | 'state' | 'Store'>) => () => void;
declare const syncCheckedValue: ({ api, props, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'props' | 'state'>) => () => void;
declare const syncMenuState: ({ api, nextTick, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'nextTick' | 'state'>) => () => void;
declare const syncMultiCheckState: ({ api, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'state'>) => () => void;
declare const syncActivePath: ({ api, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'state'>) => () => void;
declare const expandNodes: (api: ICascaderPanelApi) => (nodes: ICascaderPanelNode[]) => void;
declare const calculateCheckedNodePaths: ({ api, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'state'>) => () => void;
declare const focusNode: (api: ICascaderPanelApi) => (el: HTMLElement | null) => void;
declare const getMenuIndex: () => (el: Element) => number | undefined;
declare const checkNode: (api: ICascaderPanelApi) => (el: HTMLElement) => void;
declare const handleKeyDown: ({ api, emit, menus }: Pick<ICascaderPanelRenderlessParams, 'api' | 'emit' | 'menus'>) => (event: KeyboardEvent) => void;
declare const handleExpand: ({ emit, state }: Pick<ICascaderPanelRenderlessParams, 'emit' | 'state'>) => (node: ICascaderPanelNode, silent?: boolean) => void;
declare const handleCheckChange: (state: ICascaderPanelState) => (value: ICascaderPanelNodePropValue) => void;
declare const lazyLoad: ({ api, $parent, state, Store, emit }: Pick<ICascaderPanelRenderlessParams, 'api' | '$parent' | 'state' | 'Store' | 'emit'>) => (currentNode?: ICascaderPanelNode, onFullfiled?: ((dataList: ICascaderPanelData[]) => void) | undefined) => void;
declare const calculateMultiCheckedValue: ({ api, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'state'>) => () => void;
declare const scrollIntoView: ({ menus }: Pick<ICascaderPanelRenderlessParams, 'menus'>) => () => void;
declare const getNodeByValue: (state: ICascaderPanelState) => (val: ICascaderPanelNodePropValue | null) => ICascaderPanelNode | null;
declare const getFlattedNodes: (state: ICascaderPanelState) => (leafOnly: boolean) => ICascaderPanelNode[];
declare const getCheckedNodes: ({ api, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'state'>) => (leafOnly: boolean, cascaderCheckedValue?: ICascaderPanelNodePropValue) => ICascaderPanelNode[];
declare const clearCheckedNodes: ({ api, state }: Pick<ICascaderPanelRenderlessParams, 'api' | 'state'>) => () => void;
declare const isLeaf: () => (el: Element) => boolean;

/** CascaderPanel的节点 */
type ICascaderPanelNode = Node;
/** CascaderPanel的Store，用来操作ICascaderPanelNode */
type ICascaderPanelStore = Store;
type ICascaderPanelNodeValue = string | Object | number;
/** 值的类型（是数组还是值）由ICascaderPanelConfig的emitPath和multiple决定 */
type ICascaderPanelNodePropValue = ICascaderPanelNodeValue | ICascaderPanelNodeValue[] | ICascaderPanelNodeValue[][];
/** 懒加载时，提供给用户的根节点的node */
interface ICascaderPanelLazyLoadNode {
    root: boolean;
    level: number;
    loading?: boolean;
    loaded?: boolean;
}
/** CascaderPanel的配置 */
interface ICascaderPanelConfig {
    emitPath: boolean;
    expandTrigger: 'click' | 'hover';
    hoverThreshold: number;
    checkStrictly?: boolean;
    multiple?: boolean;
    lazy: boolean;
    lazyLoad: (node: ICascaderPanelNode | ICascaderPanelLazyLoadNode, resolve: (dataList: ICascaderPanelData[]) => void) => void;
    value: string;
    label: string;
    children: string;
    disabled: string;
    leaf: string;
}
/**
 * ICascaderPanelData的结构里的key名由ICascaderPanelConfig的value、label、children、disabled、leaf的值决定
 */
interface ICascaderPanelData {
    value?: ICascaderPanelNodeValue;
    label?: string;
    children?: ICascaderPanelData[];
    disabled?: boolean;
    leaf?: boolean;
    [key: string]: ICascaderPanelNodeValue | ICascaderPanelData[] | string | boolean | undefined;
}
type IRenderLabelFunction = (arg1: {
    node: ICascaderPanelNode;
    data: ICascaderPanelData;
}) => VNode;
interface ICascaderPanelProps {
    modelValue: ICascaderPanelNodePropValue;
    options: ICascaderPanelData[];
    props: ICascaderPanelConfig;
    border: boolean;
    renderLabel?: IRenderLabelFunction;
}
interface ICascaderPanelState {
    checkedValue: ICascaderPanelNodePropValue | null;
    checkedNodePaths: ICascaderPanelNode[][];
    store: ICascaderPanelStore;
    menus: ICascaderPanelNode[][];
    activePath: ICascaderPanelNode[];
    loadCount: number;
    multiple?: boolean;
    checkStrictly?: boolean;
    leafOnly: boolean;
    isHoverMenu: boolean;
    renderLabelFn?: IRenderLabelFunction;
    config: ICascaderPanelConfig & ICascaderPanelProps;
}
interface ICascaderPanelApi {
    state: ICascaderPanelState;
    isLeaf: ReturnType<typeof isLeaf>;
    getMenuIndex: ReturnType<typeof getMenuIndex>;
    getNodeByValue: ReturnType<typeof getNodeByValue>;
    getFlattedNodes: ReturnType<typeof getFlattedNodes>;
    handleCheckChange: ReturnType<typeof handleCheckChange>;
    scrollIntoView: ReturnType<typeof scrollIntoView>;
    syncActivePath: ReturnType<typeof syncActivePath>;
    initStore: ReturnType<typeof initStore>;
    syncMenuState: ReturnType<typeof syncMenuState>;
    syncMultiCheckState: ReturnType<typeof syncMultiCheckState>;
    calculateCheckedNodePaths: ReturnType<typeof calculateCheckedNodePaths>;
    lazyLoad: ReturnType<typeof lazyLoad>;
    syncCheckedValue: ReturnType<typeof syncCheckedValue>;
    focusNode: ReturnType<typeof focusNode>;
    checkNode: ReturnType<typeof checkNode>;
    expandNodes: ReturnType<typeof expandNodes>;
    handleExpand: ReturnType<typeof handleExpand>;
    getCheckedNodes: ReturnType<typeof getCheckedNodes>;
    clearCheckedNodes: ReturnType<typeof clearCheckedNodes>;
    calculateMultiCheckedValue: ReturnType<typeof calculateMultiCheckedValue>;
    watchCheckedValue: ReturnType<typeof watchCheckedValue>;
    handleKeyDown: ReturnType<typeof handleKeyDown>;
}
type ICascaderPanelRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ICascaderPanelState;
    props: ICascaderPanelProps;
    api: ICascaderPanelApi;
    Store: typeof Store;
    $parent: ICascaderPanelRenderlessParams['parent'];
    menus: ICascaderPanelRenderlessParams['vm'][];
};
type ICascaderPanelRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { ICascaderPanelNode as I, Node as N, ICascaderPanelApi as a, ICascaderPanelConfig as b, ICascaderPanelNodeValue as c, ICascaderPanelNodePropValue as d, ICascaderPanelStore as e, ICascaderPanelLazyLoadNode as f, ICascaderPanelData as g, ICascaderPanelProps as h, ICascaderPanelState as i, ICascaderPanelRenderlessParams as j, ICascaderPanelRenderlessParamUtils as k };
