import { PropType, ExtractPropTypes, CSSProperties, ComputedRef } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    TIP_HEIGHT: number;
    BUTTON_SIZE: number;
    HALF_BAR_HEIGHT: number;
    PC_TIP_CLS: string;
    PC_SLIDER_CLS: string;
    PC_RANGE_CLS: string;
    PC_BUTTON_CLS: string;
    PC_LABEL_CLS: string;
    PC_LEFT_SVG_CLS: string;
    PC_RIGHT_SVG_CLS: string;
    MOBILE_TIP_CLS: string;
    MOBILE_SLIDER_CLS: string;
    MOBILE_RANGE_CLS: string;
    MOBILE_BUTTON_CLS: string;
    MOBILE_LEFT_SVG_CLS: string;
    MOBILE_RIGHT_SVG_CLS: string;
    Mode: string;
    tipCls(mode: any): any;
    sliderCls(mode: any): any;
    rangeCls(mode: any): any;
    buttonCls(mode: any): any;
    leftSvgCls(mode: any): any;
    rightSvgCls(mode: any): any;
    TIP_CLS(mode: any): any;
    SLIDER_CLS(mode: any): any;
    RANGE_CLS(mode: any): any;
    BUTTON_CLS(mode: any): any;
};
declare const sliderProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            TIP_HEIGHT: number;
            BUTTON_SIZE: number;
            HALF_BAR_HEIGHT: number;
            PC_TIP_CLS: string;
            PC_SLIDER_CLS: string;
            PC_RANGE_CLS: string;
            PC_BUTTON_CLS: string;
            PC_LABEL_CLS: string;
            PC_LEFT_SVG_CLS: string;
            PC_RIGHT_SVG_CLS: string;
            MOBILE_TIP_CLS: string;
            MOBILE_SLIDER_CLS: string;
            MOBILE_RANGE_CLS: string;
            MOBILE_BUTTON_CLS: string;
            MOBILE_LEFT_SVG_CLS: string;
            MOBILE_RIGHT_SVG_CLS: string;
            Mode: string;
            tipCls(mode: any): any;
            sliderCls(mode: any): any;
            rangeCls(mode: any): any;
            buttonCls(mode: any): any;
            leftSvgCls(mode: any): any;
            rightSvgCls(mode: any): any;
            TIP_CLS(mode: any): any;
            SLIDER_CLS(mode: any): any;
            RANGE_CLS(mode: any): any;
            BUTTON_CLS(mode: any): any;
        };
    };
    formatTooltip: FunctionConstructor;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: (ArrayConstructor | NumberConstructor)[];
        default: number;
    };
    numPages: {
        type: NumberConstructor;
        default: number;
    };
    range: {
        type: BooleanConstructor;
        default: boolean;
    };
    showInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    unit: {
        type: StringConstructor;
        default: string;
    };
    showSteps: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    changeCompat: {
        type: BooleanConstructor;
        default: boolean;
    };
    marks: {
        type: PropType<Record<number, string>>;
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

declare const getActiveButtonValue: (state: ISliderRenderlessParams['state']) => () => number | number[];
interface IMarkListItem {
    value: number;
    label: string;
    percent: number;
    positionStyle: {
        [key: string]: string;
    };
}
declare const getMarkList: ({ props }: Pick<ISliderRenderlessParams, 'props'>) => () => IMarkListItem[];
declare const handleSlotInputFocus: (state: ISliderRenderlessParams['state']) => () => void;
declare const handleSlotInputBlur: ({ state, api }: Pick<ISliderRenderlessParams, 'api' | 'state'>) => () => void;
declare const updateSlotValue: ({ state }: Pick<ISliderRenderlessParams, 'state'>) => () => void;
declare const handleSlotInput: ({ state, api }: Pick<ISliderRenderlessParams, 'api' | 'state'>) => (event: Event, isLeftInput?: boolean) => void;

type ISliderProps = ExtractPropTypes<typeof sliderProps>;
type ISliderConstants = typeof $constants;
interface ISliderState {
    tipStyle: object;
    barStyle: CSSProperties;
    moveStyle: object;
    points: object[];
    labels: object[];
    isDrag: boolean;
    sliderSize: number;
    inputValue: [number, number];
    showTip: boolean;
    activeValue: number;
    activeIndex: number;
    isDouble: boolean;
    leftBtnValue: number;
    sliderOffset: DOMRect | null;
    rightBtnValue: number;
    leftBtnStyle: string;
    leftBtnPercent: number;
    leftBtnShow: true;
    mouseOuterBtn: boolean;
    rightBtnStyle: string;
    rightBtnPercent: number;
    rightBtnShow: boolean;
    innerTrigger: boolean;
    rangeDiff: ComputedRef<number>;
    tipValue: ComputedRef<string>;
    formDisabled: ComputedRef<boolean>;
    disabled: boolean;
    /** 使用这个值作为插槽中输入的值，而不是直接用activeValue，来实现在输入时不会被max min属性计算而改变 */
    slotValue: number | number[] | string;
    /** 是否正在输入 */
    isSlotTyping: boolean;
    markList: ReturnType<ISliderApi['getMarkList']>;
}
interface ISliderApi {
    state: ISliderState;
    hideTip: () => boolean;
    formatTipValue: () => string;
    setBarStyle: () => object;
    changeActiveValue: (value: boolean) => void;
    bindResize: () => void;
    setButtonStyle: () => void;
    calculateValue: (event: Event) => number;
    getActiveButtonValue: ReturnType<typeof getActiveButtonValue>;
    getActiveButtonIndex: (event: Event) => number;
    setTipStyle: () => void;
    customAfterAppearHook: () => void;
    customBeforeAppearHook: () => void;
    bindEvent: () => void;
    autoSlider: () => void;
    unBindEvent: () => void;
    displayTip: () => void;
    bindKeyDown: () => void;
    bindMouseUp: () => void;
    bindMouseMove: () => void;
    bindMouseDown: () => void;
    setActiveButtonValue: (currentValue: number) => void;
    initSlider: (inputValue: number | number[]) => void;
    watchModelValue: () => void;
    watchActiveValue: () => void;
    getPoints: () => void;
    getLabels: () => void;
    inputValueChange: () => void;
    inputOnChange: () => void;
    handleSlotInputFocus: ReturnType<typeof handleSlotInputFocus>;
    handleSlotInputBlur: ReturnType<typeof handleSlotInputBlur>;
    handleSlotInput: ReturnType<typeof handleSlotInput>;
    getMarkList: ReturnType<typeof getMarkList>;
    updateSlotValue: ReturnType<typeof updateSlotValue>;
}
type ISliderRenderlessParams = ISharedRenderlessFunctionParams<ISliderConstants> & {
    state: ISliderState;
    props: ISliderProps;
    api: ISliderApi;
    event: Event;
    currentValue: number;
};
type ISliderRenderlessParamUtils = ISharedRenderlessParamUtils<ISliderConstants>;

export { ISliderApi, ISliderConstants, ISliderProps, ISliderRenderlessParamUtils, ISliderRenderlessParams, ISliderState };
