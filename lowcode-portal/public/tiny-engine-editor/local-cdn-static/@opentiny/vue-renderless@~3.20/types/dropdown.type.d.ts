import { ExtractPropTypes, ComponentPublicInstance } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const dropdownProps: {
    modelValue: (StringConstructor | NumberConstructor)[];
    type: StringConstructor;
    trigger: StringConstructor;
    size: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    splitButton: BooleanConstructor;
    singleButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTimeout: {
        type: NumberConstructor;
        default: number;
    };
    hideTimeout: {
        type: NumberConstructor;
        default: number;
    };
    hideOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: {
        type: NumberConstructor;
        default: number;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSelfIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    menuOptions: {
        type: ObjectConstructor;
        default: () => {
            options: never[];
            textField: string;
            popperClass: string;
            placement: string;
        };
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    inheritWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    suffixIcon: ObjectConstructor;
    lazyShowPopper: {
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

type IDropdownProps = ExtractPropTypes<typeof dropdownProps>;
interface IDropdownState {
    visible: boolean;
    timeout: null | NodeJS.Timeout;
    focusing: false;
    menuItems: NodeListOf<HTMLElement> | undefined | null;
    menuItemsArray: HTMLElement[] | null;
    triggerElm: HTMLElement | null;
    dropdownElm: HTMLElement | null;
    listId: string;
    showIcon: boolean;
    showSelfIcon: boolean;
    designConfig: IDropdownRenderlessParamUtils['designConfig'];
}
interface IDropdownApi {
    state: IDropdownState;
    watchVisible: (value: boolean) => void;
    watchFocusing: (value: boolean) => void;
    show: () => void;
    hide: () => void;
    mounted: () => void;
    handleClick: () => void;
    handleTriggerKeyDown: (event: KeyboardEvent) => void;
    handleItemKeyDown: (event: KeyboardEvent) => void;
    resetTabindex: (el: HTMLElement) => void;
    removeTabindex: () => void;
    initAria: () => void;
    initEvent: () => void;
    handleMenuItemClick: () => void;
    handleMainButtonClick: (event: MouseEvent) => void;
    triggerElmFocus: () => void;
    initDomOperation: () => void;
    beforeDistory: () => void;
    clickOutside: () => void;
}
type IDropdownRenderlessParams = ISharedRenderlessFunctionParams<null> & {
    state: IDropdownState;
    props: IDropdownProps;
    api: IDropdownApi;
};
type IDropdownRenderlessParamUtils = ISharedRenderlessParamUtils<null>;
type IDropdownVm = (ComponentPublicInstance & {
    size: string;
    inheritWidth: boolean;
    popperElm: HTMLElement;
    initDomOperation: () => void;
}) | undefined;

export { IDropdownApi, IDropdownProps, IDropdownRenderlessParamUtils, IDropdownRenderlessParams, IDropdownState, IDropdownVm };
