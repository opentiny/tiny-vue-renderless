import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    DOING_STATUS: string;
    READY_STATUS: string;
    WAIT_STATUS: string;
};
declare const wizardProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            DOING_STATUS: string;
            READY_STATUS: string;
            WAIT_STATUS: string;
        };
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    pageGuide: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeLineFlow: {
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

type IWizardProps = ExtractPropTypes<typeof wizardProps>;
interface IWizardPropsDataNodeValues {
    text: string;
    value: string;
}
interface IWizardPropsDataNode {
    name: string;
    status: string;
    showNode?: boolean;
    content?: string;
    imgUrl?: string;
    users?: string;
    userName?: string;
    roleNumber?: string;
    date?: string;
    values?: IWizardPropsDataNodeValues[];
}
interface IWizardState {
    datas: IWizardProps['data'];
    submitShow: boolean;
    doing: string;
    ready: string;
    wait: string;
    iconYes: 'tiny-icon-yes' | 'tiny-icon-successful';
}
type IWizardConstants = typeof $constants;
type IWizardRenderlessParams = ISharedRenderlessFunctionParams<IWizardConstants> & {
    state: IWizardState;
    props: IWizardProps;
    api: IWizardApi;
};
interface IWizardValue {
    text: string;
    value: number;
}
interface IWizardNodesItem {
    date: string;
    nodeStatus: string;
    showNode: boolean;
    value: IWizardPropsDataNode[];
}
interface IWizardApi {
    state: IWizardState;
    nodeClick: (node: IWizardPropsDataNode, index: number, event: Event) => void;
    showNode: (node: IWizardPropsDataNode, index: number, event: Event) => void;
    nextStepHandle: () => void;
    lastStepHandle: () => void;
    submitHandle: () => void;
    btnSaveHandle: () => void;
    setTimelineflowNodeStatus: (nodes: IWizardNodesItem[]) => void;
    timelineflowData: () => void;
}
type IWizardRenderlessParamUtils = ISharedRenderlessParamUtils<IWizardConstants>;

export { IWizardApi, IWizardConstants, IWizardNodesItem, IWizardProps, IWizardPropsDataNode, IWizardRenderlessParamUtils, IWizardRenderlessParams, IWizardState, IWizardValue };
