import { VNode } from 'vue';
import { I as ICascaderPanelNode, b as ICascaderPanelConfig, c as ICascaderPanelNodeValue, d as ICascaderPanelNodePropValue, a as ICascaderPanelApi } from './cascader-panel.type-8f58e628.js';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

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

declare const comptCheckPath: ({ api, parent, state }: Pick<ICascaderNodeRenderlessParams, 'api' | 'parent' | 'state'>) => () => boolean;
declare const handleExpand: ({ api, parent, props, state }: Pick<ICascaderNodeRenderlessParams, 'api' | 'parent' | 'props' | 'state'>) => () => void;
declare const handleCheckChange: ({ api, parent, dispatch, state }: Pick<ICascaderNodeRenderlessParams, 'api' | 'parent' | 'dispatch' | 'state'>) => () => void;
declare const handleMultiCheckChange: ({ parent, props }: Pick<ICascaderNodeRenderlessParams, 'parent' | 'props'>) => (checked: boolean) => void;
declare const isInPath: (props: ICascaderNodeRenderlessParams['props']) => (pathNodes: ICascaderPanelNode[]) => boolean;
declare const handleNodeClick: ({ state, api }: Pick<ICascaderNodeRenderlessParams, 'api' | 'state'>) => () => void;

interface ICascaderNodeProps {
    node: ICascaderPanelNode;
    nodeId: string;
}
interface ICascaderNodeState {
    config: ICascaderPanelConfig;
    isLeaf: boolean;
    isDisabled: boolean;
    checkedValue: ICascaderPanelNodeValue[];
    isChecked: boolean;
    inActivePath: boolean;
    inCheckedPath: boolean;
    value: ICascaderPanelNodePropValue;
    nodeLabel: string | VNode;
}
interface ICascaderNodeApi {
    state: ICascaderNodeState;
    isInPath: ReturnType<typeof isInPath>;
    handleExpand: ReturnType<typeof handleExpand>;
    comptCheckPath: ReturnType<typeof comptCheckPath>;
    handleCheckChange: ReturnType<typeof handleCheckChange>;
    handleMultiCheckChange: ReturnType<typeof handleMultiCheckChange>;
    handleNodeClick: ReturnType<typeof handleNodeClick>;
}
type ICascaderNodeRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ICascaderNodeState;
    props: ICascaderNodeProps;
    api: ICascaderNodeApi;
    parent: ICascaderPanelApi;
    panel: ICascaderPanelApi;
};

export { ICascaderNodeApi, ICascaderNodeProps, ICascaderNodeRenderlessParams, ICascaderNodeState };
