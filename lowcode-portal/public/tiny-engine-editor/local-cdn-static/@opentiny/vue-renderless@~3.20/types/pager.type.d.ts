import { PropType, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const pagerProps: {
    accurateJumper: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    currentPage: {
        type: NumberConstructor;
        default: () => number;
    };
    disabled: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    hideOnSinglePage: BooleanConstructor;
    isBeforePageChange: BooleanConstructor;
    layout: StringConstructor;
    mode: StringConstructor;
    nextText: StringConstructor;
    pageCount: NumberConstructor;
    pageSize: {
        type: NumberConstructor;
        default: () => number;
    };
    pageSizeText: {
        type: StringConstructor;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
    };
    pagerCount: {
        type: NumberConstructor;
        validator: (value: any) => boolean;
        default: () => number;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    showTotalLoading: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    customTotal: {
        type: (StringConstructor | BooleanConstructor)[];
        default: () => boolean;
    };
    popperClass: StringConstructor;
    prevText: StringConstructor;
    total: NumberConstructor;
    size: {
        type: StringConstructor;
        default: string;
    };
    align: {
        type: StringConstructor;
        validator: (value: any) => boolean;
    };
    totalFixedLeft: {
        type: BooleanConstructor;
        default: undefined;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const computedShowPager: ({ props, state }: Pick<IPagerRenderlessParams, 'props' | 'state'>) => () => boolean;
declare const computedInternalLayout: ({ props }: Pick<IPagerRenderlessParams, 'props'>) => () => string[];
declare const computedTotalText: ({ props, t }: Pick<IPagerRenderlessParams, 'props' | 't'>) => () => string;
declare const computedInternalPageCount: ({ props, state }: Pick<IPagerRenderlessParams, 'props' | 'state'>) => () => number | null;
declare const handleJumperFocus: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (e: Event) => void;
declare const watchInternalCurrentPage: ({ state, emit }: Pick<IPagerRenderlessParams, 'state' | 'emit'>) => (currentPage: number) => void;
declare const watchPageSizes: ({ state, props }: Pick<IPagerRenderlessParams, 'props' | 'state'>) => (newVal: number[]) => void;
declare const watchCurrentPage: ({ state, api }: Pick<IPagerRenderlessParams, 'api' | 'state'>) => (curPage: number) => void;
declare const watchInternalPageCount: ({ state, api }: Pick<IPagerRenderlessParams, 'api' | 'state'>) => (pageCount: number | null) => void;
declare const watchPageSize: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (pageSize: number) => void;
declare const watchTotal: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (total: number | undefined) => void;
declare const watchShowSizes: ({ nextTick, vm }: Pick<IPagerRenderlessParams, 'nextTick' | 'vm'>) => (newVal: boolean) => void;
declare const handleSizeChange: ({ props, state, api, emit, vm }: Pick<IPagerRenderlessParams, 'props' | 'state' | 'api' | 'emit' | 'vm'>) => (val: number) => void;
declare const handleJumperInput: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (e: Event) => void;
declare const handleJumperChange: ({ props, state, api }: Pick<IPagerRenderlessParams, 'props' | 'state' | 'api'>) => () => void;
declare const handleJumperClick: ({ props, state, api }: Pick<IPagerRenderlessParams, 'props' | 'state' | 'api'>) => () => void;
declare const isValueNumber: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => () => boolean;
declare const parseValueNumber: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => () => void;
declare const handleSizeShowPopover: ({ state, props }: Pick<IPagerRenderlessParams, 'props' | 'state'>) => () => void;
declare const handleSizeHidePopover: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => () => void;
declare const canJumperGo: ({ props, state, vm }: Pick<IPagerRenderlessParams, 'props' | 'state' | 'vm'>) => () => boolean;
declare const beforeSizeChangeHandler: ({ state, emit }: Pick<IPagerRenderlessParams, 'emit' | 'state'>) => (params: any) => void;
declare const beforePagerChangeHandler: ({ state, emit }: Pick<IPagerRenderlessParams, 'emit' | 'state'>) => (params: any) => void;
declare const copyEmit: ({ emit }: Pick<IPagerRenderlessParams, 'emit'>) => (...args: any[]) => void;
declare const beforeChangeHandler: ({ state, api }: Pick<IPagerRenderlessParams, 'api' | 'state'>) => (val?: number) => boolean;
declare const handleCurrentChange: ({ state, api }: Pick<IPagerRenderlessParams, 'api' | 'state'>) => (val: number) => void;
declare const prev: ({ state, props, api, emit }: Pick<IPagerRenderlessParams, 'props' | 'state' | 'api' | 'emit'>) => () => void;
declare const next: ({ props, state, api, emit }: Pick<IPagerRenderlessParams, 'props' | 'state' | 'api' | 'emit'>) => () => void;
declare const buildBeforePageChangeParam: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (param: any) => any;
declare const getValidCurrentPage: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (val: string | number) => any;
declare const emitChange: ({ state, nextTick, emit }: Pick<IPagerRenderlessParams, 'emit' | 'state' | 'nextTick'>) => () => void;
declare const setTotal: ({ state }: Pick<IPagerRenderlessParams, 'state'>) => (val: number) => void;
declare const clickSizes: () => (e: Event) => void;

type IPagerProps = ExtractPropTypes<typeof pagerProps>;
interface IPagerState {
    showPager: boolean;
    showSizes: boolean;
    internalCurrentPage: number;
    internalPageSize: number;
    lastEmittedPage: number;
    userChangePageSize: boolean;
    internalTotal: number | undefined;
    jumperValue: string;
    jumperBackup: string;
    internalLayout: string[];
    totalText: string;
    internalPageCount: number | null;
    showJumperSuffix: boolean;
    align: 'left' | 'center' | 'right';
    totalI18n: 'total' | 'totals';
    totalFixedLeft: boolean;
    pageSizeText: string;
}
interface IPagerApi {
    state: IPagerState;
    t: IPagerRenderlessParamUtils['t'];
    computedShowPager: ReturnType<typeof computedShowPager>;
    computedInternalLayout: ReturnType<typeof computedInternalLayout>;
    computedTotalText: ReturnType<typeof computedTotalText>;
    computedInternalPageCount: ReturnType<typeof computedInternalPageCount>;
    handleJumperFocus: ReturnType<typeof handleJumperFocus>;
    handleSizeChange: ReturnType<typeof handleSizeChange>;
    handleJumperInput: ReturnType<typeof handleJumperInput>;
    handleJumperChange: ReturnType<typeof handleJumperChange>;
    handleJumperClick: ReturnType<typeof handleJumperClick>;
    isValueNumber: ReturnType<typeof isValueNumber>;
    parseValueNumber: ReturnType<typeof parseValueNumber>;
    handleSizeShowPopover: ReturnType<typeof handleSizeShowPopover>;
    handleSizeHidePopover: ReturnType<typeof handleSizeHidePopover>;
    canJumperGo: ReturnType<typeof canJumperGo>;
    beforeSizeChangeHandler: ReturnType<typeof beforeSizeChangeHandler>;
    beforePagerChangeHandler: ReturnType<typeof beforePagerChangeHandler>;
    copyEmit: ReturnType<typeof copyEmit>;
    beforeChangeHandler: ReturnType<typeof beforeChangeHandler>;
    handleCurrentChange: ReturnType<typeof handleCurrentChange>;
    prev: ReturnType<typeof prev>;
    next: ReturnType<typeof next>;
    buildBeforePageChangeParam: ReturnType<typeof buildBeforePageChangeParam>;
    getValidCurrentPage: ReturnType<typeof getValidCurrentPage>;
    emitChange: ReturnType<typeof emitChange>;
    setTotal: ReturnType<typeof setTotal>;
    clickSizes: ReturnType<typeof clickSizes>;
    watchInternalCurrentPage: ReturnType<typeof watchInternalCurrentPage>;
    watchPageSizes: ReturnType<typeof watchPageSizes>;
    watchCurrentPage: ReturnType<typeof watchCurrentPage>;
    watchInternalPageCount: ReturnType<typeof watchInternalPageCount>;
    watchPageSize: ReturnType<typeof watchPageSize>;
    watchTotal: ReturnType<typeof watchTotal>;
    watchShowSizes: ReturnType<typeof watchShowSizes>;
}
type IPagerRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    api: IPagerApi;
    state: IPagerState;
    props: IPagerProps;
};
type IPagerRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IPagerApi, IPagerProps, IPagerRenderlessParamUtils, IPagerRenderlessParams, IPagerState };
