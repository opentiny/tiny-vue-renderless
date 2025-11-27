import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    DEFAULT_COLOR: string;
    DEFAULT_BACK_COLOR: string;
    BOX_SHADOW_PX: string;
    FLAG_CONTENT_CLS: string;
    STATUS_MAP: {
        COMPLETED: string;
        DOING: string;
        BACK: string;
        END: string;
        CANEL: string;
    };
};
declare const milestoneProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            DEFAULT_COLOR: string;
            DEFAULT_BACK_COLOR: string;
            BOX_SHADOW_PX: string;
            FLAG_CONTENT_CLS: string;
            STATUS_MAP: {
                COMPLETED: string;
                DOING: string;
                BACK: string;
                END: string;
                CANEL: string;
            };
        };
    };
    showNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    solid: {
        type: BooleanConstructor;
        default: boolean;
    };
    lineStyle: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    flagBefore: {
        type: BooleanConstructor;
        default: boolean;
    };
    completedField: {
        type: StringConstructor;
        default: string;
    };
    milestonesStatus: {
        type: ObjectConstructor;
        default: () => {};
    };
    statusField: {
        type: StringConstructor;
        default: string;
    };
    nameField: {
        type: StringConstructor;
        default: string;
    };
    flagField: {
        type: StringConstructor;
        default: string;
    };
    flagNameField: {
        type: StringConstructor;
        default: string;
    };
    flagContentField: {
        type: StringConstructor;
        default: string;
    };
    flagStatusField: {
        type: StringConstructor;
        default: string;
    };
    timeField: {
        type: StringConstructor;
        default: string;
    };
    data: (ObjectConstructor | ArrayConstructor)[];
    space: NumberConstructor;
    start: {
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

type IMilestoneProps = ExtractPropTypes<typeof milestoneProps>;
interface IMilestoneState {
    tipContent: string;
}
type IMilestoneConstants = typeof $constants;
type IMilestoneRenderlessParams = ISharedRenderlessFunctionParams<IMilestoneConstants> & {
    state: IMilestoneState;
    props: IMilestoneProps;
    api: IMilestoneApi;
};
interface IMilestonePropsDataFlags {
    content: string;
    name?: string;
    status: string;
}
interface IMilestoneNode {
    name: string;
    status: string;
    time: string;
    flags?: IMilestonePropsDataFlags[];
}
interface IMilestoneIconStyle {
    background: string;
    color: string;
    boxShadow: string;
}
interface IMilestoneFlagStyle {
    left: string;
}
interface IMilestoneGetMileContentParams {
    data: IMilestoneNode[];
    index: number;
}
interface IMilestoneHandleFlagClickParams {
    idx: number;
    flag: IMilestonePropsDataFlags;
}
interface IMilestoneHandleClickParams {
    index: number;
    node: IMilestoneNode;
}
interface IMilestoneFlagOperateParams {
    event: MouseEvent & {
        target: HTMLInputElement;
    };
    over: boolean;
    text: string;
}
interface IMilestoneApi {
    state: IMilestoneState;
    getLineColor: (status: string) => {
        background: string;
    };
    getMileContent: ({ data, index }: IMilestoneGetMileContentParams) => IMilestonePropsDataFlags[];
    handleFlagClick: ({ idx, flag }: IMilestoneHandleFlagClickParams) => void;
    handleClick: ({ index, node }: IMilestoneHandleClickParams) => void;
    getMileIcon: (node: IMilestoneNode) => IMilestoneIconStyle;
    flagOperate: ({ event, over, text }: IMilestoneFlagOperateParams) => void;
    hexToRgb: (hex: string) => {
        r: number;
        g: number;
        b: number;
    };
    getFlagStyle: ({ index, idx }: {
        index: any;
        idx: any;
    }) => IMilestoneFlagStyle;
}
type IMilestoneRenderlessParamUtils = ISharedRenderlessParamUtils<IMilestoneConstants>;

export { IMilestoneApi, IMilestoneConstants, IMilestoneFlagOperateParams, IMilestoneFlagStyle, IMilestoneGetMileContentParams, IMilestoneHandleClickParams, IMilestoneHandleFlagClickParams, IMilestoneIconStyle, IMilestoneNode, IMilestoneProps, IMilestonePropsDataFlags, IMilestoneRenderlessParamUtils, IMilestoneRenderlessParams, IMilestoneState };
