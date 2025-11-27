import { Component, ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const loadingProps: {
    type: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    loadtext: {
        type: StringConstructor;
        default: () => string;
    };
    _constants: {
        type: ObjectConstructor;
        default: () => {
            TEXT_ATTR: string;
            IS_FULLSCREEN_CLS: string;
            TEXT_SPINNER: string;
            TEXT_BACKGROUND: string;
            TEXT_CUSTOM_CLS: string;
            PARENT_HIDDEN_CLS: string;
            PARENT_RELATIVE_CLS: string;
            LOAD_ICON_TEXT: string;
        };
    };
    loadingImg: {
        type: StringConstructor;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const constants: {
    TEXT_ATTR: string;
    IS_FULLSCREEN_CLS: string;
    TEXT_SPINNER: string;
    TEXT_BACKGROUND: string;
    TEXT_CUSTOM_CLS: string;
    PARENT_HIDDEN_CLS: string;
    PARENT_RELATIVE_CLS: string;
    LOAD_ICON_TEXT: string;
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

declare const handleAfterLeave: (emit: ILoadingRenderlessParamUtils['emit']) => () => void;
declare const setText: (state: ILoadingState) => (text: string) => void;
declare const close: ({ state, constants, vm }: Pick<ILoadingRenderlessParams, 'state' | 'constants' | 'vm'>) => () => void;

interface ILoadingState {
    text: string | null;
    spinner: Component | null;
    visible: boolean;
    customClass: string;
    background: string | null;
    fullscreen: boolean;
    closed: boolean;
    size: string;
    body?: boolean;
    lock?: boolean;
    target?: HTMLElement | string;
    tiny_mode?: string;
    type?: string;
}
type ILoadingProps = ExtractPropTypes<typeof loadingProps>;
type ILoadingConstants = typeof constants;
type ILoadingRenderlessParams = ISharedRenderlessFunctionParams<ILoadingConstants> & {
    state: ILoadingState;
    props: ILoadingProps;
};
interface ILoadingApi {
    state: ILoadingState;
    setText: ReturnType<typeof setText>;
    handleAfterLeave: ReturnType<typeof handleAfterLeave>;
    close: ReturnType<typeof close>;
}
type ILoadingRenderlessParamUtils = ISharedRenderlessParamUtils<ILoadingConstants>;

export { ILoadingApi, ILoadingConstants, ILoadingProps, ILoadingRenderlessParamUtils, ILoadingRenderlessParams, ILoadingState };
