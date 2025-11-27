import { ComputedRef, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const buttonProps: {
    /** 展示按钮不同的状态，设置为text则展示为文本按钮。可取值为：'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'  */
    type: {
        type: StringConstructor;
        default: string;
    };
    /** 设置原生的tabindex属性 */
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    /** 按钮左侧展示的图标，接收为Icon组件  */
    icon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    /** 按钮显示的文本 */
    text: {
        type: StringConstructor;
        default: string;
    };
    /** 设置按钮禁用时间，防止重复提交，单位毫秒 */
    resetTime: {
        type: NumberConstructor;
        default: number;
    };
    /** 对应按钮原生 type 属性  */
    nativeType: {
        type: StringConstructor;
        default: string;
    };
    /** 当配置href后，点击按钮则更新 location.href 进行页面跳转  */
    href: {
        type: StringConstructor;
        default: string;
    };
    /** 定义按钮尺寸 */
    size: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    /** 是否圆角按钮 */
    round: {
        type: BooleanConstructor;
        default: undefined;
    };
    /** 是否朴素按钮  */
    plain: BooleanConstructor;
    /** 是否圆形按钮  */
    circle: BooleanConstructor;
    /** 是否加载中状态 */
    loading: BooleanConstructor;
    /** 是否被禁用按钮 */
    disabled: BooleanConstructor;
    /** 是否默认聚焦 */
    autofocus: BooleanConstructor;
    /** 自定义类名， 仅 mobile-first 模板时有效 */
    customClass: {
        type: StringConstructor;
        default: string;
    };
    /** 设置通栏按钮,宽度充满水平方向， 仅 mobile-first 模板时有效  */
    banner: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否幽灵按钮 */
    ghost: BooleanConstructor;
    /** 点击事件 */
    onClick: {
        type: PropType<(ev: MouseEvent) => void>;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor; /** 是否圆形按钮  */
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const handleClick: ({ emit, props, state, designConfig }: Pick<IButtonRenderlessParams, 'emit' | 'props' | 'state' | 'designConfig'>) => (event: MouseEvent) => void;
declare const clearTimer: (state: IButtonState) => () => void;

interface IButtonState {
    timer: number;
    disabled: boolean;
    plain: ComputedRef<boolean>;
    round: ComputedRef<boolean>;
    formDisabled: ComputedRef<boolean>;
    buttonDisabled: ComputedRef<boolean>;
}
type IButtonRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IButtonState;
    props: IButtonProps;
};
type IButtonProps = ExtractPropTypes<typeof buttonProps>;
interface IButtonApi {
    state: IButtonState;
    clearTimer: ReturnType<typeof clearTimer>;
    handleClick: ReturnType<typeof handleClick>;
}
type IButtonRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IButtonApi, IButtonProps, IButtonRenderlessParamUtils, IButtonRenderlessParams, IButtonState };
