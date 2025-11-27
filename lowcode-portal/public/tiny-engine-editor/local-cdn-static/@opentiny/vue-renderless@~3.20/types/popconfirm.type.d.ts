import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    PC_PREFIXCLS: string;
    MOBILE_PREFIXCLS: string;
    Mode: string;
    prefixcls(mode: any): any;
    ICON_MAP: {
        success: string;
        error: string;
        info: string;
        warning: string;
    };
};
declare const popConfirmProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            PC_PREFIXCLS: string;
            MOBILE_PREFIXCLS: string;
            Mode: string;
            prefixcls(mode: any): any;
            ICON_MAP: {
                success: string;
                error: string;
                info: string;
                warning: string;
            };
        };
    };
    message: StringConstructor;
    customClass: StringConstructor;
    popperOptions: ObjectConstructor;
    trigger: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    cancelButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickOutside: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: StringConstructor;
    placement: {
        type: StringConstructor;
        default: string;
    };
    width: (StringConstructor | NumberConstructor)[];
    type: (StringConstructor | ObjectConstructor)[];
    reference: {};
    events: ObjectConstructor;
    popperAppendToBody: {
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

declare const hide: ({ state, emit }: Pick<IPopconfirmRenderlessParams, 'state' | 'emit'>) => () => void;
declare const show: ({ state, props, emit }: Pick<IPopconfirmRenderlessParams, 'state' | 'props' | 'emit'>) => (trigger: any) => void;
declare const confirm: ({ state, api }: Pick<IPopconfirmRenderlessParams, 'state' | 'api'>) => () => void;
declare const handleEmit: ({ state, emit, vm }: Pick<IPopconfirmRenderlessParams, 'state' | 'emit' | 'vm'>) => (type: any) => void;

interface IPopconfirmState {
    isLock: boolean;
    showPopover: boolean;
    getIcon: string;
}
type IPopconfirmProps = ExtractPropTypes<typeof popConfirmProps>;
type IPopconfirmConstants = typeof $constants;
type IPopconfirmRenderlessParams = ISharedRenderlessFunctionParams<IPopconfirmConstants> & {
    api: IPopconfirmApi;
    state: IPopconfirmState;
    props: IPopconfirmProps;
};
interface IPopconfirmApi {
    state: IPopconfirmState;
    show: ReturnType<typeof show>;
    hide: ReturnType<typeof hide>;
    confirm: ReturnType<typeof confirm>;
    handleEmit: ReturnType<typeof handleEmit>;
}
type IPopconfirmRenderlessParamUtils = ISharedRenderlessParamUtils<IPopconfirmConstants>;

export { IPopconfirmApi, IPopconfirmConstants, IPopconfirmProps, IPopconfirmRenderlessParamUtils, IPopconfirmRenderlessParams, IPopconfirmState };
