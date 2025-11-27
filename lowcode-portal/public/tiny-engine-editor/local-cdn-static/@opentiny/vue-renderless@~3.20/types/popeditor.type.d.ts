import * as vue from 'vue';
import { ComputedRef, ExtractPropTypes } from 'vue';
import * as _opentiny_vue_common from '@opentiny/vue-common';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    TITLE: string;
    COLUMNS_TYPE: {
        selection: string;
        radio: string;
        index: string;
        width: number;
    };
    GRID_REF: {
        history: string;
        source: string;
    };
    TAG_NAME: string;
    MODAL_WIDTH: {
        multi: number;
        radio: number;
    };
    ACTIVE_NAME: {
        history: string;
        source: string;
    };
    TYPE_GRID: string;
    TYPE_TREE: string;
    ID: string;
    LABEL: string;
};
declare const popeditorProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            TITLE: string;
            COLUMNS_TYPE: {
                selection: string;
                radio: string;
                index: string;
                width: number;
            };
            GRID_REF: {
                history: string;
                source: string;
            };
            TAG_NAME: string;
            MODAL_WIDTH: {
                multi: number;
                radio: number;
            };
            ACTIVE_NAME: {
                history: string;
                source: string;
            };
            TYPE_GRID: string;
            TYPE_TREE: string;
            ID: string;
            LABEL: string;
        };
    };
    modelValue: {
        type: (StringConstructor | ArrayConstructor | NumberConstructor)[];
        default: string;
    };
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: StringConstructor;
    trigger: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: ObjectConstructor;
        default(): vue.Raw<_opentiny_vue_common.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<_opentiny_vue_common.ExtractPropTypes<{}>>, {}, {}>>;
    };
    iconSearch: {
        type: ObjectConstructor;
        default(): vue.Raw<_opentiny_vue_common.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<_opentiny_vue_common.ExtractPropTypes<{}>>, {}, {}>>;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    textField: {
        type: StringConstructor;
        default: string;
    };
    textSplit: {
        type: StringConstructor;
        default: string;
    };
    valueField: {
        type: StringConstructor;
        default: string;
    };
    valueSplit: {
        type: StringConstructor;
        default: string;
    };
    popseletor: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    conditions: {
        type: ArrayConstructor;
        default(): never[];
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    gridOp: {
        type: ObjectConstructor;
        default(): {
            columns: never[];
            data: never[];
        };
    };
    remoteSearch: FunctionConstructor;
    dataset: ObjectConstructor;
    alwaysLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeOp: {
        type: ObjectConstructor;
        default(): {
            data: never[];
        };
    };
    pagerOp: {
        type: ObjectConstructor;
        default(): {};
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    multi: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClearBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPager: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHistory: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoLookup: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeReset: FunctionConstructor;
    resize: {
        type: BooleanConstructor;
        default: boolean;
    };
    dialogClass: {
        type: StringConstructor;
        default: string;
    };
    textRenderSource: FunctionConstructor;
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    suggest: BooleanConstructor;
    beforeClose: {
        type: FunctionConstructor;
        default: () => () => boolean;
    };
    showSelectedBox: BooleanConstructor;
    selectedBoxOp: {
        type: ObjectConstructor;
        default: () => {};
    };
    tooltipConfig: {
        type: ObjectConstructor;
        default: () => {};
    };
    autoReset: {
        type: BooleanConstructor;
        default: boolean;
    };
    radioChangeClose: {
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

interface IPopeditorState {
    showContent: boolean;
    open: boolean;
    display: string;
    getTitle: ComputedRef<string>;
    readonly: ComputedRef<boolean>;
    modalWidth: ComputedRef<string>;
    conditions: string;
    activeName: string;
    commitValue: string;
    currentPage: number;
    baseColumns: number;
    selectedDatas: Array<string>;
    selectedValues: Array<string>;
    sourceGridDataset: Array<object>;
    fullGridData: Array<object>;
    historyGridDataset: Array<object>;
    filterText: string;
    treeOp: ComputedRef<string>;
    theme: string;
    pagerConfig: object;
    loading: boolean;
    treeSelectList: Array<object>;
    radioConfig: object;
    searchOp: object;
    cacheStore: object;
    formDisabled: ComputedRef<boolean>;
    disabled: boolean;
    suggestList: Array<object>;
    showSuggestPanel: boolean;
    inputHover: boolean;
    search: null;
    closeSuggestPanelInvoker: null;
}
type IPopeditorProps = ExtractPropTypes<typeof popeditorProps>;
type IPopeditorConstants = typeof $constants;
type IPopeditorRenderlessParams = ISharedRenderlessFunctionParams<IPopeditorConstants> & {
    state: IPopeditorState;
    props: IPopeditorProps;
    constants: IPopeditorConstants;
};
interface IPopeditorApi {
    state: IPopeditorState;
    computedGetIcon: () => string;
    computedGetTitle: () => string;
    handleClose: () => void;
    handleHeaderClick: () => void;
}
type IPopeditorRenderlessParamUtils = ISharedRenderlessParamUtils<IPopeditorConstants> & {
    constants: IPopeditorConstants;
};

export { IPopeditorApi, IPopeditorConstants, IPopeditorProps, IPopeditorRenderlessParamUtils, IPopeditorRenderlessParams, IPopeditorState };
