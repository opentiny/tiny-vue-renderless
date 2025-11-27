import { ExtractPropTypes, ComputedRef } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    INTERVAL: number;
};
declare const collapseItemProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            INTERVAL: number;
        };
    };
    title: StringConstructor;
    titleRight: StringConstructor;
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default(): any;
    };
    expandIcon: {
        type: (StringConstructor | ObjectConstructor)[];
    };
    disabled: BooleanConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type ICollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
type ICollapseItemConstants = typeof $constants;
interface contentWrapStyleType {
    height: string;
    display: string;
}
interface ICollapseItemState {
    id: string;
    isClick: boolean;
    focusing: boolean;
    contentHeight: number;
    contentWrapStyle: contentWrapStyleType;
    isActive: ComputedRef<boolean>;
}
type ICollapseItemRenderlessParams = ISharedRenderlessFunctionParams<ICollapseItemConstants> & {
    api: ICollapseItemApi;
    state: ICollapseItemState;
    props: ICollapseItemProps;
    constants: ICollapseItemConstants;
    interval: number;
    componentName: string;
    eventName: string;
};
interface ICollapseItemApi {
    state: ICollapseItemState;
    handleFocus: () => void;
    handleEnterClick: () => void;
    handleHeaderClick: () => void;
}
type ICollapseItemRenderlessParamUtils = ISharedRenderlessParamUtils<ICollapseItemConstants>;

export { ICollapseItemApi, ICollapseItemConstants, ICollapseItemProps, ICollapseItemRenderlessParamUtils, ICollapseItemRenderlessParams, ICollapseItemState };
