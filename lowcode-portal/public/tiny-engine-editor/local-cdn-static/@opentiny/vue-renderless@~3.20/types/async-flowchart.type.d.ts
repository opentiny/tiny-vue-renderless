import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamHooks, ISharedRenderlessParamUtils } from './shared.type.js';

declare const asyncFlowchartProps: {
    fetch: {
        type: FunctionConstructor;
        required: boolean;
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
declare const index: any;

declare const observeContainerSize: ({ nextTick, vm, state }: {
    nextTick: ISharedRenderlessParamHooks['nextTick'];
    vm: ISharedRenderlessParamUtils['vm'];
    state: IAsyncFlowchartState;
}) => () => void;
declare const unobserveContainerSize: (state: IAsyncFlowchartState) => () => void;
declare const fetchData: ({ Loading, props, state, vm, markRaw, api, nextTick }: {
    Loading: any;
    props: IAsyncFlowchartProps;
    state: IAsyncFlowchartState;
    vm: ISharedRenderlessParamUtils['vm'];
    markRaw: ISharedRenderlessParamHooks['markRaw'];
    api: IAsyncFlowchartApi;
    nextTick: ISharedRenderlessParamHooks['nextTick'];
}) => () => void;
declare const handleClickNode: (emit: ISharedRenderlessParamUtils['emit']) => (afterNode: any, e: any) => void;
declare const handleClickLink: (emit: ISharedRenderlessParamUtils['emit']) => (afterLink: any, e: any) => void;
declare const handleClickBlank: (emit: ISharedRenderlessParamUtils['emit']) => (param: any, e: any) => void;
declare const handleClickGroup: (emit: ISharedRenderlessParamUtils['emit']) => (afterGroup: any, e: any) => void;
declare const refresh: (api: IAsyncFlowchartApi) => () => void;

interface IAsyncFlowchartState {
    loading: boolean;
    data: null;
    config: null | {
        nodeWrapperSize: number;
    };
    temporary?: typeof index;
}
type IAsyncFlowchartProps = ExtractPropTypes<typeof asyncFlowchartProps>;
interface IAsyncFlowchartApi {
    state: IAsyncFlowchartState;
    observeContainerSize: ReturnType<typeof observeContainerSize>;
    unobserveContainerSize: ReturnType<typeof unobserveContainerSize>;
    handleClickNode: ReturnType<typeof handleClickNode>;
    handleClickLink: ReturnType<typeof handleClickLink>;
    handleClickBlank: ReturnType<typeof handleClickBlank>;
    handleClickGroup: ReturnType<typeof handleClickGroup>;
    fetchData: ReturnType<typeof fetchData>;
    refresh: ReturnType<typeof refresh>;
}

export { IAsyncFlowchartApi, IAsyncFlowchartProps, IAsyncFlowchartState };
