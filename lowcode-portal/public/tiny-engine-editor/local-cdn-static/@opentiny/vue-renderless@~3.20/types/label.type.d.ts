import { ExtractPropTypes, ComputedRef } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const labelProps: {
    label: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    wholeline: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    ellipsis: {
        type: NumberConstructor;
        default: number;
    };
    decimal: {
        type: NumberConstructor;
        default: number;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    bold: {
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

type ILabelProps = ExtractPropTypes<typeof labelProps>;
interface ILabelState {
    label: ComputedRef<string>;
    type: ComputedRef<string>;
    color: ComputedRef<string>;
    size: ComputedRef<string>;
    labelStyle: ComputedRef<object>;
    labelClass: ComputedRef<string>;
    isRequired: ComputedRef<boolean>;
}
interface ILabelApi {
    state: ILabelState;
    handleClick: (event: MouseEvent) => void;
    computeLabel: () => string;
    computeLabelStyle: () => object;
    computeLabelClass: () => [];
}
type ILabelRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    api: ILabelApi;
    state: ILabelState;
    props: ILabelProps;
};
type ILabelRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { ILabelApi, ILabelProps, ILabelRenderlessParamUtils, ILabelRenderlessParams, ILabelState };
