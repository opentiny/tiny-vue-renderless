import { ExtractPropTypes, CSSProperties } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    ICON_MAP: {
        success: string;
        error: string;
        info: string;
        warning: string;
        simple: string;
    };
    TITLE_MAP: {
        success: string;
        error: string;
        info: string;
        warning: string;
    };
    CONTENT_MAXHEUGHT: number;
};
declare const alertProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            ICON_MAP: {
                success: string;
                error: string;
                info: string;
                warning: string;
                simple: string;
            };
            TITLE_MAP: {
                success: string;
                error: string;
                info: string;
                warning: string;
            };
            CONTENT_MAXHEUGHT: number;
        };
    };
    icon: (StringConstructor | ObjectConstructor)[];
    type: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
    };
    center: BooleanConstructor;
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeText: {
        type: StringConstructor;
        default: string;
    };
    singleLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrolling: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFoldable: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    offset: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    autoHide: {
        type: BooleanConstructor;
        default: boolean;
    };
    target: {
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

interface IAlertState {
    show: boolean;
    getIcon: string;
    getTitle: string;
    contentVisible: boolean;
    contentDescribeHeight: number;
    contentDefaultHeight: number;
    contentMaxHeight: number;
    scrollStatus: boolean;
}
type IAlertProps = ExtractPropTypes<typeof alertProps>;
type IAlertConstants = typeof $constants;
type IAlertRenderlessParams = ISharedRenderlessFunctionParams<IAlertConstants> & {
    api: IAlertApi;
    state: IAlertState;
    props: IAlertProps;
};
interface IAlertApi {
    state: IAlertState;
    computedGetIcon: () => string;
    computedGetTitle: () => string;
    handleClose: () => void;
    handleHeaderClick: () => void;
    watchAutoHide: (value: boolean) => void;
    computedStyle: () => CSSProperties;
}
type IAlertRenderlessParamUtils = ISharedRenderlessParamUtils<IAlertConstants>;

export { IAlertApi, IAlertConstants, IAlertProps, IAlertRenderlessParamUtils, IAlertRenderlessParams, IAlertState };
