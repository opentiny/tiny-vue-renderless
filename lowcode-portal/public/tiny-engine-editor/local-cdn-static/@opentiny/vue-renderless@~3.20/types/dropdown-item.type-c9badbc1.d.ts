import { ExtractPropTypes, ComponentPublicInstance, ComputedRef } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';
import { IDropdownVm } from './dropdown.type.js';

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
declare const $constants: {
    ICON_MAP: {
        leftWardArrow: string;
    };
};
declare const dropdownItemProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            ICON_MAP: {
                leftWardArrow: string;
            };
        };
    };
    icon: (StringConstructor | ObjectConstructor)[];
    disabled: BooleanConstructor;
    divided: BooleanConstructor;
    itemData: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    title: StringConstructor;
    label: StringConstructor;
    level: StringConstructor;
    titleClass: StringConstructor;
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    selected: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedField: {
        type: StringConstructor;
        default: string;
    };
    multiStage: {
        type: BooleanConstructor;
        default: boolean;
    };
    currentIndex: {
        type: NumberConstructor;
        default: () => number;
    };
    tooltipContent: {
        type: StringConstructor;
        default: string;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    textField: {
        type: StringConstructor;
        default: string;
    };
    tip: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    tipPosition: {
        type: StringConstructor;
        default: string;
    };
    effect: {
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
declare const dropdownMenuProps: {
    multiStage: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkedStatus: {
        type: BooleanConstructor;
        default: boolean;
    };
    visibleArrow: BooleanConstructor;
    arrowOffset: {
        type: NumberConstructor;
        default: number;
    };
    placement: StringConstructor;
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeColor: StringConstructor;
    closeOnClickOutside: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    overlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: (StringConstructor | NumberConstructor)[];
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    textField: {
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

type IDropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>;
interface IDropdownMenuState {
    offset: number;
    scroller: null | HTMLElement;
    children: IDropdownItemVm[];
    size: string;
    showPopper: boolean;
    label: string;
    showContent: boolean;
    selected: boolean;
    selectedIndex: number;
}
interface IDropdownMenuApi {
    state: IDropdownMenuState;
    toggleItem: (active: boolean, item: any) => void;
    clickOutside: () => void;
    updateOffset: () => void;
    mounted: () => void;
    handleMouseenter: ($event: MouseEvent) => void;
    handleMouseleave: ($event: MouseEvent) => void;
    handleMenuItemClick: (itemData: object, instance: ComponentPublicInstance, label: string, showContent: boolean, isDisabled: boolean) => void;
    doDestroy: () => void;
}
type IDropdownMenuRenderlessParams = ISharedRenderlessFunctionParams<null> & {
    state: IDropdownMenuState;
    props: IDropdownMenuProps;
    api: IDropdownMenuApi;
};
type IDropdownMenuRenderlessParamUtils = ISharedRenderlessParamUtils<null>;
interface IDropdownMenuPopperParams {
    api: IDropdownMenuApi;
    props: IDropdownMenuProps;
    hooks: Pick<IDropdownMenuRenderlessParams, 'reactive' | 'provide' | 'onMounted' | 'inject' | 'nextTick' | 'onBeforeUnmount' | 'onDeactivated' | 'toRefs' | 'watch'>;
    instance: IDropdownMenuRenderlessParamUtils;
    state: IDropdownMenuState;
    dropdownVm: IDropdownVm;
}
type IDropdownMenuVm = ComponentPublicInstance & {
    state: IDropdownMenuState;
} & IDropdownMenuProps;

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

declare const getTitle: (props: IDropdownItemRenderlessParams['props']) => () => string;
declare const bindScroll: ({ api, parent }: Pick<IDropdownItemRenderlessParams, 'api' | 'parent'>) => (value: any) => void;
declare const toggle: ({ parent, props, state }: Pick<IDropdownItemRenderlessParams, 'parent' | 'props' | 'state'>) => (show: boolean) => void;
declare const onScroll: (parent: IDropdownItemRenderlessParams['parent']) => () => void;
declare const clickWrapper: (parent: IDropdownItemRenderlessParams['parent']) => (event: MouseEvent) => void;
declare const clickItem: ({ emit, props, state }: Pick<IDropdownItemRenderlessParams, 'emit' | 'props' | 'state'>) => (value: string) => void;
declare const getItemStyle: ({ parent, state }: Pick<IDropdownItemRenderlessParams, 'parent' | 'state'>) => () => IDropdownItemStyle;
declare const getOptionStyle: (state: IDropdownItemRenderlessParams['state']) => (tag: IDropdownItemTag, tags: string | Array<number | string>) => IDropdownItemOptionStyle;
declare const closed: ({ emit, state }: Pick<IDropdownItemRenderlessParams, 'emit' | 'state'>) => () => void;
declare const open: (emit: IDropdownItemRenderlessParams['emit']) => () => void;
declare const opened: (emit: IDropdownItemRenderlessParams['emit']) => () => void;
declare const close: (emit: IDropdownItemRenderlessParams['emit']) => () => void;
declare const tagClick: ({ emit, props }: Pick<IDropdownItemRenderlessParams, 'emit' | 'props'>) => (key: number, tag: IDropdownItemTag, event: MouseEvent) => void;
declare const confirm: ({ emit, props, state }: Pick<IDropdownItemRenderlessParams, 'emit' | 'props' | 'state'>) => () => void;
declare const reset: ({ emit, props }: Pick<IDropdownItemRenderlessParams, 'emit' | 'props'>) => () => void;
declare const clickOutside: (parent: IDropdownItemRenderlessParams['parent']) => () => void;
declare const handleClick: ({ state, props, dispatch, vm, emit }: Pick<IDropdownItemRenderlessParams, 'state' | 'props' | 'dispatch' | 'vm' | 'emit'>) => (event: MouseEvent) => void;
declare const computedGetIcon: ({ constants, designConfig }: Pick<IDropdownItemRenderlessParams, 'constants' | 'designConfig'>) => (name?: string) => object | string;
declare const computedTip: ({ props, vm }: Pick<IDropdownItemRenderlessParams, 'props' | 'vm'>) => string;

type IDropdownItemVm = ComponentPublicInstance & {
    type: string;
    toggle: (value: boolean, options?: object) => void;
    state: IDropdownItemState;
} & IDropdownItemProps;
type IDropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>;
type IDropdownItemConstants = typeof $constants;
interface IDropdownItemState {
    checkedStatus: boolean;
    sort: 'asc' | 'desc';
    transition: boolean;
    getTitle: boolean;
    showWrapper: boolean;
    showPopup: boolean;
    duration: number | string;
    overlay: ComputedRef<boolean>;
    offset: ComputedRef<number>;
    direction: ComputedRef<string>;
    displayTitle: ComputedRef<string>;
    itemStyle: ComputedRef<string>;
    activeColor: ComputedRef<string>;
    closeOnClickOverlay: ComputedRef<boolean>;
    dropdownMenuVm: IDropdownMenuVm;
    currentIndex: number;
    textField: string;
    popperClass: string;
    getIcon: ComputedRef<object>;
}
interface IDropdownItemApi {
    state: IDropdownItemState;
    open: ReturnType<typeof open>;
    opened: ReturnType<typeof opened>;
    close: ReturnType<typeof close>;
    getTitle: ReturnType<typeof getTitle>;
    onScroll: ReturnType<typeof onScroll>;
    reset: ReturnType<typeof reset>;
    closed: ReturnType<typeof closed>;
    clickWrapper: ReturnType<typeof clickWrapper>;
    clickOutside: ReturnType<typeof clickOutside>;
    tagClick: ReturnType<typeof tagClick>;
    getOptionStyle: ReturnType<typeof getOptionStyle>;
    toggle: ReturnType<typeof toggle>;
    clickItem: ReturnType<typeof clickItem>;
    getItemStyle: ReturnType<typeof getItemStyle>;
    bindScroll: ReturnType<typeof bindScroll>;
    confirm: ReturnType<typeof confirm>;
    handleClick: ReturnType<typeof handleClick>;
    computedGetIcon: ReturnType<typeof computedGetIcon>;
    computedTip: ReturnType<typeof computedTip>;
}
type IDropdownItemRenderlessParams = ISharedRenderlessFunctionParams<IDropdownItemConstants> & {
    state: IDropdownItemState;
    props: IDropdownItemProps;
    api: IDropdownItemApi;
};
type IDropdownItemRenderlessParamUtils = ISharedRenderlessParamUtils<IDropdownItemConstants>;
interface IDropdownItemStyle {
    zIndex: number;
    top: string;
    bottom: string;
}
interface IDropdownItemTag {
    value: string;
    text: string;
}
interface IDropdownItemOptionStyle {
    color: string;
    border?: string;
}
interface IDropdownItemMfDataStore {
    checkedStatus: boolean;
    multiStageMenu: boolean;
    multiStage: string;
    itemData: object;
    itemLabel: string;
    showContent: boolean;
    dropdownMenuVm: IDropdownMenuVm;
    currentIndex: string;
    level: number;
}

export { IDropdownMenuProps as I, IDropdownMenuState as a, IDropdownMenuApi as b, IDropdownMenuRenderlessParams as c, IDropdownMenuRenderlessParamUtils as d, IDropdownMenuPopperParams as e, IDropdownMenuVm as f, IDropdownItemVm as g, IDropdownItemProps as h, IDropdownItemConstants as i, IDropdownItemState as j, IDropdownItemApi as k, IDropdownItemRenderlessParams as l, IDropdownItemRenderlessParamUtils as m, IDropdownItemStyle as n, IDropdownItemTag as o, IDropdownItemOptionStyle as p, IDropdownItemMfDataStore as q };
