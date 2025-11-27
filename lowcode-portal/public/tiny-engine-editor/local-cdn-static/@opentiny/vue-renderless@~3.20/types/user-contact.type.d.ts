import { ExtractPropTypes, ref } from 'vue';
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
declare const userContactProps: {
    showName: {
        type: BooleanConstructor;
        default: boolean;
    };
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否显示 roleNumber, colType 为 false 时生效
     */
    showNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否显示 头像
     */
    showImg: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: StringConstructor;
    /**
     * 数据
     */
    data: {
        type: PropType<{
            userName: string;
            imgUrl: string;
            roleNumber: string;
            tools?: any;
            values: undefined | {
                text: string;
                value: string;
            }[];
        }>;
    };
    espace: ArrayConstructor;
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    isNewImMode: {
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
declare const getUserHref: ({ api, props }: {
    api: any;
    props: any;
}) => () => any;
declare const doUserAction: ({ api, props, state, eSpaceCtrl }: {
    api: any;
    props: any;
    state: any;
    eSpaceCtrl: any;
}) => () => void;
declare const initEspaceLink: ({ api, props, state, eSpaceCtrl, eSpaceCtrlDisabled }: {
    api: any;
    props: any;
    state: any;
    eSpaceCtrl: any;
    eSpaceCtrlDisabled: any;
}) => () => void;
declare const openEspace: ({ api, props, eSpaceCtrl }: {
    api: any;
    props: any;
    eSpaceCtrl: any;
}) => () => void;

declare const testUID: (uid: any) => boolean;

type IUserContactProps = ExtractPropTypes<typeof userContactProps>;
interface IUserContactState {
    initialized: boolean;
}
type IUserContactRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    api: IUserContactApi;
    state: IUserContactState;
    props: IUserContactProps;
};
interface IUserContactApi {
    state: IUserContactState;
    testUID: ReturnType<typeof testUID>;
    show: ReturnType<typeof ref>;
    getUserHref: ReturnType<typeof getUserHref>;
    initEspaceLink: ReturnType<typeof initEspaceLink>;
    doUserAction: ReturnType<typeof doUserAction>;
    openEspace: ReturnType<typeof openEspace>;
}
type IUserContactRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { IUserContactApi, IUserContactProps, IUserContactRenderlessParamUtils, IUserContactRenderlessParams, IUserContactState };
