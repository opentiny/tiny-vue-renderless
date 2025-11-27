import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const linkProps: {
    /** 文本链接类型：'primary' | 'success' | 'warning' | 'danger' | 'info' */
    type: {
        type: StringConstructor;
        default: string;
    };
    /** 显示内容 */
    value: StringConstructor;
    /** 是否下划线 */
    underline: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 原生 href 属性 */
    href: StringConstructor;
    /** 自定义图标 */
    icon: (StringConstructor | ObjectConstructor)[];
    /** 是否禁用状态 */
    disabled: BooleanConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type ILinkProps = ExtractPropTypes<typeof linkProps>;
interface ILinkState {
    formDisabled: boolean;
    disabled: boolean;
    href: string;
}
interface ILinkApi {
    state: ILinkState;
    handleClick: (event: MouseEvent) => void;
}
type ILinkRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    api: ILinkApi;
    state: ILinkState;
    props: ILinkProps;
};
type ILinkRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { ILinkApi, ILinkProps, ILinkRenderlessParamUtils, ILinkRenderlessParams, ILinkState };
