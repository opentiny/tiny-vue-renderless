import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    COMPONENT_NAME: {
        Collapse: string;
    };
    EVENT_NAME: {
        CollapseItemClick: string;
    };
};
declare const collapseProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            COMPONENT_NAME: {
                Collapse: string;
            };
            EVENT_NAME: {
                CollapseItemClick: string;
            };
        };
    };
    accordion: BooleanConstructor;
    beforeClose: FunctionConstructor;
    modelValue: {
        type: (StringConstructor | ArrayConstructor | NumberConstructor)[];
        default: () => never[];
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

declare const setActiveNames: ({ emit, props, state }: Pick<ICollapseRenderlessParams, 'emit' | 'props' | 'state'>) => (activeNames: string | string[]) => void;
declare const handleItemClick: ({ api, props, state }: Pick<ICollapseRenderlessParams, 'api' | 'props' | 'state'>) => (item?: Object & {
    name: string;
}) => void;

type ICollapseProps = ExtractPropTypes<typeof collapseProps>;
type ICollapseConstants = typeof $constants;
interface ICollapseState {
    activeNames: Array<string>;
}
type ICollapseRenderlessParams = ISharedRenderlessFunctionParams<ICollapseConstants> & {
    api: ICollapseApi;
    state: ICollapseState;
    props: ICollapseProps;
    constants: ICollapseConstants;
};
interface ICollapseApi {
    state: ICollapseState;
    setActiveNames: ReturnType<typeof setActiveNames>;
    handleItemClick: ReturnType<typeof handleItemClick>;
}
type ICollapseRenderlessParamUtils = ISharedRenderlessParamUtils<ICollapseConstants>;

export { ICollapseApi, ICollapseConstants, ICollapseProps, ICollapseRenderlessParamUtils, ICollapseRenderlessParams, ICollapseState };
