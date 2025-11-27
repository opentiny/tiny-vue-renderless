import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    MODAL_STATUS: {
        INFO: string;
        SUCCESS: string;
        WARNING: string;
        ERROR: string;
        LOADING: string;
    };
    NODAL_TYPE: {
        ALERT: string;
        CONFIRM: string;
        MESSAGE: string;
    };
    STATUS_MAPPING_CLASSS: {
        INFO: string;
        SUCCESS: string;
        WARNING: string;
        ERROR: string;
        LOADING: string;
    };
    PC_SCROLL_LOCK_CLASS: string;
    MOBILE_FIRST_SCROLL_LOCK_CLASS: string;
    Mode: string;
    SCROLL_LOCK_CLASS(mode: any): any;
};
declare const modalProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            MODAL_STATUS: {
                INFO: string;
                SUCCESS: string;
                WARNING: string;
                ERROR: string;
                LOADING: string;
            };
            NODAL_TYPE: {
                ALERT: string;
                CONFIRM: string;
                MESSAGE: string;
            };
            STATUS_MAPPING_CLASSS: {
                INFO: string;
                SUCCESS: string;
                WARNING: string;
                ERROR: string;
                LOADING: string;
            };
            PC_SCROLL_LOCK_CLASS: string;
            MOBILE_FIRST_SCROLL_LOCK_CLASS: string;
            Mode: string;
            SCROLL_LOCK_CLASS(mode: any): any;
        };
    };
    animat: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    beforeClose: FunctionConstructor;
    duration: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => number;
    };
    messageClosable: BooleanConstructor;
    escClosable: BooleanConstructor;
    events: ObjectConstructor;
    fullscreen: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    id: StringConstructor;
    isFormReset: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: BooleanConstructor;
    lockView: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    marginSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    mask: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    maskClosable: BooleanConstructor;
    message: (StringConstructor | FunctionConstructor | ObjectConstructor)[];
    minHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => number;
    };
    minWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => number;
    };
    modelValue: BooleanConstructor;
    resize: BooleanConstructor;
    showFooter: BooleanConstructor;
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    status: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    title: StringConstructor;
    top: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    vSize: StringConstructor;
    width: (StringConstructor | NumberConstructor)[];
    zIndex: (StringConstructor | NumberConstructor)[];
    description: StringConstructor;
    options: ArrayConstructor;
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmContent: StringConstructor;
    cancelContent: StringConstructor;
    position: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    customClass: StringConstructor;
    confirmBtnProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    cancelBtnProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    footerDragable: BooleanConstructor;
    tiny_theme: StringConstructor;
    slots: ObjectConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
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

declare const mouseEnterEvent: (state: any) => () => void;
declare const mouseLeaveEvent: ({ api, props, state }: Pick<IModalRenderlessParams, 'api' | 'props' | 'state'>) => () => void;

type zoomLocatType = null | {
    top: number;
    left: number;
    width: number;
    height: number;
};
interface IModalState {
    emitter: ISharedRenderlessParamUtils<never>['emitter'];
    visible: boolean;
    contentVisible: boolean;
    cumsumZindex: number;
    modalTop: number;
    modalZindex: number | string;
    zoomLocat: zoomLocatType;
    isMsg: boolean;
    prevEvent: null | Event;
    options: any[];
    theme: string | undefined;
}
type IModalProps = ExtractPropTypes<typeof modalProps>;
type IModalConstants = typeof $constants;
type IModalRenderlessParams = ISharedRenderlessFunctionParams<IModalConstants> & {
    api: IModalApi;
    state: IModalState;
    props: IModalProps;
};
interface IModalApi {
    state: IModalState;
    broadcast: () => void;
    computedIsMsg: (props: IModalProps) => boolean;
    updateStyle: () => void;
    getBox: () => IModalRenderlessParams['vm'];
    watchValue: (visible: boolean) => void;
    created: () => void;
    mounted: () => void;
    beforeUnmouted: () => void;
    selfClickEvent: (event: MouseEvent) => void;
    mouseEnterEvent: ReturnType<typeof mouseEnterEvent>;
    mouseLeaveEvent: ReturnType<typeof mouseLeaveEvent>;
    updateZindex: () => void;
    handleEvent: (type: string, event: Event, options?: any[]) => void;
    closeEvent: (event: PointerEvent) => void;
    confirmEvent: (event: PointerEvent) => void;
    cancelEvent: (event: PointerEvent) => void;
    open: () => void;
    addMsgQueue: () => void;
    removeMsgQueue: () => void;
    close: (type: string) => void;
    handleGlobalKeydownEvent: (event: KeyboardEvent) => void;
    maximize: () => Promise<void>;
    revert: () => Promise<void>;
    toggleZoomEvent: (event: PointerEvent) => void;
    mousedownEvent: (event: MouseEvent) => void;
    dragEvent: (event: MouseEvent) => void;
    resetDragStyle: () => void;
    resetModalViewPosition: () => void;
}
type IModalRenderlessParamUtils = ISharedRenderlessParamUtils<IModalConstants>;
interface IModalEmitParam {
    type: string;
    $modal: IModalRenderlessParamUtils['parent'];
    options?: any[];
}
type IModalEmitZoomParam = {
    params: IModalEmitParam;
    event: Event;
} & Pick<IModalRenderlessParams, 'parent' | 'emit'>;
interface IModalSizeInfo {
    width: number;
    height: number;
    top: number;
    offsetWidth: number;
    offsetHeight: number;
    visibleWidth: number;
    visibleHeight: number;
    minWidth: number | string;
    minHeight: number | string;
    x: number;
    y: number;
    temp: number;
    offsetLeft: number;
    offsetTop: number;
    marginSize: number | string;
    left: number;
    modalBoxElem: IModalRenderlessParams['vm'];
}
type IModalComputeLeftParam = Pick<IModalSizeInfo, 'width' | 'offsetWidth' | 'x' | 'minWidth' | 'temp' | 'offsetLeft' | 'marginSize' | 'left'>;
type IModalComputeTopParam = Pick<IModalSizeInfo, 'height' | 'offsetHeight' | 'y' | 'minHeight' | 'temp' | 'offsetTop' | 'marginSize' | 'top'>;
type IModalComputeRightParam = Pick<IModalSizeInfo, 'width' | 'offsetWidth' | 'x' | 'minWidth' | 'temp' | 'visibleWidth' | 'offsetLeft' | 'marginSize'>;
type IModalComputeBottomParam = Pick<IModalSizeInfo, 'height' | 'offsetHeight' | 'y' | 'minHeight' | 'temp' | 'visibleHeight' | 'offsetTop' | 'marginSize'>;
type IModalUpdateWlParam = Pick<IModalSizeInfo, 'width' | 'offsetWidth' | 'x' | 'minWidth' | 'temp' | 'offsetLeft' | 'marginSize' | 'left' | 'modalBoxElem'>;
type IModalUpdateWrParam = Pick<IModalSizeInfo, 'width' | 'offsetWidth' | 'x' | 'minWidth' | 'temp' | 'visibleWidth' | 'offsetLeft' | 'marginSize' | 'modalBoxElem'>;
type IModalUpdateStParam = Pick<IModalSizeInfo, 'height' | 'offsetHeight' | 'y' | 'minHeight' | 'temp' | 'offsetTop' | 'marginSize' | 'top' | 'modalBoxElem'>;
type IModalUpdateSbParam = Pick<IModalSizeInfo, 'height' | 'offsetHeight' | 'y' | 'minHeight' | 'temp' | 'visibleHeight' | 'offsetTop' | 'marginSize' | 'modalBoxElem'>;
interface IModalRet {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
}
interface IModalUpdateDeltaParam {
    event: MouseEvent;
    delta: {
        x: number;
        y: number;
    };
    state: IModalRenderlessParams['state'];
}
type IModalDragDirection = 'wl' | 'wr' | 'st' | 'sb' | 'swst' | 'sest' | 'swlb' | 'selb';
interface IModalSetModalBoxStyleParam {
    delta: {
        x: number;
        y: number;
    };
    params: {
        type: IModalDragDirection;
        props: IModalProps;
        disX: number;
        disY: number;
    } & Pick<IModalSizeInfo, 'offsetTop' | 'offsetLeft' | 'visibleHeight' | 'visibleWidth' | 'modalBoxElem'>;
}

export { IModalApi, IModalComputeBottomParam, IModalComputeLeftParam, IModalComputeRightParam, IModalComputeTopParam, IModalConstants, IModalDragDirection, IModalEmitParam, IModalEmitZoomParam, IModalProps, IModalRenderlessParamUtils, IModalRenderlessParams, IModalRet, IModalSetModalBoxStyleParam, IModalState, IModalUpdateDeltaParam, IModalUpdateSbParam, IModalUpdateStParam, IModalUpdateWlParam, IModalUpdateWrParam };
