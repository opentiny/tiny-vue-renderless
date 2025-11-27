import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams, ISharedRenderlessParamHooks } from './shared.type.js';

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
declare const $constants: {
    DIALOG_SLIDER_RIGHT: string;
    DIALOG_FADE: string;
    SELECT_DROPDOWN: string;
    DROPDOWN_MENU: string;
    DIALOG_BOX_CLASS: string;
    PC_SCROLL_LOCK_CLASS: string;
    MOBILE_SCROLL_LOCK_CLASS: string;
    Mode: string;
    SCROLL_LOCK_CLASS(mode: any): any;
};
declare const dialogBoxProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            DIALOG_SLIDER_RIGHT: string;
            DIALOG_FADE: string;
            SELECT_DROPDOWN: string;
            DROPDOWN_MENU: string;
            DIALOG_BOX_CLASS: string;
            PC_SCROLL_LOCK_CLASS: string;
            MOBILE_SCROLL_LOCK_CLASS: string;
            Mode: string;
            SCROLL_LOCK_CLASS(mode: any): any;
        };
    };
    appendToBody: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    beforeClose: FunctionConstructor;
    center: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    closeOnPressEscape: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    dialogClass: {
        type: StringConstructor;
        default: () => string;
    };
    draggable: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    dragOutsideWindow: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    isFormReset: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    modal: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    modalAppendToBody: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    resize: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    rightSlide: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    showHeader: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    title: {
        type: StringConstructor;
        default: () => string;
    };
    top: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    width: {
        type: StringConstructor;
        default: () => string;
    };
    maxHeight: {
        type: StringConstructor;
        default: () => string;
    };
    dialogTransition: {
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

declare const computedAnimationName: ({ constants, props }: Pick<IDialogBoxRenderlessParams, 'constants' | 'props'>) => () => string;
declare const computedStyle: ({ props, state, designConfig }: Pick<IDialogBoxRenderlessParams, 'props' | 'state' | 'designConfig'>) => () => IDialogBoxStyle;
declare const watchVisible: ({ api, constants, emit, nextTick, parent, props, vm, state }: Pick<IDialogBoxRenderlessParams, 'api' | 'constants' | 'emit' | 'nextTick' | 'parent' | 'props' | 'vm' | 'state'>) => (val: boolean) => void;
declare const mounted: ({ api, parent, props }: Pick<IDialogBoxRenderlessParams, 'api' | 'parent' | 'props'>) => () => void;
declare const unMounted: ({ api, parent, props }: Pick<IDialogBoxRenderlessParams, 'api' | 'parent' | 'props'>) => () => void;
declare const useMouseEventDown: ({ state }: Pick<IDialogBoxRenderlessParams, 'state'>) => (event: MouseEvent) => void;
declare const useMouseEventUp: ({ state }: Pick<IDialogBoxRenderlessParams, 'state'>) => (event: MouseEvent) => void;
declare const handleWrapperClick: ({ api, props, state }: Pick<IDialogBoxRenderlessParams, 'api' | 'props' | 'state'>) => () => void;
declare const handleClose: ({ api, constants, emit, parent, props }: Pick<IDialogBoxRenderlessParams, 'api' | 'constants' | 'emit' | 'parent' | 'props'>) => (type?: string) => void;
declare const hide: ({ api, emit, state, props }: Pick<IDialogBoxRenderlessParams, 'api' | 'emit' | 'state' | 'props'>) => (cancel?: boolean) => void;
declare const handleConfirm: ({ api, emit }: Pick<IDialogBoxRenderlessParams, 'api' | 'emit'>) => () => void;
declare const handleCancel: ({ api, emit }: Pick<IDialogBoxRenderlessParams, 'api' | 'emit'>) => () => void;
declare const updatePopper: ({ api, constants }: Pick<IDialogBoxRenderlessParams, 'api' | 'constants'>) => () => void;
declare const afterEnter: (emit: IDialogBoxRenderlessParams['emit']) => () => void;
declare const afterLeave: (emit: IDialogBoxRenderlessParams['emit']) => () => void;
declare const handleDrag: ({ parent, props, state, emit, vm }: Pick<IDialogBoxRenderlessParams, 'parent' | 'props' | 'state' | 'emit' | 'vm'>) => (event: MouseEvent) => void;
declare const showScrollbar: (lockScrollClass: string) => () => void;
declare const hideScrollbar: (lockScrollClass: string) => () => void;

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

type IDialogBoxProps = ExtractPropTypes<typeof dialogBoxProps>;
type IDialogBoxConstants = typeof $constants;
interface IDialogBoxState {
    emitter: ReturnType<ISharedRenderlessParamUtils<IDialogBoxConstants>['emitter']>;
    key: number;
    x: number | string | null;
    y: number | string | null;
    top: number | string | null;
    left: number | string | null;
    max: number | string | null;
    move: boolean;
    closed: boolean;
    dragable: boolean;
    isFull: boolean;
    style: {
        [key: string]: string | number;
    };
    bodyStyle: {
        [key: string]: string | number;
    };
    animationName: string;
    opened?: boolean;
    rendered?: boolean;
    mouseUpWrapperFlag: boolean;
    mouseDownWrapperFlag: boolean;
}
interface IDialogBoxApi {
    state: IDialogBoxState;
    open: (options: any) => void;
    close: () => void;
    broadcast: ISharedRenderlessParamUtils<IDialogBoxConstants>['broadcast'];
    handleCancel: ReturnType<typeof handleCancel>;
    handleConfirm: ReturnType<typeof handleConfirm>;
    updatePopper: ReturnType<typeof updatePopper>;
    handleWrapperClick: ReturnType<typeof handleWrapperClick>;
    useMouseEventDown: ReturnType<typeof useMouseEventDown>;
    useMouseEventUp: ReturnType<typeof useMouseEventUp>;
    hide: ReturnType<typeof hide>;
    handleClose: ReturnType<typeof handleClose>;
    watchVisible: ReturnType<typeof watchVisible>;
    computedStyle: ReturnType<typeof computedStyle>;
    mounted: ReturnType<typeof mounted>;
    unMounted: ReturnType<typeof unMounted>;
    computedAnimationName: ReturnType<typeof computedAnimationName>;
    afterEnter: ReturnType<typeof afterEnter>;
    afterLeave: ReturnType<typeof afterLeave>;
    hideScrollbar: ReturnType<typeof hideScrollbar>;
    showScrollbar: ReturnType<typeof showScrollbar>;
    handleDrag: ReturnType<typeof handleDrag>;
}
type IDialogBoxRenderlessParams = ISharedRenderlessFunctionParams<IDialogBoxConstants> & {
    api: IDialogBoxApi;
    props: IDialogBoxProps;
    state: IDialogBoxState;
};
type IDialogBoxRenderlessParamUtils = ISharedRenderlessParamUtils<IDialogBoxConstants>;
type IDialogBoxMergeStateParam = Pick<IDialogBoxRenderlessParams, 'reactive' | 'state' | 'toRefs'> & {
    usePopups: object;
};
type IDialogBoxInitApiParam = Pick<IDialogBoxRenderlessParams, 'api' | 'state' | 'parent' | 'props' | 'emit' | 'constants' | 'nextTick' | 'vm' | 'broadcast'> & {
    usePopups: object;
    lockScrollClass: string;
};
interface IDialogBoxInitWatchParam {
    watch: ISharedRenderlessParamHooks['watch'];
    state: IDialogBoxState;
    api: IDialogBoxApi;
    props: IDialogBoxProps;
}
interface IDialogBoxStyle {
    width?: string | number;
    height?: string | number;
    maxHeight?: string | number;
    top?: string | number;
    right?: string | number;
    left?: string | number;
}

export { IDialogBoxApi, IDialogBoxConstants, IDialogBoxInitApiParam, IDialogBoxInitWatchParam, IDialogBoxMergeStateParam, IDialogBoxProps, IDialogBoxRenderlessParamUtils, IDialogBoxRenderlessParams, IDialogBoxState, IDialogBoxStyle };
