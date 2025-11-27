import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const breadcrumbItemProps: {
    to: ObjectConstructor;
    replace: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: StringConstructor;
    option: {
        type: ObjectConstructor;
        default: () => {};
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type IBreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>;
type IBreadcrumbItemRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    props: IBreadcrumbItemProps;
};
interface IBreadcrumbItemApi {
    state: string | undefined;
    linkClick: (event: MouseEvent) => void;
}
type IBreadcrumbItemRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IBreadcrumbItemApi, IBreadcrumbItemProps, IBreadcrumbItemRenderlessParamUtils, IBreadcrumbItemRenderlessParams };
