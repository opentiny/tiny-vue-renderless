import { ISharedRenderlessParamUtils } from './shared.type.js';
import { ExtractPropTypes } from 'vue';
import { N as Node, d as ICascaderPanelNodePropValue, a as ICascaderPanelApi } from './cascader-panel.type-8f58e628.js';

declare const cascaderProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            placeholder: string;
            COMPONENT_NAME: {
                FormItem: string;
            };
            EVENT_NAME: {
                FormBlur: string;
                FormChange: string;
            };
            defaultNodeConfig: {
                lazy: boolean;
                load: null;
                isLeaf: string;
                afterLoad: null;
                currentNodeKey: null;
                checkStrictly: boolean;
                checkDescendants: null;
                defaultCheckedKeys: null;
                defaultExpandedKeys: null;
                autoExpandParent: null;
                defaultExpandAll: null;
                filterNodeMethod: null;
            };
        };
    };
    autoSize: BooleanConstructor;
    beforeFilter: {
        type: FunctionConstructor;
        default: () => () => void;
    };
    clearable: BooleanConstructor;
    collapseTags: BooleanConstructor;
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    disabled: BooleanConstructor;
    filterMethod: FunctionConstructor;
    filterable: BooleanConstructor;
    modelValue: {};
    options: ArrayConstructor;
    placeholder: {
        type: StringConstructor;
        default: any;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    popperClass: StringConstructor;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    separator: {
        type: StringConstructor;
        default: string;
    };
    showAllLevels: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: StringConstructor;
    shape: StringConstructor;
    label: StringConstructor;
    tip: StringConstructor;
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    hoverExpand: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: StringConstructor;
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    levelTitle: ArrayConstructor;
    blank: {
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

declare const getConfig: ({ parent, props }: {
    parent: ICascadeRenderlessParamUtils['parent'];
    props: ICascaderProps;
}) => () => Record<string, any>;
declare const computClearVisible: ({ props, state }: {
    props: ICascaderProps;
    state: ICascaderState;
}) => () => boolean;
declare const computePresentContent: ({ api, state }: {
    api: ICascaderApi;
    state: ICascaderState;
}) => () => void;
declare const watchValue: ({ api, state }: {
    api: ICascaderApi;
    state: ICascaderState;
}) => (value: any) => void;
declare const watchCheckedValue: ({ nextTick, constants, dispatch, api, emit, state }: {
    api: ICascaderApi;
    emit: ICascadeRenderlessParamUtils['emit'];
    state: ICascaderState;
}) => (value: any) => void;
declare const selfMounted: ({ api, parent, props, vm, state }: {
    api: ICascaderApi;
    parent: ICascadeRenderlessParamUtils['parent'];
    props: ICascaderProps;
    vm: ICascadeRenderlessParamUtils['vm'];
    state: ICascaderState;
}) => () => void;
declare const toggleDropDownVisible: ({ emit, vm, state, updatePopper }: {
    emit: ICascadeRenderlessParamUtils['emit'];
    vm: ICascadeRenderlessParamUtils['vm'];
    state: ICascaderState;
    updatePopper: (popperElm?: HTMLElement | undefined) => void;
}) => (visible: any) => void;
declare const handleDropdownLeave: (state: any) => () => void;
declare const handleKeyDown: ({ api }: {
    api: any;
}) => (event: any) => void;
declare const handleFocus: (emit: any) => (e: any) => void;
declare const handleBlur: ({ emit, api, props }: {
    emit: any;
    api: any;
    props: any;
}) => (e: any) => void;
declare const handleInput: ({ api, state, vm }: {
    api: any;
    state: any;
    vm: any;
}) => (val: any, event: any) => void;
declare const handleClear: (state: ICascaderState) => (_event: any) => void;
declare const handleExpandChange: ({ constants, dispatch, emit, nextTick, state, updatePopper }: {
    constants: any;
    dispatch: any;
    emit: any;
    nextTick: any;
    state: any;
    updatePopper: any;
}) => (value: any) => void;
declare const focusFirstNode: ({ vm, state }: {
    refs: ICascadeRenderlessParamUtils['refs'];
    state: ICascaderState;
}) => () => void;
declare const computePresentText: ({ props, state }: {
    props: ICascaderProps;
    state: ICascaderState;
}) => () => void;
declare const computePresentTags: ({ api, props, state }: {
    api: ICascaderApi;
    props: ICascaderProps;
    state: ICascaderState;
}) => () => void;
declare const calcCollapseTags: ({ state, vm, nextTick }: {
    state: ICascaderState;
    vm: ICascadeRenderlessParamUtils['vm'];
    nextTick: ICascadeRenderlessParamUtils['nextTick'];
}) => () => void;
declare const watchInputHover: ({ vm }: {
    vm: ICascadeRenderlessParamUtils['vm'];
}) => (newVal: any) => void;
declare const handleMouseenter: ({ vm, state }: {
    vm: ICascadeRenderlessParamUtils['vm'];
    state: ICascaderState;
}) => ($event: any) => void;
declare const handleMouseleave: ({ state }: {
    state: ICascaderState;
}) => () => boolean;
declare const getSuggestions: ({ nextTick, props, state, updatePopper }: {
    nextTick: ICascadeRenderlessParamUtils['nextTick'];
    props: ICascaderProps;
    state: ICascaderState;
    updatePopper: any;
}) => () => void;
declare const handleSuggestionKeyDown: ({ api }: {
    api: ICascaderApi;
}) => (event: any) => void;
declare const handleDelete: ({ api, state }: {
    api: ICascaderApi;
    state: ICascaderState;
}) => () => void;
declare const handleSuggestionClick: ({ api, state }: {
    api: ICascaderApi;
    state: ICascaderState;
}) => (index: number) => void;
declare const deleteTag: ({ emit, state, api }: {
    emit: ICascadeRenderlessParamUtils['emit'];
    state: ICascaderState;
    api: any;
}) => (index: any) => void;
declare const updateStyle: ({ parent, vm, state, updatePopper, nextTick, props }: {
    parent: any;
    vm: any;
    state: any;
    updatePopper: any;
    nextTick: any;
    props: any;
}) => () => void;
declare const getCheckedNodes: (state: ICascaderState) => (leafOnly: boolean) => Node[];
declare const setInputHeightToTag: ({ nextTick, parent, state }: {
    nextTick: ICascadeRenderlessParamUtils['nextTick'];
    parent: ICascadeRenderlessParamUtils['parent'];
    state: ICascaderState;
}) => () => void;
declare const handleBeforeUpdate: ({ props, api, state }: {
    props: ICascaderProps;
    api: ICascaderApi;
    state: ICascaderState;
}) => () => void;
declare const showPlaceholder: ({ props, state, t, constants }: {
    props: ICascaderProps;
    state: ICascaderState;
    t: ICascadeRenderlessParamUtils['t'];
    constants: ICascaderConstants;
}) => () => string;

interface ICascaderState {
    showAutoWidth: boolean;
    /** popper 元素是否显示。 它是通过v-show 绑定到页面上，造成隐藏时，popperJs并没有destory,有一定的性能影响 */
    dropDownVisible: boolean;
    checkedValue: ICascaderPanelNodePropValue;
    inputHover: boolean;
    inputValue: string | null;
    presentText: string | null;
    present: string | null;
    presentTags: Partial<Node & {
        key: string | number;
        text: string;
        closable: boolean;
        hitState: boolean;
    }>[];
    checkedNodes: (Node & {
        text?: string;
    })[];
    filtering: boolean;
    suggestions: Node[];
    inputInitialHeight: number;
    pressDeleteCount: number;
    realSize: 'medium' | 'small' | 'mini';
    formDisabled: boolean;
    displayOnly: boolean;
    disabled: boolean;
    tagSize: 'mini' | 'small';
    isDisabled: boolean;
    isDisplayOnly: boolean;
    config: {
        multiple?: boolean;
        checkStrictly?: boolean;
    };
    multiple: boolean;
    leafOnly: boolean;
    readonly: boolean;
    clearBtnVisible: boolean;
    panel: Element & ICascaderPanelApi;
    placeholder: boolean;
    inputValues: boolean;
    collapseTagsLength: number;
    isHidden: boolean;
    tooltipVisible: boolean;
    tooltipContent: string;
}
type ICascaderProps = ExtractPropTypes<typeof cascaderProps>;
interface ICascaderApi {
    state: ICascaderState;
    handleFocus: ReturnType<typeof handleFocus>;
    handleClear: ReturnType<typeof handleClear>;
    getCheckedNodes: ReturnType<typeof getCheckedNodes>;
    deleteTag: ReturnType<typeof deleteTag>;
    handleDropdownLeave: ReturnType<typeof handleDropdownLeave>;
    focusFirstNode: ReturnType<typeof focusFirstNode>;
    computClearVisible: ReturnType<typeof computClearVisible>;
    showPlaceholder: ReturnType<typeof showPlaceholder>;
    updateStyle: ReturnType<typeof updateStyle>;
    getSuggestions: ReturnType<typeof getSuggestions>;
    handleExpandChange: ReturnType<typeof handleExpandChange>;
    getConfig: ReturnType<typeof getConfig>;
    setInputHeightToTag: ReturnType<typeof setInputHeightToTag>;
    handleSuggestionClick: ReturnType<typeof handleSuggestionClick>;
    handleDelete: ReturnType<typeof handleDelete>;
    computePresentText: ReturnType<typeof computePresentText>;
    handleSuggestionKeyDown: ReturnType<typeof handleSuggestionKeyDown>;
    handleInput: ReturnType<typeof handleInput>;
    handleKeyDown: ReturnType<typeof handleKeyDown>;
    watchValue: ReturnType<typeof watchValue>;
    computePresentTags: ReturnType<typeof computePresentTags>;
    computePresentContent: ReturnType<typeof computePresentContent>;
    watchCheckedValue: ReturnType<typeof watchCheckedValue>;
    toggleDropDownVisible: ReturnType<typeof toggleDropDownVisible>;
    selfMounted: ReturnType<typeof selfMounted>;
    handleBeforeUpdate: ReturnType<typeof handleBeforeUpdate>;
    handleBlur: ReturnType<typeof handleBlur>;
    calcCollapseTags: ReturnType<typeof calcCollapseTags>;
    watchInputHover: ReturnType<typeof watchInputHover>;
    handleMouseenter: ReturnType<typeof handleMouseenter>;
    handleMouseleave: ReturnType<typeof handleMouseleave>;
    filterHandler: Function;
}
type ICascaderConstants = ReturnType<typeof cascaderProps._constants.default>;
type ICascadeRenderlessParamUtils = ISharedRenderlessParamUtils<ICascaderConstants>;

export { ICascadeRenderlessParamUtils, ICascaderApi, ICascaderConstants, ICascaderProps, ICascaderState };
