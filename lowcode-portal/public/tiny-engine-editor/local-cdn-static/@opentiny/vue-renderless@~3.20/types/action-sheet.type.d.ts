import { CSSProperties, ExtractPropTypes } from 'vue';
import { ISharedRenderlessParamUtils } from './shared.type.js';

declare const actionSheetProps: {
    menus: {
        type: ArrayConstructor;
        default: () => never[];
    };
    modelValue: (StringConstructor | ArrayConstructor | NumberConstructor)[];
    beforeClose: FunctionConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    valueField: {
        type: StringConstructor;
        default: string;
    };
    textField: {
        type: StringConstructor;
        default: string;
    };
    title: StringConstructor;
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    customClass: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    contentClass: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    flex: {
        type: BooleanConstructor;
        default: boolean;
    };
    contentPosition: {
        type: BooleanConstructor;
        default: boolean;
    };
    contentStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

interface IActionSheetState {
    toggle: boolean;
    sheetMaskStyle: CSSProperties;
    sheetContentStyle: CSSProperties;
    scroll: null | object;
}
type IActionSheetProps = ExtractPropTypes<typeof actionSheetProps>;
type IActionSheetRenderlessParamUtils = ISharedRenderlessParamUtils<null>;
interface IActionSheetApi {
    state: IActionSheetState;
    setSheetStyle: ({ state, props }: {
        state: IActionSheetState;
        props: IActionSheetProps;
    }) => void;
    initScrollMenu: ({ state, nextTick, refs, BScroll }: {
        state: IActionSheetState;
        nextTick: IActionSheetRenderlessParamUtils['nextTick'];
        refs: IActionSheetRenderlessParamUtils['refs'];
        BScroll: object;
    }) => void;
    visibleHandle: ({ emit, state }: {
        emit: IActionSheetRenderlessParamUtils['emit'];
        state: IActionSheetState;
    }) => void;
    watchVisible: (value: boolean) => void;
    menuHandle: (item: any) => void;
    confirm: () => void;
    selectOption: (option: any) => void;
    actionSelectOption: (option: any, index: any) => void;
    close: () => void;
    hide: () => void;
}

export { IActionSheetApi, IActionSheetProps, IActionSheetRenderlessParamUtils, IActionSheetState };
