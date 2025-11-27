import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const floatbarProps: {
    data: ArrayConstructor;
    position: ObjectConstructor;
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

interface IFloatbarItem {
    url: string;
    target: string;
    title: string;
}
type IFloatbarProps = ExtractPropTypes<typeof floatbarProps>;
interface IFloatbarState {
    data: IFloatbarItem[];
}
interface IFloatbarApi {
    state: IFloatbarState;
}
type IFloatbarRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    props: IFloatbarProps;
    state: IFloatbarState;
};
type IFloatbarRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IFloatbarApi, IFloatbarItem, IFloatbarProps, IFloatbarRenderlessParamUtils, IFloatbarRenderlessParams, IFloatbarState };
