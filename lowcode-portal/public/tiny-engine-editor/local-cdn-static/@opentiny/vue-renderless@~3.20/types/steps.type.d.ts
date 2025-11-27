import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const stepsProps: {
    nameField: {
        type: StringConstructor;
        default: string;
    };
    countField: {
        type: StringConstructor;
        default: string;
    };
    statusField: {
        type: StringConstructor;
        default: string;
    };
    data: (ObjectConstructor | ArrayConstructor)[];
    space: (StringConstructor | NumberConstructor)[];
    active: {
        type: NumberConstructor;
        default: number;
    };
    visibleNum: {
        type: NumberConstructor;
        default: number;
    };
    descriptionField: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    advanced: {
        type: BooleanConstructor;
        default: boolean;
    };
    line: BooleanConstructor;
    dot: BooleanConstructor;
    duration: {
        type: NumberConstructor;
        default: number;
    };
    noArrow: BooleanConstructor;
    flex: BooleanConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const updateStartIndex: ({ state, props }: Pick<IStepsRenderlessParams, 'state' | 'props'>) => () => void;
declare const isVisibleHandler: ({ state, props }: Pick<IStepsRenderlessParams, 'state' | 'props'>) => (index: number) => IStepsVisibleConfig;
declare const computedRightNodePos: ({ state, props }: Pick<IStepsRenderlessParams, 'state' | 'props'>) => () => IStepsNodePosConfig[];
declare const handleMouseenter: ({ state, vm }: Pick<IStepsRenderlessParams, 'state' | 'vm'>) => (e: MouseEvent, placement: string) => void;
declare const handleMouseleave: (state: IStepsRenderlessParams['state']) => () => void;

type IStepsProps = ExtractPropTypes<typeof stepsProps>;
type IStepsRenderlessParamUtils = ISharedRenderlessParamUtils<never>;
interface IStepsState {
    startIndex: number;
    endIndex: number;
    rightNodePositions: IStepsNodePosConfig[];
    computedSpace: number | string;
    popoverVisible: boolean;
    popoverContent: string | null;
    popoverPlacement: string;
}
interface IStepsApi {
    state: IStepsState;
    updateStartIndex: ReturnType<typeof updateStartIndex>;
    isVisibleHandler: ReturnType<typeof isVisibleHandler>;
    handleMouseenter: ReturnType<typeof handleMouseenter>;
    handleMouseleave: ReturnType<typeof handleMouseleave>;
    computedRightNodePos: ReturnType<typeof computedRightNodePos>;
}
type IStepsRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    props: IStepsProps;
    state: IStepsState;
    api: IStepsApi;
};
type IStepsVisibleConfig = 'hidden-left' | 'hidden-right' | 'visible';
interface IStepsNodePosConfig {
    zIndex: number;
    right: string;
}

export { IStepsApi, IStepsNodePosConfig, IStepsProps, IStepsRenderlessParamUtils, IStepsRenderlessParams, IStepsState, IStepsVisibleConfig };
