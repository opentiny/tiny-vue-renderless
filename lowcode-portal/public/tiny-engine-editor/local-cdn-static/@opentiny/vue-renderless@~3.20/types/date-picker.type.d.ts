import * as vue from 'vue';
import { ExtractPropTypes, ComputedRef } from 'vue';
import * as _opentiny_vue_common from '@opentiny/vue-common';
import { PropType } from '@opentiny/vue-common';
import { ISharedRenderlessParamUtils, ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    MonthDay: number;
    Minutes: number;
    Hours: number;
    TotalMonth: number;
    Max: string;
    Min: string;
    Hour: string;
    Minute: string;
    CapYear: string;
    CapMonth: string;
    CapDate: string;
    CapHour: string;
    CapMinute: string;
    YearMonth: string;
    DateTime: string;
    Date: string;
    HookMounted: string;
    Hidden: string;
    Year: string;
    Day: string;
};
declare const datePickerProps: {
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    timeFormat: StringConstructor;
    suffixIcon: ObjectConstructor;
    label: StringConstructor;
    shape: StringConstructor;
    tip: StringConstructor;
    changeOnConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    isutc8: {
        type: BooleanConstructor;
        default: boolean;
    };
    dbTimezone: NumberConstructor;
    timezoneOffset: NumberConstructor;
    iso8601: BooleanConstructor;
    autoFormat: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: StringConstructor;
    blank: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"date" | "dates" | "daterange" | "week" | "month" | "monthrange" | "year" | "years" | "yearrange" | "datetime" | "datetimerange">;
        default: string;
    };
    _constants: {
        type: ObjectConstructor;
        default: () => {
            MonthDay: number;
            Minutes: number;
            Hours: number;
            TotalMonth: number;
            Max: string;
            Min: string;
            Hour: string;
            Minute: string;
            CapYear: string;
            CapMonth: string;
            CapDate: string;
            CapHour: string;
            CapMinute: string;
            YearMonth: string;
            DateTime: string;
            Date: string;
            HookMounted: string;
            Hidden: string;
            Year: string;
            Day: string;
        };
    };
    timeArrowControl: BooleanConstructor;
    timeEditable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: StringConstructor;
    format: StringConstructor;
    valueFormat: StringConstructor;
    readonly: BooleanConstructor;
    placeholder: StringConstructor;
    startPlaceholder: StringConstructor;
    endPlaceholder: StringConstructor;
    prefixIcon: ObjectConstructor;
    clearIcon: {
        type: ObjectConstructor;
        default(): vue.Raw<_opentiny_vue_common.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<_opentiny_vue_common.ExtractPropTypes<{}>>, {}, {}>>;
    };
    name: {
        default: string;
        validator: (value: any) => boolean;
    };
    disabled: BooleanConstructor;
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    id: {
        default: string;
        validator: (value: any) => boolean;
    };
    popperClass: StringConstructor;
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {};
    defaultValue: {};
    defaultTime: {};
    rangeSeparator: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    pickerOptions: {};
    unlinkPanels: BooleanConstructor;
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
    defaultTimezone: {};
    visible: BooleanConstructor;
    minDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: Date) => boolean;
    };
    maxDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: Date) => boolean;
    };
    formatter: {
        type: FunctionConstructor;
        default: (type: any, value: any) => any;
    };
    componentName: {
        type: StringConstructor;
        default: string;
    };
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
    changeCompat: {
        type: BooleanConstructor;
        default: boolean;
    };
    nowClick: {
        type: FunctionConstructor;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type IDatePickerProps = ExtractPropTypes<typeof datePickerProps>;
type IDatePickerConstants = typeof $constants;
type IDatePickerRenderlessParamUtils = ISharedRenderlessParamUtils<IDatePickerConstants>;
interface IDatePickerColumn {
    type: string;
}
interface IDatePickerOriginColumn extends IDatePickerColumn {
    values: number[];
}
interface IDatePickerState {
    visible: boolean;
    innerValue: Date;
    ranges: ComputedRef<object[]>;
    originColumns: ComputedRef<IDatePickerOriginColumn[]>;
    columns: ComputedRef<IDatePickerColumn[]>;
    displayValue: string;
    isReadonly: boolean;
    clearable: boolean;
}
interface IDatePickerApi {
    state: IDatePickerState;
    getOriginColumns: () => IDatePickerOriginColumn[];
    onCancel: () => void;
    getColumns: () => IDatePickerColumn[];
    clearDisplayValue: () => void;
    getDisplayValue: () => string;
    showPickerAndLockScroll: () => void;
    updateColumnValue: () => void;
    formatValue: (value: number) => Date;
    getMonthEndDay: (year: number, month: number) => number;
    hookMounted: () => void;
    getBoundary: ({ type, value }: {
        type: string;
        value: Date;
    }) => {
        [x: string]: number;
    };
    updateInnerValue: () => void;
    getRanges: () => {
        type: string;
        range: number[];
    }[];
    onConfirm: () => void;
    onChange: () => void;
}
type IDatePickerRenderlessParams = ISharedRenderlessFunctionParams<IDatePickerConstants> & {
    api: IDatePickerApi;
    state: IDatePickerState;
    props: IDatePickerProps;
};

export { IDatePickerApi, IDatePickerColumn, IDatePickerConstants, IDatePickerOriginColumn, IDatePickerProps, IDatePickerRenderlessParamUtils, IDatePickerRenderlessParams, IDatePickerState };
