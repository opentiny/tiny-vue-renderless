import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    ISCHECKED: string;
    DROPPANEL: string;
    TRANSFERPANEL: string;
};
declare const transferProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            ISCHECKED: string;
            DROPPANEL: string;
            TRANSFERPANEL: string;
        };
    };
    buttonTexts: {
        type: ArrayConstructor;
        default: () => never[];
    };
    columns: ArrayConstructor;
    leftColumns: ArrayConstructor;
    rightColumns: ArrayConstructor;
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    dropConfig: ObjectConstructor;
    filterMethod: FunctionConstructor;
    filterPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    filterable: BooleanConstructor;
    format: {
        type: ObjectConstructor;
        default: () => {};
    };
    leftDefaultChecked: {
        type: ArrayConstructor;
        default: () => never[];
    };
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
    };
    pagerOp: {
        type: ObjectConstructor;
        default: () => {
            mode: string;
            pageVO: {
                currentPage: number;
                pageSize: number;
            };
        };
    };
    props: {
        type: ObjectConstructor;
        default: () => {
            label: string;
            key: string;
            disabled: string;
        };
    };
    render: ObjectConstructor;
    renderContent: FunctionConstructor;
    renderType: StringConstructor;
    rightDefaultChecked: {
        type: ArrayConstructor;
        default: () => never[];
    };
    showAllBtn: BooleanConstructor;
    showPager: {
        type: BooleanConstructor;
        default: boolean;
    };
    targetOrder: {
        type: StringConstructor;
        default: string;
    };
    titles: {
        type: ArrayConstructor;
        default: () => never[];
    };
    toLeftDisable: {
        type: BooleanConstructor;
        default: boolean;
    };
    toRightDisable: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeOp: ObjectConstructor;
    beforeTransfer: FunctionConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

/** 生成全量数据对应的一个大对象 */
declare const getObj: (props: ITransferProps) => () => unknown;
/** 返回左边的数据项 */
declare const getSourceData: ({ props, Tree }: Pick<ITransferRenderlessParams, "props"> & {
    Tree: string;
}) => () => unknown[];
/** 返回右边的数据项 */
declare const getTargetData: ({ props, state, Tree, Table }: Pick<ITransferRenderlessParams, "props" | "state"> & {
    Tree: string;
    Table: string;
}) => () => unknown;
declare const onSourceCheckedChange: ({ emit, state }: Pick<ITransferRenderlessParams, 'emit' | 'state'>) => (val: string[], movedKeys: string[]) => void;
declare const onTargetCheckedChange: ({ emit, state }: Pick<ITransferRenderlessParams, 'emit' | 'state'>) => (val: string[], movedKeys: string[]) => void;
declare const addToLeft: ({ emit, props, state }: Pick<ITransferRenderlessParams, 'emit' | 'props' | 'state'>) => (value: undefined | 'all') => void;
declare const addToRight: ({ emit, refs, props, state, Tree }: Pick<ITransferRenderlessParams, "emit" | "props" | "state" | "refs"> & {
    Tree: string;
}) => (value: undefined | 'all') => void;
declare const clearQuery: (refs: ITransferRenderlessParams['refs']) => (which: 'left' | 'right') => void;
/** SortableJs 插件的回调逻辑， 添加，删除，更新事件后，触发本函数 */
declare const logicFun: ({ props, emit, state, vm }: Pick<ITransferRenderlessParams, 'emit' | 'props' | 'state'>) => ({ event, isAdd, pullMode }: {
    event: any;
    isAdd?: boolean | undefined;
    pullMode?: "sort" | undefined;
}) => void;
/** 组件加载后，给左右面板初始化Sortable的功能 */
declare const sortableEvent: ({ api, droppanel, props, queryDom, refs }: Pick<ITransferRenderlessParams, "props" | "api" | "refs"> & {
    droppanel: string;
    queryDom: string;
}) => () => void;
declare const getLeftCheckedData: ({ props, state }: Pick<ITransferRenderlessParams, 'state' | 'props'>) => () => ITransferData[];
declare const getRightCheckedData: ({ props, state }: Pick<ITransferRenderlessParams, 'state' | 'props'>) => () => ITransferData[];

interface ITransferData {
    key: string;
    label: string;
    disabled: boolean;
    [customProp: string]: any;
}
interface ITransferState {
    /** 左边选中的key的数组 */
    leftChecked: string[];
    /** 右边选中的key的数组 */
    rightChecked: string[];
    leftData: any[];
    rightData: any[];
    dataObj: any;
    /** 左边的全部数据项 */
    sourceData: ITransferData[];
    /** 右边的全部数据 */
    targetData: ITransferData[];
    /** 是否传入了有效的buttonText */
    hasButtonTexts: boolean;
    /** 传递给右面板的 isToLeft 属性 */
    isToLeft: boolean;
    /** 函数。 它传递给2个面板，用于渲染每个数据项 */
    optionRender: any;
}
type ITransferProps = ExtractPropTypes<typeof transferProps>;
type ITransferConstants = typeof $constants;
type ITransferRenderlessParams = ISharedRenderlessFunctionParams<ITransferConstants> & {
    api: ITransferApi;
    state: ITransferState;
    props: ITransferProps;
};
interface ITransferApi {
    state: ITransferState;
    /** 生成全量数据对应的一个大对象 */
    getObj: ReturnType<typeof getObj>;
    clearQuery: ReturnType<typeof clearQuery>;
    getSourceData: ReturnType<typeof getSourceData>;
    addToLeft: ReturnType<typeof addToLeft>;
    getLeftCheckedData: ReturnType<typeof getLeftCheckedData>;
    getRightCheckedData: ReturnType<typeof getRightCheckedData>;
    addToRight: ReturnType<typeof addToRight>;
    onTargetCheckedChange: ReturnType<typeof onTargetCheckedChange>;
    onSourceCheckedChange: ReturnType<typeof onSourceCheckedChange>;
    logicFun: ReturnType<typeof logicFun>;
    getTargetData: ReturnType<typeof getTargetData>;
    sortableEvent: ReturnType<typeof sortableEvent>;
}
type ITransferRenderlessParamUtils = ISharedRenderlessParamUtils<ITransferConstants>;

export { ITransferApi, ITransferConstants, ITransferData, ITransferProps, ITransferRenderlessParamUtils, ITransferRenderlessParams, ITransferState };
