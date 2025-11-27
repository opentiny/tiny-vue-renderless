import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    ITEM_NAME: string;
};
declare const userHeadProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            ITEM_NAME: string;
        };
    };
    /**
     * @property {Boolean} [min=false] - 小尺寸模式
     */
    min: BooleanConstructor;
    /**
     * @property {Boolean} [round=true] - 圆形模式
     */
    round: BooleanConstructor;
    /**
     * @property {String} [color=#ffffff] - 文字颜色
     */
    color: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @property {String} [backgroundColor=#BBBBBB] - 背景色
     */
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @property {String} [type=label] - 头像类型，icon|image|label 可选
     */
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * @property {String} - 头像资源
     * type=icon 时为图标类名，type=label时为字体串，type=image时为资源路径
     */
    value: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    /**
     * @property {String} - 头像资源
     * type=icon 时为图标类名，type=label时为字体串，type=image时为资源路径
     */
    modelValue: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    /**
     * @property {Number} - 消息计数
     */
    messageTotal: NumberConstructor;
    /**
     * @property {String} [messageType=details] - 消息类型 details|basic 可选
     */
    messageType: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * @property {Number} [messageUpperLimit=0] - 消息显示上限
     */
    messageUpperLimit: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    /**
     * @property {String} - 头像资源
     * type=icon 时为图标类名，type=label时为字体串，type=image时为资源路径
     */
    tiny_renderless: FunctionConstructor;
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

declare const computedStyle: ({ state, props }: Pick<IUserHeadRenderlessParams, 'state' | 'props'>) => () => {
    fill: string;
    color: string;
    backgroundColor: string;
    backgroundImage: string;
};
declare const computedMessage: ({ props }: Pick<IUserHeadRenderlessParams, 'props'>) => () => string;
declare const computedFontSize: ({ props, state, mode }: Pick<IUserHeadRenderlessParams, 'props' | 'state' | 'mode'>) => () => {
    fontSize: string;
};
declare const computedLabel: ({ state, props }: Pick<IUserHeadRenderlessParams, 'state' | 'props'>) => () => any;
declare const getInternalValue: ({ props }: Pick<IUserHeadRenderlessParams, 'props'>) => () => string | Record<string, any>;

interface IUserHeadState {
    internalValue: string | Record<string, any>;
    label: string;
    style: ReturnType<ReturnType<typeof computedStyle>>;
    message: string;
    fontSize: {
        fontSize: string;
    };
    size: number;
    color: string;
    backgroundColor: string;
}
type IUserHeadProps = ExtractPropTypes<typeof userHeadProps>;
type IUserHeadConstants = typeof $constants;
type IUserHeadRenderlessParams = ISharedRenderlessFunctionParams<IUserHeadConstants> & {
    api: IUserHeadApi;
    state: IUserHeadState;
    props: IUserHeadProps;
};
interface IUserHeadApi {
    state: IUserHeadState;
    computedLabel: ReturnType<typeof computedLabel>;
    computedStyle: ReturnType<typeof computedStyle>;
    computedMessage: ReturnType<typeof computedMessage>;
    computedFontSize: ReturnType<typeof computedFontSize>;
    getInternalValue: ReturnType<typeof getInternalValue>;
    handleClick: (event: Event) => void;
    mouseEnter: (event: Event) => void;
}
type IUserHeadRenderlessParamUtils = ISharedRenderlessParamUtils<IUserHeadConstants>;

export { IUserHeadApi, IUserHeadConstants, IUserHeadProps, IUserHeadRenderlessParamUtils, IUserHeadRenderlessParams, IUserHeadState };
