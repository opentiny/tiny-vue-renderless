import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    SCROLL_LOCK_CLASS(mode: string): string;
    DEFAULT_WIDTH: string;
    DEFAULT_HEIGHT: string;
};
declare const drawerProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            SCROLL_LOCK_CLASS(mode: string): string;
            DEFAULT_WIDTH: string;
            DEFAULT_HEIGHT: string;
        };
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    placement: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
    };
    height: {
        type: StringConstructor;
    };
    title: StringConstructor;
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dragable: BooleanConstructor;
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    flex: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    beforeClose: FunctionConstructor;
    tipsProps: ObjectConstructor;
    customSlots: ObjectConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const computedWidth: ({ state, designConfig, props, constants }: Pick<IDrawerRenderlessParams, 'state' | 'designConfig' | 'props' | 'constants'>) => () => string;
declare const close: ({ api }: {
    api: IDrawerApi;
}) => (force?: boolean) => void;
declare const watchVisible: ({ state, api }: Pick<IDrawerRenderlessParams, 'state' | 'api'>) => (value: boolean) => void;
declare const open: ({ state, emit, vm }: Pick<IDrawerRenderlessParams, 'state' | 'emit' | 'vm'>) => () => void;
declare const confirm: ({ api }: {
    api: IDrawerApi;
}) => () => void;
declare const handleClose: ({ emit, props, state }: Pick<IDrawerRenderlessParams, 'emit' | 'props' | 'state'>) => (type: string, force?: boolean) => void;
declare const mousedown: ({ state, vm }: {
    vm: ISharedRenderlessParamUtils<IDrawerCT>['vm'];
    state: IDrawerState;
}) => (event: any) => void;
declare const mousemove: ({ state, props, emit }: Pick<IDrawerRenderlessParams, 'state' | 'props' | 'emit'>) => EventListenerOrEventListenerObject;
declare const mouseup: ({ state }: {
    state: IDrawerState;
}) => (event: MouseEvent) => void;
declare const addDragEvent: ({ api, vm }: {
    api: IDrawerApi;
    vm: ISharedRenderlessParamUtils<IDrawerCT>['vm'];
}) => () => void;
declare const removeDragEvent: ({ api, vm }: {
    api: IDrawerApi;
    vm: ISharedRenderlessParamUtils<IDrawerCT>['vm'];
}) => () => void;
declare const showScrollbar: (lockScrollClass: string) => () => void;
declare const hideScrollbar: (lockScrollClass: string) => () => void;

interface IDrawerState {
    visible: boolean;
    width: number;
    height: number;
    dragEvent: {
        x: number;
        y: number;
        isDrag: boolean;
        offsetWidth: number;
        offsetHeight: number;
    };
    computedWidth: string;
}
type IDrawerProps = ExtractPropTypes<typeof drawerProps>;
interface IDrawerApi {
    state: IDrawerState;
    open: ReturnType<typeof open>;
    confirm: ReturnType<typeof confirm>;
    close: ReturnType<typeof close>;
    mousemove: ReturnType<typeof mousemove>;
    mouseup: ReturnType<typeof mouseup>;
    mousedown: ReturnType<typeof mousedown>;
    addDragEvent: ReturnType<typeof addDragEvent>;
    removeDragEvent: ReturnType<typeof removeDragEvent>;
    watchVisible: ReturnType<typeof watchVisible>;
    showScrollbar: ReturnType<typeof showScrollbar>;
    hideScrollbar: ReturnType<typeof hideScrollbar>;
    computedWidth: ReturnType<typeof computedWidth>;
    handleClose: ReturnType<typeof handleClose>;
}
type IDrawerCT = ReturnType<typeof drawerProps._constants.default>;
type IDrawerConstants = typeof $constants;
type IDrawerRenderlessParams = ISharedRenderlessFunctionParams<IDrawerConstants> & {
    api: IDrawerApi;
    state: IDrawerState;
    props: IDrawerProps;
};
type IDrawerRenderlessParamUtils = ISharedRenderlessParamUtils<IDrawerConstants>;

export { IDrawerApi, IDrawerCT, IDrawerConstants, IDrawerProps, IDrawerRenderlessParamUtils, IDrawerRenderlessParams, IDrawerState };
