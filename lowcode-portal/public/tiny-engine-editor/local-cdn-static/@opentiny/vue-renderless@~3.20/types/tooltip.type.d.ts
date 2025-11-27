import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

declare const tooltipProps: {
    visible: {
        type: StringConstructor;
        default: () => string;
        validator: (value: string) => boolean;
    };
    adjustArrow: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    arrowOffset: {
        type: NumberConstructor;
        default: () => number;
    };
    content: {
        type: (StringConstructor | ObjectConstructor)[];
    };
    disabled: {
        type: BooleanConstructor;
    };
    enterable: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    hideAfter: {
        type: NumberConstructor;
        default: () => number;
    };
    manual: {
        type: BooleanConstructor;
    };
    modelValue: {
        type: BooleanConstructor;
    };
    offset: {
        default: () => number;
    };
    effect: {
        type: StringConstructor;
        default: () => string;
    };
    openDelay: {
        type: NumberConstructor;
        default: () => number;
    };
    closeDelay: {
        type: NumberConstructor;
        default: () => number;
    };
    placement: {
        type: StringConstructor;
        default: () => string;
    };
    popper: {};
    popperClass: {
        type: StringConstructor;
    };
    popperOptions: {
        default: () => {};
    };
    pre: {
        type: BooleanConstructor;
    };
    reference: {};
    renderContent: {
        type: FunctionConstructor;
    };
    tabindex: {
        type: NumberConstructor;
        default: () => number;
    };
    transition: {
        type: StringConstructor;
        default: () => string;
    };
    type: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    visibleArrow: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    genArrowByHtml: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    zIndex: {
        type: StringConstructor;
        default: () => string;
    };
    contentMaxHeight: {
        type: StringConstructor;
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

declare const show: ({ api, state, props }: Pick<ITooltipRenderlessParams, 'api' | 'state' | 'props'>) => (event?: MouseEvent) => void;
declare const hide: (api: ITooltipApi) => () => void;
declare const handleFocus: ({ api, state }: Pick<ITooltipRenderlessParams, 'api' | 'state'>) => () => void;
declare const handleBlur: ({ api, state }: Pick<ITooltipRenderlessParams, 'api' | 'state'>) => () => void;
declare const removeFocusing: ({ api, state }: Pick<ITooltipRenderlessParams, 'api' | 'state'>) => () => void;
declare const handleShowPopper: ({ props, state }: Pick<ITooltipRenderlessParams, 'state' | 'props'>) => (delay: number) => void;
declare const handleClosePopper: ({ api, props, state }: Pick<ITooltipRenderlessParams, 'api' | 'state' | 'props'>) => () => void;
declare const handleDocumentClick: ({ props, api, state, popperVmRef }: Pick<ITooltipRenderlessParams, 'api' | 'state' | 'props' | 'popperVmRef'>) => (event: MouseEvent) => void;
declare const setExpectedState: ({ state }: Pick<ITooltipRenderlessParams, 'state'>) => (value: boolean) => void;
declare const destroyed: ({ state, api, vm }: Pick<ITooltipRenderlessParams, 'state' | 'api' | 'vm'>) => () => void;
declare const debounceClose: ({ api, props }: Pick<ITooltipRenderlessParams, 'api' | 'props'>) => Function;
declare const watchFocusing: (state: ITooltipState) => (value: boolean) => void;
declare const focusHandler: ({ slots, api }: Pick<ITooltipRenderlessParams, 'slots' | 'api'>) => () => void;
declare const bindEvent: ({ api, state, vm }: Pick<ITooltipRenderlessParams, 'api' | 'state' | 'vm'>) => (reference: HTMLElement) => void;
declare const observeCallback: ({ state, popperVmRef }: Pick<ITooltipRenderlessParams, 'state' | 'popperVmRef'>) => (mutationsList: any) => void;
declare const bindPopper: ({ vm, nextTick, popperVmRef }: Pick<ITooltipRenderlessParams, 'vm' | 'nextTick' | 'popperVmRef'>) => (el?: Element) => void;

type ITooltipProps = ExtractPropTypes<typeof tooltipProps>;
interface ITooltipState {
    showPopper: boolean;
    popperElm: HTMLElement;
    referenceElm: HTMLElement;
    timeout: number;
    timeoutPending: number;
    focusing: boolean;
    expectedState: boolean;
    tooltipId: string;
    tabindex: number;
    xPlacement: string;
    showContent: boolean;
    tipsMaxWidth: string | number;
}
interface ITooltipApi {
    state: ITooltipState;
    observer: MutationObserver;
    doDestroy: (forceDestroy?: boolean | undefined) => void;
    updatePopper: (popperElm?: HTMLElement | undefined) => void;
    show: ReturnType<typeof show>;
    hide: ReturnType<typeof hide>;
    destroyed: ReturnType<typeof destroyed>;
    bindPopper: ReturnType<typeof bindPopper>;
    watchFocusing: ReturnType<typeof watchFocusing>;
    removeFocusing: ReturnType<typeof removeFocusing>;
    handleBlur: ReturnType<typeof handleBlur>;
    handleFocus: ReturnType<typeof handleFocus>;
    debounceClose: ReturnType<typeof debounceClose>;
    setExpectedState: ReturnType<typeof setExpectedState>;
    handleShowPopper: ReturnType<typeof handleShowPopper>;
    handleClosePopper: ReturnType<typeof handleClosePopper>;
    bindEvent: ReturnType<typeof bindEvent>;
    focusHandler: ReturnType<typeof focusHandler>;
    handleDocumentClick: ReturnType<typeof handleDocumentClick>;
    observeCallback: ReturnType<typeof observeCallback>;
}
type ITooltipRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    props: ITooltipProps;
    state: ITooltipState;
    api: ITooltipApi;
    popperVmRef: {
        popper: HTMLElement;
    };
};

export { ITooltipApi, ITooltipProps, ITooltipRenderlessParams, ITooltipState };
