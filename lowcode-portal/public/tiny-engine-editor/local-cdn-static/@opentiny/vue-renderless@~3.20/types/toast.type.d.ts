import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const toastProps: {
    type: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    time: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    timeout: {
        type: FunctionConstructor;
        default: null;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
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

declare const timeout: (emit: IToastRenderlessParamUtils['emit']) => () => void;

interface IToastState {
    text: string | null;
    type?: string;
    time: number;
}
type IToastProps = ExtractPropTypes<typeof toastProps>;
type IToastRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IToastState;
    props: IToastProps;
};
interface IToastApi {
    state: IToastState;
    timeout: ReturnType<typeof timeout>;
}
type IToastRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IToastApi, IToastProps, IToastRenderlessParamUtils, IToastRenderlessParams, IToastState };
