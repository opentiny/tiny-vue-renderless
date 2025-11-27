import { ExtractPropTypes } from 'vue';
import { PropType } from '@opentiny/vue-common';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants$1: {
    PROCESS_DONE_CLS: string;
    PROCESS_CUR_CLS: string;
    PROCESS_WAIT_CLS: string;
    PROCESS_DISABLED_CLS: string;
    PROCESS_ERROR_CLS: string;
    STACK_NODES_MAX: number;
    LIMITED_STACK_NODES: number;
};
type ShapeType = 'circle' | 'dot';
declare const timelineProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            PROCESS_DONE_CLS: string;
            PROCESS_CUR_CLS: string;
            PROCESS_WAIT_CLS: string;
            PROCESS_DISABLED_CLS: string;
            PROCESS_ERROR_CLS: string;
            STACK_NODES_MAX: number;
            LIMITED_STACK_NODES: number;
        };
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    horizontal: {
        type: BooleanConstructor;
        default: boolean;
    };
    showNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    nameField: {
        type: StringConstructor;
        default: string;
    };
    timeField: {
        type: StringConstructor;
        default: string;
    };
    tipsField: {
        type: StringConstructor;
        default: string;
    };
    autoColorField: {
        type: StringConstructor;
        default: string;
    };
    showIconField: {
        type: StringConstructor;
        default: string;
    };
    start: {
        type: NumberConstructor;
        default: number;
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    space: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    showStatus: {
        type: BooleanConstructor;
        default: boolean;
    };
    subField: {
        type: BooleanConstructor;
        default: boolean;
    };
    foldDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nodeMax: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    limitedNodes: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    onlyNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    lineWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    shape: {
        type: PropType<ShapeType>;
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

declare const toggleFold: ({ props }: {
    props: any;
}) => (node: ITimelineItem) => boolean;

declare const $constants: {
    PROCESS_DONE_CLS: string;
    PROCESS_CUR_CLS: string;
    PROCESS_WAIT_CLS: string;
    PROCESS_DISABLED_CLS: string;
    PROCESS_ERROR_CLS: string;
    STACK_NODES_MAX: number;
    LIMITED_STACK_NODES: number;
};
declare const timelineItemProps: {
    node: {
        type: ObjectConstructor;
        default: {};
    };
    _constants: {
        type: ObjectConstructor;
        default: () => {
            PROCESS_DONE_CLS: string;
            PROCESS_CUR_CLS: string;
            PROCESS_WAIT_CLS: string;
            PROCESS_DISABLED_CLS: string;
            PROCESS_ERROR_CLS: string;
            STACK_NODES_MAX: number;
            LIMITED_STACK_NODES: number;
        };
    };
    space: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    lineWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    autoColorField: {
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

declare const getDate: (dateTime: string) => {
    date: string;
    time: string;
};
declare const getStatus: ({ state, t }: Pick<ITimelineItemRenderlessParams, 'state' | 't'>) => (value: number) => string;
declare const computedWidth: () => (width: string | number) => string | number;
declare const handleClick: ({ emit, state, props }: Pick<ITimelineItemRenderlessParams, 'emit' | 'state' | 'props'>) => (node: ITimelineItem) => void;
declare const getStatusCls: ({ constants, state, props }: Pick<ITimelineItemRenderlessParams, 'constants' | 'state' | 'props'>) => (node: ITimelineItem) => ITimelineStatusCls;
declare const computedCurrent: ({ state, api }: Pick<ITimelineItemRenderlessParams, 'state' | 'api'>) => () => number;
declare const computedIsReverse: (api: ITimelineItemApi) => () => boolean;
declare const computedItemCls: ({ props, api, state }: Pick<ITimelineItemRenderlessParams, 'props' | 'api' | 'state'>) => () => ITimelineCustomCls;
declare const computedIconClass: ({ props, api }: Pick<ITimelineItemRenderlessParams, 'props' | 'api'>) => () => Array<string | Object>;
declare const computedItemStyle: ({ props, state, api }: Pick<ITimelineItemRenderlessParams, 'props' | 'state' | 'api'>) => () => {
    width?: string | number;
    height?: string | number;
    flex?: string;
} | null;

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

type ITimelineItemProps = ExtractPropTypes<typeof timelineItemProps>;
type ITimelineItemConstants = typeof $constants;
type ITimelineItemRenderlessParamUtils = ISharedRenderlessParamUtils<ITimelineItemConstants>;
type TimelineItemType = 'primary' | 'success' | 'warning' | 'error' | 'info';
interface ITimelineItemState {
    nodesLength: number;
    current: number;
    isReverse: boolean;
    computedSpace: string;
    computedItemCls: ITimelineCustomCls;
    computedItemStyle: {
        [key: string]: string | number;
    } | null;
    computedLineWidth: string;
    iconClass: ITimelineCustomCls;
}
interface ITimelineItemApi {
    state: ITimelineItemState;
    rootProps: ITimelineProps;
    getDate: ReturnType<typeof getDate>;
    computedCurrent: ReturnType<typeof computedCurrent>;
    computedIsReverse: ReturnType<typeof computedIsReverse>;
    computedItemCls: ReturnType<typeof computedItemCls>;
    computedItemStyle: ReturnType<typeof computedItemStyle>;
    computedWidth: ReturnType<typeof computedWidth>;
    getStatus: ReturnType<typeof getStatus>;
    handleClick: ReturnType<typeof handleClick>;
    getStatusCls: ReturnType<typeof getStatusCls>;
    computedIconClass: ReturnType<typeof computedIconClass>;
}
type ITimelineItemRenderlessParams = ISharedRenderlessFunctionParams<ITimelineItemConstants> & {
    api: ITimelineItemApi;
    state: ITimelineItemState;
    props: ITimelineItemProps;
};
interface ITimelineItem {
    index: number;
    name: string;
    time: string;
    error: boolean;
    disabled: boolean;
    type: TimelineItemType;
    fold?: boolean;
}
interface ITimelineInject {
    state: ITimelineItem[];
    props: ITimelineProps;
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

type ITimelineProps = ExtractPropTypes<typeof timelineProps>;
type ITimelineConstants = typeof $constants$1;
type ITimelineRenderlessParamUtils = ISharedRenderlessParamUtils<ITimelineConstants>;
interface ITimelineState {
    nodes: ITimelineItem[];
    timelineItems: ITimelineItem[];
    current: number;
    isReverse: boolean;
    stackNodes: ITimelineItem[];
    computedSpace: string;
    showData: boolean;
    showAll: boolean;
    computedWrapperClass: ITimelineCustomCls;
    computedLineWidth: string;
}
interface ITimelineApi {
    state: ITimelineState;
    getDate: () => string;
    computedData: () => ITimelineItem[];
    computedCurrent: () => number;
    computedIsReverse: () => boolean;
    computedSpace: () => string | number;
    getStatus: () => string;
    handleClick: () => void;
    getStatusCls: () => ITimelineStatusCls;
    computedStackNodes: () => ITimelineItem[];
    changeStatus: () => boolean;
    computedWrapperClass: () => ITimelineCustomCls;
    toggleFold: ReturnType<typeof toggleFold>;
}
type ITimelineRenderlessParams = ISharedRenderlessFunctionParams<ITimelineConstants> & {
    api: ITimelineApi;
    state: ITimelineState;
    props: ITimelineProps;
};
type ITimelineStatusCls = {
    [key in keyof ITimelineConstants]?: boolean;
};
type ITimelineCustomCls = (string | {
    [key: string]: boolean;
})[];

export { ITimelineItemProps as I, TimelineItemType as T, ITimelineItemConstants as a, ITimelineItemRenderlessParamUtils as b, ITimelineItemState as c, ITimelineItemApi as d, ITimelineItemRenderlessParams as e, ITimelineItem as f, ITimelineInject as g, ITimelineProps as h, ITimelineConstants as i, ITimelineRenderlessParamUtils as j, ITimelineState as k, ITimelineApi as l, ITimelineRenderlessParams as m, ITimelineStatusCls as n, ITimelineCustomCls as o };
