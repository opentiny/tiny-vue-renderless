import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    EVENT_NAME: {
        breadcrumbItemSelect: string;
    };
};
declare const breadcrumbProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            EVENT_NAME: {
                breadcrumbItemSelect: string;
            };
        };
    };
    separator: {
        type: StringConstructor;
        default: string;
    };
    separatorIcon: {
        type: ObjectConstructor;
    };
    textField: {
        type: StringConstructor;
        default: string;
    };
    size: StringConstructor;
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

interface IBreadcrumbState {
    breadcrumbEmitter: object;
    currentBreadcrumbItem: object;
    size: string | undefined;
}
type IBreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
type IBreadcrumbConstants = typeof $constants;
type IBreadcrumbRenderlessParams = ISharedRenderlessFunctionParams<IBreadcrumbConstants> & {
    state: IBreadcrumbState;
    props: IBreadcrumbProps;
};
interface IBreadcrumbApi {
    state: IBreadcrumbState;
    breadcrumbItemSelect: () => void;
}
type IBreadcrumbRenderlessParamUtils = ISharedRenderlessParamUtils<IBreadcrumbConstants>;

export { IBreadcrumbApi, IBreadcrumbConstants, IBreadcrumbProps, IBreadcrumbRenderlessParamUtils, IBreadcrumbRenderlessParams, IBreadcrumbState };
