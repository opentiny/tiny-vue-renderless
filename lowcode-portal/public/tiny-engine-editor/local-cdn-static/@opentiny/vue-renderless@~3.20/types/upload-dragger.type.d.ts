import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';
import { I as IFileUploadVm, a as IFileUploadConstants } from './upload-list.type-6189e4c9.js';

declare const UploadDraggerProps: {
    disabled: BooleanConstructor;
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
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

declare const onDragOver: ({ props, state }: Pick<IUploadDraggerRenderlessParams, 'props' | 'state'>) => () => boolean;
declare const onDrop: ({ emit, props, state }: Pick<IUploadDraggerRenderlessParams, 'emit' | 'props' | 'state'>) => (event: DragEvent) => null | boolean | undefined;
declare const watchDragover: ({ state, constants }: Pick<IUploadDraggerRenderlessParams, 'state' | 'constants'>) => () => void;

interface IUploadDraggerState {
    dragover: boolean;
    uploader: IFileUploadVm;
}
interface IUploadDraggerApi {
    state: IUploadDraggerState;
    onDragOver: ReturnType<typeof onDragOver>;
    onDrop: ReturnType<typeof onDrop>;
    watchDragover: ReturnType<typeof watchDragover>;
}
type IUploadDraggerProps = ExtractPropTypes<typeof UploadDraggerProps>;
type IUploadDraggerRenderlessParamUtils = ISharedRenderlessParamUtils<IFileUploadConstants>;
type IUploadDraggerRenderlessParams = ISharedRenderlessFunctionParams<IFileUploadConstants> & {
    state: IUploadDraggerState;
    props: IUploadDraggerProps;
    api: IUploadDraggerApi;
};

export { IUploadDraggerApi, IUploadDraggerProps, IUploadDraggerRenderlessParamUtils, IUploadDraggerRenderlessParams, IUploadDraggerState };
