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

declare const DATEPICKER: {
    Day: string;
    Date: string;
    Dates: string;
    Year: string;
    Years: string;
    YearRange: string;
    PanelYearNum: number;
    Month: string;
    Week: string;
    Normal: string;
    Today: string;
    PreMonth: string;
    NextMonth: string;
    YearI18n: string;
    List: number[];
    YearObj: {
        38: number;
        40: number;
        37: number;
        39: number;
    };
    WeekObj: {
        38: number;
        40: number;
        37: number;
        39: number;
    };
    DayObj: {
        38: number;
        40: number;
        37: number;
        39: number;
    };
    Aviailable: string;
    Default: string;
    Current: string;
    InRange: string;
    StartDate: string;
    EndDate: string;
    Selected: string;
    Disabled: string;
    Range: string;
    fullMonths: string[];
    fullWeeks: string[];
    MonhtList: string[];
    Weeks: string[];
    PlacementMap: {
        left: string;
        center: string;
        right: string;
    };
    QuarterMap: {
        0: number;
        1: number;
        2: number;
        3: number;
    };
    MonthQuarterMap: {
        0: number;
        3: number;
        6: number;
        9: number;
    };
    TriggerTypes: string[];
    DateFormats: {
        year: string;
        years: string;
        yearrange: string;
        month: string;
        time: string;
        week: string;
        date: string;
        timerange: string;
        monthrange: string;
        daterange: string;
        datetime: string;
        datetimerange: string;
    };
    Time: string;
    TimeRange: string;
    Quarter: string;
    IconTime: string;
    IconDate: string;
    DateRange: string;
    DateTimeRange: string;
    MonthRange: string;
    TimeSelect: string;
    TimesTamp: string;
    DateTime: string;
    SelectbaleRange: string;
    Start: string;
    End: string;
    Step: string;
    CompareOne: string;
    CompareHundred: string;
    selClass: string;
    queryClass: string;
    disableClass: string;
    defaultClass: string;
    Qurtyli: string;
    MappingKeyCode: {
        40: number;
        38: number;
    };
    DatePicker: string;
    TimePicker: string;
};

interface IDateTableRow {
    /** 列数，从0开始，[0, 6] */
    column: number;
    /** 日期单元格元素的自定义class类名 */
    customClass: string;
    /** 当前日期是否处于禁用态 */
    disabled: boolean;
    /** 是否是一个日期范围的结束日期 */
    end: boolean;
    /** 是否在一个日期范围的区间里 */
    inRange: boolean;
    /** 行数，从0开始，[0, 5] */
    row: number;
    /** 当前日期是否处于选中态 */
    selected: boolean;
    /** 是否是一个日期范围的开始日期 */
    start: boolean;
    /** 显示在日期表格中的文本 */
    text: number;
    /** 日期单元格的类型，一共有4种类型：
     * - normal 当月的日期
     * - today 今天
     * - pre-month 上一月的日期
     * - next-month 下一月的日期
     * - week 周
     * */
    type: typeof DATEPICKER.Normal | typeof DATEPICKER.Today | typeof DATEPICKER.PreMonth | typeof DATEPICKER.NextMonth | typeof DATEPICKER.Week;
}

export { IDateTableRow };
