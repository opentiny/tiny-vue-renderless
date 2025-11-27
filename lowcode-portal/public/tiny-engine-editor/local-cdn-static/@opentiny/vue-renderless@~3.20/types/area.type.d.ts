import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils } from './shared.type.js';

declare const areaProps: {
    modelValue: {};
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: StringConstructor;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => {
            label: string;
            value: string;
        };
    };
    fetchJcr: {
        type: FunctionConstructor;
    };
    fetchRegion: {
        type: FunctionConstructor;
    };
    fetchRep: {
        type: FunctionConstructor;
    };
    fetchOffice: {
        type: FunctionConstructor;
    };
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
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
declare const fetchDefaultData: ({ emit, fetchArea, nextTick, props, vm, state }: {
    emit: any;
    fetchArea: any;
    nextTick: any;
    props: any;
    vm: any;
    state: any;
}) => () => void;
declare const getRegion: ({ emit, fetchArea, nextTick, props, vm, state }: {
    emit: any;
    fetchArea: any;
    nextTick: any;
    props: any;
    vm: any;
    state: any;
}) => (value: any) => void;
declare const getRep: ({ emit, fetchArea, nextTick, props, vm, state }: {
    emit: any;
    fetchArea: any;
    nextTick: any;
    props: any;
    vm: any;
    state: any;
}) => (value: any) => void;
declare const getOffice: ({ emit, fetchArea, nextTick, props, vm, state }: {
    emit: any;
    fetchArea: any;
    nextTick: any;
    props: any;
    vm: any;
    state: any;
}) => (value: any) => void;
declare const changeOffice: ({ emit, state }: {
    emit: any;
    state: any;
}) => (value: any) => void;
declare const beforeMount: ({ api, props }: {
    api: any;
    props: any;
}) => () => void;

interface LabeValue {
    label: string;
    value: string;
}
interface IAreaState {
    jcr: string;
    region: string;
    rep: string;
    office: string;
    jcrData: LabeValue[];
    regionData: LabeValue[];
    repData: LabeValue[];
    officeData: LabeValue[];
}
interface IAreaRenderlessParams {
    emit: ISharedRenderlessParamUtils['emit'];
    fetchArea: (args: {
        label: string;
        parent: string;
    }) => Promise<LabeValue[]>;
    nextTick: ISharedRenderlessParamUtils['nextTick'];
    props: IAreaProps;
    refs: ISharedRenderlessParamUtils['refs'];
    state: IAreaState;
}
type IAreaProps = ExtractPropTypes<typeof areaProps>;
interface IAreaApi {
    state: IAreaState;
    changeOffice: ReturnType<typeof changeOffice>;
    beforeMount: ReturnType<typeof beforeMount>;
    getRep: ReturnType<typeof getRep>;
    getRegion: ReturnType<typeof getRegion>;
    getOffice: ReturnType<typeof getOffice>;
    fetchDefaultData: ReturnType<typeof fetchDefaultData>;
}

export { IAreaApi, IAreaProps, IAreaRenderlessParams, IAreaState, LabeValue };
