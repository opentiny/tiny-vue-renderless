import * as vue from 'vue';
import { ExtractPropTypes, Component, ComputedRef } from 'vue';
import { ISharedRenderlessParamUtils } from './shared.type.js';

declare const pickerProps: {
    type: {
        type: StringConstructor;
        default: string;
    };
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    timeArrowControl: BooleanConstructor;
    timeEditable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: StringConstructor;
    format: StringConstructor;
    valueFormat: StringConstructor;
    timeFormat: StringConstructor;
    readonly: BooleanConstructor;
    placeholder: StringConstructor;
    startPlaceholder: StringConstructor;
    endPlaceholder: StringConstructor;
    prefixIcon: ObjectConstructor;
    suffixIcon: ObjectConstructor;
    label: StringConstructor;
    shape: StringConstructor;
    tip: StringConstructor;
    clearIcon: {
        type: ObjectConstructor;
        default(): vue.Raw<vue.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{}>>, {}, {}>>;
    };
    name: {
        default: string;
        validator(value: any): boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    changeOnConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: BooleanConstructor;
    id: {
        default: string;
        validator(value: any): boolean;
    };
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {};
    defaultValue: {};
    defaultTime: {};
    rangeSeparator: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    unlinkPanels: BooleanConstructor;
    pickerOptions: {};
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    isRange: BooleanConstructor;
    arrowControl: BooleanConstructor;
    timezoneData: {};
    showTimezone: {
        type: BooleanConstructor;
        default: boolean;
    };
    defaultTimezone: StringConstructor;
    isutc8: {
        type: BooleanConstructor;
        default: boolean;
    };
    dbTimezone: NumberConstructor;
    timezone: NumberConstructor;
    timezoneOffset: NumberConstructor;
    iso8601: BooleanConstructor;
    displayOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    step: {
        type: ObjectConstructor;
        default(): {
            hour: number;
            minute: number;
            second: number;
        };
    };
    showWeekNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    formatWeeks: FunctionConstructor;
    autoFormat: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: StringConstructor;
    blank: {
        type: BooleanConstructor;
        default: boolean;
    };
    changeCompat: {
        type: BooleanConstructor;
        default: boolean;
    };
    nowClick: {
        type: FunctionConstructor;
    };
};

type IPickerProps = ExtractPropTypes<typeof pickerProps>;
interface IPickerApi {
    initGlobalTimezone: () => void;
    setInputPaddingLeft: () => void;
    handleClickIcon: (event: MouseEvent) => void;
    destroyPopper: () => void;
    getValueEmpty: () => boolean;
    computedTriggerClass: () => string;
    getMode: () => string;
    computedHaveTrigger: () => boolean;
    displayValue: () => string;
    parsedValue: () => string | string[];
    firstInputId: () => {
        id: string;
    };
    secondInputId: () => {
        id: string;
    };
    getType: () => string;
    getTimezone: () => {
        from: number;
        to: number;
        isServiceTimezone: boolean;
    };
    getValueFormat: () => string;
    computedFormat: () => string;
    getPanel: (type: string) => Component;
    watchPickerVisible: (value: boolean) => void;
    watchIsRange: (value: boolean) => void;
    watchModelValue: (value: Date | Date[], oldValue: Date | Date[]) => boolean;
    updateOptions: () => void;
}
interface IPickerState {
    picker: HTMLElement | null;
    panel: HTMLElement;
    historyValue: string[];
    historyInput: string[];
    historyUserInput: string[];
    historyUserValue: string[];
    startStatus: boolean;
    endStatus: boolean;
    date: null;
    pickerVisible: boolean;
    showClose: boolean;
    userInput: null;
    valueOnOpen: null;
    popperElm: HTMLElement | null;
    unwatchPickerOptions: null;
    ranged: ComputedRef<boolean>;
    reference: ComputedRef<HTMLElement>;
    formDisabled: ComputedRef<boolean>;
    refInput: ComputedRef<HTMLElement[]>;
    valueIsEmpty: ComputedRef<boolean>;
    triggerClass: ComputedRef<string>;
    selectionMode: ComputedRef<string>;
    haveTrigger: ComputedRef<boolean>;
    displayValue: ComputedRef<string>;
    parsedValue: ComputedRef<string | string[]>;
    pickerSize: ComputedRef<string>;
    pickerDisabled: ComputedRef<boolean>;
    firstInputId: ComputedRef<{
        id: string;
    }>;
    secondInputId: ComputedRef<{
        id: string;
    }>;
    type: ComputedRef<string[]>;
    timezone: ComputedRef<{
        from: number;
        to: number;
        isServiceTimezone: boolean;
    }>;
    valueFormat: ComputedRef<string>;
    format: ComputedRef<string>;
    labelTooltip: string;
    displayOnlyTooltip: string;
    isDisplayOnly: ComputedRef<boolean>;
}
type IPickerRenderlessParamUtils = ISharedRenderlessParamUtils<null>;
interface IPickRenderlessParamExtendOptions {
    TimePanel: Component;
    TimeRangePanel: Component;
}

export { IPickRenderlessParamExtendOptions, IPickerApi, IPickerProps, IPickerRenderlessParamUtils, IPickerState };
