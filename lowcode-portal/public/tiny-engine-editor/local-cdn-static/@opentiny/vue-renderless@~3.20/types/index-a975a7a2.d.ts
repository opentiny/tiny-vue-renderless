declare const tabNavPcProps: {
    panes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    currentName: StringConstructor;
    editable: BooleanConstructor;
    overflowTitle: BooleanConstructor;
    onTabClick: {
        type: FunctionConstructor;
        default: () => void;
    };
    onTabRemove: {
        type: FunctionConstructor;
        default: () => void;
    };
    tabStyle: StringConstructor;
    stretch: BooleanConstructor;
    showMoreTabs: BooleanConstructor;
    showPanesCount: NumberConstructor;
    popperClass: StringConstructor;
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropConfig: {
        type: ObjectConstructor;
        default: () => null;
    };
    titleWidth: {
        type: StringConstructor;
        default: string;
    };
    tooltipConfig: (StringConstructor | ObjectConstructor)[];
    panelMaxHeight: StringConstructor;
    panelWidth: StringConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};
declare const tabBarProps: {
    tabs: ArrayConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

export { tabNavPcProps as a, tabBarProps as t };
