import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

declare const popoverProps: {
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    arrowOffset: {
        type: NumberConstructor;
        default: number;
    };
    boundariesPadding: {
        type: NumberConstructor;
        default: number;
    };
    closeDelay: {
        type: NumberConstructor;
        default: number;
    };
    content: StringConstructor;
    disabled: BooleanConstructor;
    modelValue: BooleanConstructor;
    offset: {
        default: number;
    };
    openDelay: {
        type: NumberConstructor;
        default: number;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    popper: {};
    popperClass: StringConstructor;
    popperOptions: {
        type: ObjectConstructor;
        default: () => {
            gpuAcceleration: boolean;
        };
    };
    reference: {};
    tabindex: {
        type: NumberConstructor;
        default: number;
    };
    title: StringConstructor;
    transition: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    visibleArrow: {
        default: boolean;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
    };
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
    };
    listData: (ObjectConstructor | ArrayConstructor)[];
    genArrowByHtml: {
        type: BooleanConstructor;
        default: () => boolean;
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

declare const mounted: ({ api, state, constants, props, nextTick, mode }: Pick<IPopoverRenderlessParams, "mode" | "props" | "state" | "api" | "nextTick"> & {
    constants: {
        IDPREFIX: string;
    };
}) => () => void;
declare const doToggle: (state: IPopoverState) => () => void;
declare const doShow: (state: IPopoverState) => () => void;
declare const doClose: (state: IPopoverState) => () => void;
declare const handleFocus: ({ props, state }: Pick<IPopoverRenderlessParams, 'state' | 'props'>) => () => void;
declare const handleClick: (state: IPopoverState) => (event: MouseEvent) => void;
declare const handleBlur: ({ props, state }: Pick<IPopoverRenderlessParams, 'state' | 'props'>) => () => void;
declare const handleMouseEnter: ({ props, state }: Pick<IPopoverRenderlessParams, 'state' | 'props'>) => () => void;
declare const handleKeydown: ({ api, props }: Pick<IPopoverRenderlessParams, 'api' | 'props'>) => (event: KeyboardEvent) => void;
declare const handleMouseLeave: ({ props, state }: Pick<IPopoverRenderlessParams, 'state' | 'props'>) => () => void;
declare const handleDocumentClick: ({ vm, state }: Pick<IPopoverRenderlessParams, 'state' | 'vm'>) => (event: MouseEvent) => boolean;
declare const handleAfterEnter: (emit: IPopoverRenderlessParams['emit']) => () => void;
declare const handleAfterLeave: (emit: IPopoverRenderlessParams['emit']) => () => void;
/** mobile.vue中，给listData项的点击事件 */
declare const handleItemClick: ({ emit, state }: Pick<IPopoverRenderlessParams, 'state' | 'emit'>) => (item: any) => void;
declare const cleanup: ({ props, state }: Pick<IPopoverRenderlessParams, 'state' | 'props'>) => () => void;
declare const destroyed: ({ state, api }: Pick<IPopoverRenderlessParams, 'state' | 'api'>) => () => void;
declare const computedTooltipId: (constants: {
    IDPREFIX: string;
}) => () => string;
declare const wrapMounted: ({ api, props, vm, state }: Pick<IPopoverRenderlessParams, 'state' | 'api' | 'props' | 'vm'>) => () => void;
declare const observeCallback: ({ state, vm }: Pick<IPopoverRenderlessParams, 'state' | 'vm'>) => (mutationsList: any) => void;

type IPopoverProps = ExtractPropTypes<typeof popoverProps>;
interface IPopoverState {
    popperElm: HTMLElement;
    referenceElm: HTMLElement;
    showPopper: boolean;
    timer: number;
    mounted: boolean;
    xPlacement: string;
    tooltipId: string;
    webCompEventTarget: HTMLElement | null;
}
interface IPopoverApi {
    state: IPopoverState;
    doDestroy: (forceDestroy?: boolean | undefined) => void;
    observer: MutationObserver;
    mounted: ReturnType<typeof mounted>;
    cleanup: ReturnType<typeof cleanup>;
    destroyed: ReturnType<typeof destroyed>;
    computedTooltipId: ReturnType<typeof computedTooltipId>;
    doShow: ReturnType<typeof doShow>;
    doClose: ReturnType<typeof doClose>;
    doToggle: ReturnType<typeof doToggle>;
    handleClick: ReturnType<typeof handleClick>;
    handleAfterEnter: ReturnType<typeof handleAfterEnter>;
    handleBlur: ReturnType<typeof handleBlur>;
    handleFocus: ReturnType<typeof handleFocus>;
    handleKeydown: ReturnType<typeof handleKeydown>;
    handleMouseLeave: ReturnType<typeof handleMouseLeave>;
    handleAfterLeave: ReturnType<typeof handleAfterLeave>;
    handleMouseEnter: ReturnType<typeof handleMouseEnter>;
    handleDocumentClick: ReturnType<typeof handleDocumentClick>;
    wrapMounted: ReturnType<typeof wrapMounted>;
    handleItemClick: ReturnType<typeof handleItemClick>;
    observeCallback: ReturnType<typeof observeCallback>;
}
type IPopoverRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    props: IPopoverProps;
    state: IPopoverState;
    api: IPopoverApi;
    updatePopper: () => void;
};

export { IPopoverApi, IPopoverProps, IPopoverRenderlessParams, IPopoverState };
