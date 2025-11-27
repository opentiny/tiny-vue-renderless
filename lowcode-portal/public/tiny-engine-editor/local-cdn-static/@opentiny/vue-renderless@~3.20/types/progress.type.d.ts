import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    PROGRESS_TYPE: {
        LINE: string;
        CIRCLE: string;
        DASHBOARD: string;
    };
    PROGRESS_SIZE: {
        SMALL: string;
        MEDIUM: string;
        LARGE: string;
    };
    PROGRESS_SIZE_WIDTH: {
        SMALL: number;
        MEDIUM: number;
        LARGE: number;
    };
    PROGRESS_STATUS: {
        DEFAULT: string;
        SUCCESS: string;
        EXCEPTION: string;
        WARNING: string;
    };
    STATUS_TO_COLOR: {
        success: string;
        exception: string;
        warning: string;
    };
    STATUS_DEFAULT_COLOR: string;
    ICON_CIRCLE_WARNING: string;
    ICON_CIRCLE_SUCCESS: string;
    ICON_CIRCLE_EXCEPTION: string;
    ICON_SUCCESS: string;
    ICON_EXCEPTION: string;
    ICON_WARNING: string;
    TEXT_XS: number;
    TEXT_SM: number;
    WIDTH_RATE_TWO: number;
    WIDTH_RATE_THREE: number;
    WIDTH_RATE_SIX: number;
    DEFAULT_STROKE_WIDTH: number;
    REL_STROKE_WIDTH: number;
    DEFAULT_WIDTH: number;
    STROKE_WIDTH_RATE: number;
};
declare const progressProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            PROGRESS_TYPE: {
                LINE: string;
                CIRCLE: string;
                DASHBOARD: string;
            };
            PROGRESS_SIZE: {
                SMALL: string;
                MEDIUM: string;
                LARGE: string;
            };
            PROGRESS_SIZE_WIDTH: {
                SMALL: number;
                MEDIUM: number;
                LARGE: number;
            };
            PROGRESS_STATUS: {
                DEFAULT: string;
                SUCCESS: string;
                EXCEPTION: string;
                WARNING: string;
            };
            STATUS_TO_COLOR: {
                success: string;
                exception: string;
                warning: string;
            };
            STATUS_DEFAULT_COLOR: string;
            ICON_CIRCLE_WARNING: string;
            ICON_CIRCLE_SUCCESS: string;
            ICON_CIRCLE_EXCEPTION: string;
            ICON_SUCCESS: string;
            ICON_EXCEPTION: string;
            ICON_WARNING: string;
            TEXT_XS: number;
            TEXT_SM: number;
            WIDTH_RATE_TWO: number;
            WIDTH_RATE_THREE: number;
            WIDTH_RATE_SIX: number;
            DEFAULT_STROKE_WIDTH: number;
            REL_STROKE_WIDTH: number;
            DEFAULT_WIDTH: number;
            STROKE_WIDTH_RATE: number;
        };
    };
    color: {
        type: (StringConstructor | FunctionConstructor | ArrayConstructor)[];
        default: string;
    };
    info: StringConstructor;
    format: FunctionConstructor;
    percentage: {
        type: NumberConstructor;
        default: number;
        required: boolean;
        validator: (val: number) => boolean;
    };
    showText: {
        type: BooleanConstructor;
        default: boolean;
    };
    status: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    textInside: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: any) => boolean;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type IProgressProps = ExtractPropTypes<typeof progressProps>;
interface IProgressState {
    percentTextSize: number;
    rate: number;
    radius: number;
    stroke: string;
    content: string;
    barStyle: object;
    trackPath: string;
    perimeter: number;
    iconClass: string;
    iconStyle: object;
    circleStyle: object;
    trailPathStyle: object;
    circlePathStyle: object;
    progressTextSize: number;
    strokeDashoffset: string;
    strokeWidth: number;
    width: number;
    relativeStrokeWidth: number;
}
interface IProgressColorItem {
    color: string;
    progress: number;
}
interface IProgressIconStyle<T> {
    width: T;
    height: T;
}
interface IProgressPathStyle {
    strokeDasharray: string;
    strokeDashoffset: string;
    transition?: string;
}
interface IProgressBarStyle {
    width: string;
    backgroundColor: string;
}
interface IProgressApi {
    state: IProgressState;
    customAppearHook: (el: HTMLElement) => void;
    computedContent: () => string;
    getColorArray: () => IProgressColorItem[];
    computedRate: () => number;
    computedPerimeter: () => number;
    computedRadius: () => number;
    computedTrackPath: () => string;
    computedIconClass: () => string;
    computedIconStyle: () => IProgressIconStyle<number> | object;
    computedCircleStyle: () => IProgressIconStyle<string> | object;
    computedCirclePathStyle: () => IProgressPathStyle;
    computedStrokeDashoffset: () => string;
    computedTrailPathStyle: () => IProgressPathStyle;
    computedRelativeStrokeWidth: () => number;
    computedProgressTextSize: () => number;
    customAfterAppearHook: (el: HTMLElement) => void;
    customBeforeAppearHook: (el: HTMLElement) => void;
    getLevelColor: (p: number) => string;
    computedBarStyle: () => IProgressBarStyle;
    getCurrentColor: (p: number) => string;
    computedStroke: () => string;
}
type IProgressConstants = typeof $constants;
type IProgressRenderlessParamUtils = ISharedRenderlessParamUtils<IProgressConstants> & {
    constants: IProgressConstants;
};
type IProgressRenderlessParams = ISharedRenderlessFunctionParams<IProgressConstants> & {
    state: IProgressState;
    props: IProgressProps;
    api: IProgressApi;
};

export { IProgressApi, IProgressBarStyle, IProgressColorItem, IProgressConstants, IProgressIconStyle, IProgressPathStyle, IProgressProps, IProgressRenderlessParamUtils, IProgressRenderlessParams, IProgressState };
