import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

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
declare function export_default(delay: any, atBegin: any, callback?: Function): Function;

declare const tagGroupProps: {
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    effect: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const handelItemClick: ({ emit }: Pick<ITagGroupRenderlessParamUtils, 'emit'>) => (item: ITagGroupDataItem, index: number, $event: MouseEvent) => void;
declare const getHiddenTags: ({ props, vm, state }: Pick<ITagGroupRenderlessParams, 'props' | 'vm' | 'state'>) => () => void;

interface ITagGroupDataItem {
    name: string;
    type?: string;
}
interface ITagGroupState {
    showMore: boolean;
    hiddenTags: ITagGroupDataItem[];
}
type ITagGroupRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    api: ITagGroupApi;
    state: ITagGroupState;
    props: ITagGroupProps;
};
type ITagGroupProps = ExtractPropTypes<typeof tagGroupProps>;
interface ITagGroupApi {
    state: ITagGroupState;
    getHiddenTags: ReturnType<typeof getHiddenTags>;
    handelItemClick: ReturnType<typeof handelItemClick>;
    debouncedGetHiddenTags?: ReturnType<typeof export_default>;
}
type ITagGroupRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { ITagGroupApi, ITagGroupDataItem, ITagGroupProps, ITagGroupRenderlessParamUtils, ITagGroupRenderlessParams, ITagGroupState };
