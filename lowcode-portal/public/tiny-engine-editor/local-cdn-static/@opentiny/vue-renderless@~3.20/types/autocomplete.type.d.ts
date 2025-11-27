import * as vue from 'vue';
import { Ref, ComputedRef, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const autoCompleteProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            WARP_CLS: string;
            ITEM_CLS: string;
        };
    };
    autofocus: BooleanConstructor;
    clearable: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    customItem: StringConstructor;
    debounce: {
        type: NumberConstructor;
        default: () => number;
    };
    disabled: BooleanConstructor;
    fetchSuggestions: FunctionConstructor;
    hideLoading: BooleanConstructor;
    highlightFirstItem: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    label: StringConstructor;
    maxlength: NumberConstructor;
    minlength: NumberConstructor;
    modelValue: StringConstructor;
    name: StringConstructor;
    placeholder: StringConstructor;
    placement: {
        type: StringConstructor;
        default: () => string;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    popperClass: StringConstructor;
    popperOptions: ObjectConstructor;
    prefixIcon: (StringConstructor | ObjectConstructor)[];
    selectWhenUnmatched: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    size: StringConstructor;
    suffixIcon: (StringConstructor | ObjectConstructor)[];
    triggerOnFocus: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    valueKey: {
        type: StringConstructor;
        default: () => string;
    };
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateEvent: {
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

declare const initSuggestionState: ({ reactive, parent, showPopper, popperElm, referenceElm }: {
    reactive: IAutoCompleteRenderlessParams['reactive'];
    parent: IAutoCompleteRenderlessParamUtils['parent'];
    showPopper: Ref<boolean>;
    popperElm: Ref<HTMLElement>;
    referenceElm: Ref<HTMLElement>;
}) => {
    parent: {
        [x: string]: any;
        $attrs: Record<string, any>;
        $listeners: Record<string, Function>;
        $children: any[];
        $constants: {
            WARP_CLS: string;
            ITEM_CLS: string;
        };
        $el: HTMLElement;
        $mode: "pc" | "mobile-first" | "mobile";
        $nextTick: typeof vue.nextTick;
        $emit: (...args: any[]) => void;
        $off: (eventname?: string | undefined, callback?: Function | undefined) => void;
        $on: (eventname: string, callback: Function) => void;
        $once: (eventname: string, callback: Function) => void;
        $options: {
            componentName: string | undefined;
        };
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>;
        $refs: Record<string, any>;
        $slots: Record<string, Function>;
        $scopedSlots: Record<string, Function>;
        $set: (target: any, propertyName: any, value: any) => void;
        $renderless: Function;
        $template: any;
    };
    dropdownWidth: string;
    showPopper: boolean;
    popperElm: HTMLElement;
    referenceElm: HTMLElement;
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

declare const handleChange: ({ api, emit, state, props, dispatch }: Pick<IAutoCompleteRenderlessParams, 'api' | 'emit' | 'state' | 'props' | 'dispatch'>) => (value: any) => void;
declare const handleFocus: ({ api, emit, props, state }: {
    api: IAutoCompleteApi;
    emit: IAutoCompleteRenderlessParamUtils['emit'];
    state: IAutoCompleteState;
    props: IAutoCompleteProps;
}) => (event: any) => void;
declare const handleBlur: ({ emit, state, dispatch, props }: Pick<IAutoCompleteRenderlessParams, 'emit' | 'state' | 'dispatch' | 'props'>) => () => void;
declare const handleClear: ({ emit, state }: {
    emit: IAutoCompleteRenderlessParamUtils['emit'];
    state: IAutoCompleteState;
}) => () => void;
declare const close: (state: IAutoCompleteState) => () => void;
declare const handleKeyEnter: ({ api, emit, nextTick, props, state }: {
    api: IAutoCompleteApi;
    emit: IAutoCompleteRenderlessParamUtils['emit'];
    nextTick: IAutoCompleteRenderlessParamUtils['nextTick'];
    props: IAutoCompleteProps;
    state: IAutoCompleteState;
}) => (event: any) => void;
declare const select: ({ emit, nextTick, props, state, dispatch }: {
    emit: IAutoCompleteRenderlessParamUtils['emit'];
    nextTick: IAutoCompleteRenderlessParamUtils['nextTick'];
    props: IAutoCompleteProps;
    state: IAutoCompleteState;
}) => (item: any) => void;
declare const highlight: ({ constants, vm, state }: {
    constants: IAutoCompleteConstants;
    state: IAutoCompleteState;
}) => (index: any) => void;
declare const watchVisible: ({ suggestionState, vm }: {
    suggestionState: IAutoCompleteApi['suggestionState'];
}) => (val: any) => void;
declare const mounted: ({ vm, state, suggestionState }: {
    state: IAutoCompleteState;
    suggestionState: IAutoCompleteApi['suggestionState'];
}) => () => void;

interface IAutoCompleteState {
    showAutoWidth: boolean | null;
    popperElm: Element | null;
    activated: boolean;
    suggestions: unknown[];
    loading: boolean;
    highlightedIndex: number;
    suggestionDisabled: boolean;
    id: string;
    suggestionVisible: ComputedRef<boolean>;
    validateEvent: boolean;
}
type IAutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>;
type IAutoCompleteRenderlessParams = ISharedRenderlessFunctionParams<IAutoCompleteConstants> & {
    state: IAutoCompleteState;
    props: IAutoCompleteProps;
    api: IAutoCompleteApi;
};
interface IAutoCompleteApi {
    state: IAutoCompleteState;
    doDestroy: (forceDestroy?: boolean | undefined) => void;
    suggestionState: ReturnType<typeof initSuggestionState>;
    close: ReturnType<typeof close>;
    handleBlur: ReturnType<typeof handleBlur>;
    mounted: ReturnType<typeof mounted>;
    highlight: ReturnType<typeof highlight>;
    handleClear: ReturnType<typeof handleClear>;
    select: ReturnType<typeof select>;
    watchVisible: ReturnType<typeof watchVisible>;
    handleChange: ReturnType<typeof handleChange>;
    handleFocus: ReturnType<typeof handleFocus>;
    handleKeyEnter: ReturnType<typeof handleKeyEnter>;
    debouncedGetData: Function;
}
type IAutoCompleteConstants = ReturnType<typeof autoCompleteProps._constants.default>;
type IAutoCompleteRenderlessParamUtils = ISharedRenderlessParamUtils<IAutoCompleteConstants>;

export { IAutoCompleteApi, IAutoCompleteConstants, IAutoCompleteProps, IAutoCompleteRenderlessParamUtils, IAutoCompleteRenderlessParams, IAutoCompleteState };
